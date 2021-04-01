import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private as: AuthService, private fb: FormBuilder, private library: FaIconLibrary, private router: Router) { }

  ngOnInit(): void {
    this.library.addIconPacks(fas);
    this.library.addIconPacks(fab);
    this.library.addIconPacks(far);
    this.signupForm = this.fb.group({
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    });
  }

  signup() {
    const {name,email,password,passwordConfirm} = this.signupForm.value;

    this.as.signup({name,email,password,passwordConfirm}).subscribe(
      result => {
        if (result.status === 'fail') return new Error('Unable able to signup new user.');

        this.router.navigate(['dashboard']);
      }
    )
  }

}

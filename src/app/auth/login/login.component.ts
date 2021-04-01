import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private library: FaIconLibrary, private fb: FormBuilder, private as: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.library.addIconPacks(fas);
    this.library.addIconPacks(fab);

    this.loginForm = this.fb.group({
      email: '',
      password: ''
    })
  }

  login() {
    console.log(this.loginForm.value);
    const {email, password} = this.loginForm.value;

    this.as.login({email,password}).subscribe(
      result => {
        if (result.status === 'fail') return new Error('Unable to login user.  Please try again.');

        this.router.navigate(['dashboard']);
      }
    )

  }

}

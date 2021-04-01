import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Subject } from 'rxjs';

import { FishService } from '../fish.service';

@Component({
  selector: 'app-add-fish',
  templateUrl: './add-fish.component.html',
  styleUrls: ['./add-fish.component.scss']
})
export class AddFishComponent implements OnInit {

  fishForm: FormGroup;
  errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private fb: FormBuilder, private fishService: FishService, private router: Router) { }

  ngOnInit(): void {
    this.fishForm = this.fb.group({
      species: '',
      catchee: '',
      weight: '',
      length: '',
      dateCaught: ''
    })
  }

  onAdd() {
    console.log(`Value from form: ${JSON.stringify(this.fishForm.value)}`);
    this.fishService.createFish({...this.fishForm.value}).subscribe(
      (data) => {
        console.log(`New Fish has been added successfully: ${JSON.stringify(data)}`);
        this.router.navigate(['fish']);
      },
      (err) => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      },
      () => {
        console.log('stream as completed.');
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Fish } from './../../models/fish.model';
import * as FishActions from './../state/fish.actions';
import * as FromFishState from './../state/fish.reducer';

@Component({
  selector: 'app-detail-fish',
  templateUrl: './detail-fish.component.html',
  styleUrls: ['./detail-fish.component.scss']
})
export class DetailFishComponent implements OnInit {
  fishForm: FormGroup;
  pageTitle = 'Edit';

  errormessageSubject = new Subject<string>();
  errorMessage$ = this.errormessageSubject.asObservable();
  fish$: Observable<Fish> | null;
  fishId: string;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<FromFishState.State>) { }

  ngOnInit(): void {
    this.fishForm = this.fb.group({
      species: '',
      catchee: '',
      weight: '',
      length: '',
      dateCaught: ''
    });
    this.fish$ = this.store.select(FromFishState.getCurrentFish).pipe(
      tap(fish => {
        this.fishId = fish._id;
        this.displayFish(fish);
      })
    );
  }

  onSave() {
    this.store.dispatch(FishActions.updateFish({fishId: this.fishId, fish: this.fishForm.value}))
    // console.log(`new form values: ${JSON.stringify(this.fishForm.value)}`);
    // this.fishService.updateFish(this.selectedFish._id, this.fishForm.value).subscribe(
    //   res => {
    //     console.log(res);
    //     this.router.navigate(['fish']);
    //   }
    // );
  }

  displayFish(fish: Fish | null) {
    if (fish) {
      // Reset the form
      this.fishForm.reset();

      if (fish._id === '0') {
        this.pageTitle = 'Add'
      } else {
        this.pageTitle = `Edit: ${fish.species}`
      }

      // Update the Form Values
      this.fishForm.patchValue({
        species: fish.species,
        catchee: fish.catchee,
        weight: fish.weight,
        length: fish.length,
        dateCaught: fish.dateCaught
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { EMPTY, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { FishService } from '../fish.service';
import { Fish } from './../../models/fish.model';

@Component({
  selector: 'app-detail-fish',
  templateUrl: './detail-fish.component.html',
  styleUrls: ['./detail-fish.component.scss']
})
export class DetailFishComponent implements OnInit {
  fishForm: FormGroup;

  errormessageSubject = new Subject<string>();
  errorMessage$ = this.errormessageSubject.asObservable();
  selectedFish: Fish;

  fish$ = this.fishService.selectedFish$.pipe(
    catchError(err => {
      this.errormessageSubject.next(err);
      return EMPTY;
    })
  );

  constructor(private fishService: FishService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.fishService.selectedFish$.subscribe(
      fish => {
        this.selectedFish = fish;

        if (this.selectedFish) {
          this.fishForm = this.fb.group({
            species: this.selectedFish.species,
            catchee: this.selectedFish.catchee,
            weight: this.selectedFish.weight,
            length: this.selectedFish.length,
            dateCaught: this.selectedFish.dateCaught
          })
        }
      }
    )
  }

  onSave() {
    console.log(`new form values: ${JSON.stringify(this.fishForm.value)}`);
    this.fishService.updateFish(this.selectedFish._id, this.fishForm.value).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['fish']);
      }
    );
  }

}

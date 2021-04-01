import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, Subject, throwError, BehaviorSubject } from 'rxjs';

import { Fish } from './../models/fish.model';
import { catchError, tap, map, shareReplay } from 'rxjs/operators';

interface fishResponse {
  status: string,
  data: {
    fish: Fish[]
  },

}

@Injectable({
  providedIn: 'root'
})
export class FishService {
  private baseUrl = 'http://localhost:3000/api/v1/';

  fish$ = this.http.get<fishResponse>(`${this.baseUrl}fish`).pipe(
    map(data => data.data.fish),
    tap(data => console.log(`Here is the data: ${JSON.stringify(data)}`)),
    catchError(err => this.handleError(err)),
    shareReplay(1)
  );

  private addFishSubject = new Subject<Fish>();
  addFishAction$ = this.addFishSubject.asObservable();

  private selectedFishSubject = new BehaviorSubject<string>('1');
  selectedFishAction$ = this.selectedFishSubject.asObservable();

  selectedFish$ = combineLatest([
    this.fish$,
    this.selectedFishAction$
  ]).pipe(
    map(([fish, selectedId]) =>
    fish.find(f => f._id === selectedId)),
    tap(fish => console.log(`Here is the selected fish: ${JSON.stringify(fish)}`)),
    shareReplay(1)
  )

  constructor(private http: HttpClient) { }

  createFish(payload: Fish) {
    this.addFishSubject.next(payload);
    return this.http.post(`${this.baseUrl}fish`, payload);
  }

  editSelected(id: string) {
    console.log('inside the edit selected...');
    this.selectedFishSubject.next(id);
  }

  updateFish(id: string, payload: Fish) {
    console.log(`fish payload: ${payload}`)
    return this.http.patch(`${this.baseUrl}fish/${id}`, payload)
  }

  deleteFish(id: string) {
    console.log(`deleting fish with the following id: ${id}`);
    return this.http.delete(`${this.baseUrl}fish/${id}`);
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
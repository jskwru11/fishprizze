import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';

import { FishService } from '../fish.service';
import * as FishActions from './fish.actions';

@Injectable()
export class FishEffect {
  constructor(private fishService: FishService, private actions$: Actions) {}

  loadFish$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FishActions.loadFish),
      mergeMap(() => this.fishService.fish$.pipe(
        map(fish => FishActions.loadFishSuccess({fish}))
      )),
      catchError(error => of(FishActions.loadFishFail({error})))
    )
  });

  deleteFish$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FishActions.deleteFish),
      concatMap(action => this.fishService.deleteFish(action.fishId).pipe(
        map(() => FishActions.deleteFishSuccess({fishId: action.fishId}))
      )),
      catchError(error => of(FishActions.deleteFishFail({error})))
    )
  });

  updateFish$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FishActions.updateFish),
      mergeMap(action => this.fishService.updateFish(action.fishId, action.fish).pipe(
        map(fish => FishActions.updateFishSuccess({fish: action.fish}))
      )),
      catchError(error => of(FishActions.updateFishFail({error})))
    )
  });
}

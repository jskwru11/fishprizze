import { createAction, props } from "@ngrx/store";

import { Fish } from '../../models/fish.model';

export const setCurrentFish = createAction(
  '[Fish] Set Current Fish',
  props<{fishId: string}>()
);

export const clearCurrentFish = createAction(
  '[Fish] Clear Current Fish'
);

export const initCurrentFish = createAction(
  '[Fish] Initialize Current Fish'
);

export const loadFish = createAction(
  '[Fish API] Load Fish'
);
export const loadFishSuccess = createAction(
  '[Fish API] Load Fish Success',
  props<{fish: Fish[]}>()
);
export const loadFishFail = createAction(
  '[Fish API] Load Fish Fail',
  props<{error: string}>()
);

export const deleteFish = createAction(
  '[Fish API] Delete Fish',
  props<{fishId: string}>()
);

export const deleteFishSuccess = createAction(
  '[Fish API] Delete Fish Success',
  props<{fishId: string}>()
);

export const deleteFishFail = createAction(
  '[Fish API] Delete Fish Fail',
  props<{error: string}>()
);

export const updateFish = createAction(
  '[Fish API] Update Fish',
  props<{fishId: string, fish: Fish}>()
);

export const updateFishSuccess = createAction(
  '[Fish API] Update Fish Success',
  props<{fish: Fish}>()
);

export const updateFishFail = createAction(
  '[Fish API] Update Fish Fail',
  props<{error: string}>()
);

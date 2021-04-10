import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as AppState from '../../state/app.state';
import * as FishActions from './fish.actions';
import { Fish } from './../../models/fish.model';

export interface FishState {
  fish: Fish[];
  error: string;
  currentFishId: string | null;
};

export interface State extends AppState.State {
  fish: FishState
}

const initialState: FishState = {
  fish: [],
  error: '',
  currentFishId: null
}

export const getFishFeatureSelector = createFeatureSelector<FishState>('fish');

export const getFish = createSelector(
  getFishFeatureSelector,
  state => state.fish
);

export const getCurrentFishId = createSelector(
  getFishFeatureSelector,
  state => state.currentFishId
);

export const getCurrentFish = createSelector(
  getFishFeatureSelector,
  getCurrentFishId,
  (state, currentFishId) => {
    return currentFishId ? state.fish.find(fish => fish._id === currentFishId) : null
  }
);

export const getError = createSelector(
  getFishFeatureSelector,
  state => state.error
);

export const fishReducer = createReducer<FishState>(
  initialState,
  on(
    FishActions.loadFishSuccess,
    (state, action): FishState => {
      return {
        ...state,
        error: '',
        fish: action.fish
      }
    }
  ),
  on(
    FishActions.loadFishFail,
    (state, action): FishState => {
      return {
        ...state,
        error: action.error
      }
    }
  ),
  on(FishActions.setCurrentFish,
    (state, action): FishState => {
      return {
        ...state,
        currentFishId: action.fishId
      }
    }),
    on(FishActions.clearCurrentFish,
      (state): FishState => {
        return {
          ...state,
          currentFishId: null
        }
      }),
      on(FishActions.deleteFishSuccess, (state, action): FishState => {
        return {
          ...state,
          currentFishId: null,
          error: '',
          fish: state.fish.filter(fish => fish._id !== action.fishId)
        }
      }),
      on(FishActions.deleteFishFail, (state, action): FishState => {
        return {
          ...state,
          error: action.error
        }
      }),
      on(FishActions.updateFishSuccess, (state, action): FishState => {
        return {
          ...state,
          fish: [...state.fish, action.fish]
        }
      })
);

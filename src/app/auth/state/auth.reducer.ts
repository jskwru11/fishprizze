import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import { User } from '../../models/user.model';
import * as AppState from './../../state/app.state';
import * as AuthActions from './auth.actions';

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  error: string;
}

export interface State extends AppState.State {
  auth: AuthState
}

const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  error: ''
};

export const getAuthFeatureSelector = createFeatureSelector<AuthState>('auth');

export const getCurrentUser = createSelector(
  getAuthFeatureSelector,
  state => state.currentUser
);

export const getAuthenticatedStatus = createSelector(
  getAuthFeatureSelector,
  state => state.isAuthenticated
);

export const getError = createSelector(
  getAuthFeatureSelector,
  state => state.error
);

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setCurrentUser, (state, action): AuthState => {
    return {
      ...state,
      currentUser: action.user
    }
  })
);

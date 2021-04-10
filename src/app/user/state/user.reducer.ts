import { createFeatureSelector, createReducer, on, createSelector } from '@ngrx/store';

import { User } from '../../models/user.model';
import * as AppState from './../../state/app.state';
import * as UserActions from './user.actions';

export interface UserState {
  currentUser: User;
  users: User[];
  error: string;
  userRole: string;
};

export interface State extends AppState.State {
  users: UserState
};

const initialState: UserState = {
  users: [],
  currentUser: null,
  error: '',
  userRole: 'User'
};

export const getUserFeatureSelector = createFeatureSelector<UserState>('users');

export const getUsers = createSelector(
  getUserFeatureSelector,
  state => state.users
);

export const getUserRole = createSelector(
  getUserFeatureSelector,
  state => state.userRole
);

export const getError = createSelector(
  getUserFeatureSelector,
  state => state.error
);



export const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.setUserRole, (state, action): UserState => {
    return {
      ...state,
      userRole: action.role
    }
  })
);

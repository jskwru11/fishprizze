import { createAction, props } from "@ngrx/store";

import { User } from "src/app/models/user.model";

export const getCurrentUser = createAction(
  '[Auth] Get Current User'
);

export const getAuthenticationStatus = createAction(
  '[Auth] Get Authentication Status'
);

export const setCurrentUser = createAction(
  '[Auth] Set Current User',
  props<{user: User}>()
);

export const loginUser = createAction(
  '[Auth API] Login User',
  props<{user: {email: string, password: string}}>()
);

export const loginUserSuccess = createAction(
  '[Auth API] Login User Success',
  props<{userToken: string}>()
);

export const loginUserFail = createAction(
  '[Auth API] Login User Fail',
  props<{error: string}>()
);

export const logoutUser = createAction(
  '[Auth API] Logout User'
);

export const logoutUserSuccess = createAction(
  '[Auth API] Logout User Success'
);

export const logoutUserFail = createAction(
  '[Auth API] Logout User Fail',
  props<{error: string}>()
);

export const signupUser = createAction(
  '[Auth API] Signup User',
  props<{user: User}>()
);

export const signupUserSuccess = createAction(
  '[Auth API] Signup User Success',
  props<{user: User}>()
);

export const signupUserFail = createAction(
  '[Auth API] Signup User Fail',
  props<{error: string}>()
);

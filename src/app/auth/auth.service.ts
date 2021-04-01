import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { User } from './../models/user.model';

interface LoginResponse {
  status: string,
  token: string
}



interface SignupResponse {
  status: string,
  token: string,
  data: {
    user: User
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) { }

  signup(payload) {
    return this.http.post(`${this.baseUrl}users/signup`, payload).pipe(tap((userData: SignupResponse) => {
      if (userData.status === 'fail') return new Error('Unable to signup new user.  Please try again!');

      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData.data.user));

    }));
  }

  login(payload) {
    return this.http.post(`${this.baseUrl}users/login`, payload).pipe(tap((user: LoginResponse) => {
      if (user.status === 'fail') return new Error('Unknown error, unable to login user in.');

      localStorage.setItem('token', user.token);

    }));
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');

    if (!token) return false;

    return true;
    
    
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}

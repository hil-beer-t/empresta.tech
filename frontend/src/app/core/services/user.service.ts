import { IResponse } from './../models/response.model';
import { Injectable } from '@angular/core';
import IUser from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  saveUser(user: IUser): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/signup`, user);
  }

  getUserByEmail(email: string): Observable<IResponse<IUser>> {
    return this.http.get<IResponse<IUser>>(
      `http://localhost:8080/v1/private/user/username/${email}`
    )
  }

  checkEmailIsNotTaken(email: string) {
    return this.http.head<any>(
      `http://localhost:8080/v1/private/email/${email}/check`
    );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  setToken(token: string) {
    return localStorage.setItem('access_token', token);
  }

  removeToken() {
    return localStorage.removeItem('access_token');
  }
}

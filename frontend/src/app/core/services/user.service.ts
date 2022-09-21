import { IResponse } from './../models/response.model';
import { Injectable } from '@angular/core';
import IUser from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import IToken from '../models/token.model';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  token: string = ''
  decodedToken: IToken = {
    sub: '',
    roles: [],
    iss: '',
    exp: 0
  }

  constructor(private http: HttpClient) {

  }

  saveUser(user: IUser): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/signup`, user);
  }

  getUserByEmail(email: string): Observable<IResponse<IUser>> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('access_token')
    )
    return this.http.get<IResponse<IUser>>(
      `http://localhost:8080/v1/private/user/username/${email}`,
      { headers: headers }
    )
  }

  getUserEmail(): string {
    this.token = this.getToken() ?? '';
    this.decodedToken = jwtDecode<IToken>(this.token)
    return this.decodedToken.sub
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


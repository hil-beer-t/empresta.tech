import { Injectable } from '@angular/core';
import IAddress from '../models/address.model';
import IUser from '../models/user.model';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  saveUser(user: IUser): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/signup`,
      user
    )
  }
}

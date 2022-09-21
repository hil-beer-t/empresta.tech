import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import ILoan from '../models/loan.model';
import { FormGroup } from '@angular/forms';
import { IResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  createLoan(loan: ILoan, userId: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('access_token')
    )
    return this.http.post<any>(`http://localhost:8080/v1/private/create/loan/${userId}`, loan, {
      headers: headers,
    });
  }

  getLoanByEmail(email: string): Observable<IResponse<ILoan[]>> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('access_token')
    )
    return this.http.get<IResponse<ILoan[]>>(
      `http://localhost:8080/v1/private/loan/${email}`,
      { headers: headers }
    )
  }

  getLoanByCod(cod: string): Observable<IResponse<ILoan>> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('access_token')
    )
    return this.http.get<IResponse<ILoan>>(
      `http://localhost:8080/v1/private/loan/cod/${cod}`,
      { headers: headers }
    )
  }

}

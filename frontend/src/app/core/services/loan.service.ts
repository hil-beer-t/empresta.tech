import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import ILoan from '../models/loan.model';
import { FormGroup } from '@angular/forms';
import { IResponse } from '../models/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  createLoan(loan: ILoan, userId: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('access_token')
    )
    return this.http.post<any>(`${this.apiUrl}/v1/private/create/loan/${userId}`, loan, {
      headers: headers,
    });
  }

  getLoanByEmail(email: string): Observable<IResponse<ILoan[]>> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('access_token')
    )
    return this.http.get<IResponse<ILoan[]>>(
      `${this.apiUrl}/v1/private/loan/${email}`,
      { headers: headers }
    )
  }

  getLoanByCod(cod: string): Observable<IResponse<ILoan>> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('access_token')
    )
    return this.http.get<IResponse<ILoan>>(
      `${this.apiUrl}/v1/private/loan/cod/${cod}`,
      { headers: headers }
    )
  }

}

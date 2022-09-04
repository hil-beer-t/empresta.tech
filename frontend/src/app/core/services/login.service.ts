import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  logInWithEmailAndPassword(email: string, password: string): Observable<any> {

    const formData = new FormData()
    // append your data
    formData.append('username', email)
    formData.append('password', password)
    console.log(formData)
    return this.http.post(
      `http://localhost:8080/login`,
      formData
    )
  }

}

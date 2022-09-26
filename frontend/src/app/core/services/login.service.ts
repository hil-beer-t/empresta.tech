import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  logInWithEmailAndPassword(email: string, password: string): Observable<any> {

    const formData = new FormData()
    // append your data
    formData.append('username', email)
    formData.append('password', password)
    console.log(formData)
    return this.http.post(
      `${this.apiUrl}/login`,
      formData
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password: ''
  }

  // colors
  red = 'rgb(248 113 113)'
  green = 'rgb(74 222 128)'
  blue = 'rgb(34 211 238)'

  // deny button while submitting
  inSubmission = false

  // --- alert properties ---
  showAlert = false
  alertMsg = ''
  alertColor = this.blue
  // --- alert properties ---

  constructor(private loginService: LoginService, public auth: AuthService) { }

  ngOnInit(): void { }

  login() {

    this.showAlert = true;
    this.alertMsg = 'Por favor, aguarde, estamos logando você.';
    this.alertColor = this.blue;
    this.inSubmission = true;

    const subscription = this.loginService.logInWithEmailAndPassword(this.credentials.email,
      this.credentials.password).subscribe({
        next: (item) => {
          this.alertMsg = 'Sucesso!'
          this.alertColor = this.green
          this.auth.setIsAuthenticated = true

          const token = JSON.parse(JSON.stringify(item)).access_token
          localStorage.setItem('access_token', token)
          console.log(localStorage.getItem('access_token'))
        },
        error: (err) => {
          this.alertMsg = 'Tente com outras credenciais ou ative sua conta'
          this.alertColor = this.red

          this.inSubmission = false
          console.log(err)
        }
      })

  }
}


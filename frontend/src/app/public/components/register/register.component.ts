import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterValidators } from '../../validators/register-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  constructor(
    ){
    // FormControl instead AbstractControl
    this.name
  }

  // colors
  red = 'rgb(248 113 113)'
  green = 'rgb(74 222 128)'
  blue = 'rgb(34 211 238)'

  // deny button while submitting
  inSubmission = false

  // --- alert properties ---
  showAlert = false
  alertMsg = 'Please wait! Your account is being created'
  alertColor = this.blue
  // --- alert properties ---


  // force FormControl type
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email,

  ])// [this.emailTaken.validate])
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])
  confirm_password = new FormControl('', [
    Validators.required,
  ])
  phoneNumber = new FormControl('',[
    Validators.required,
    Validators.minLength(14),
    Validators.maxLength(14)
  ])

  // instance of form group
  registerForm = new FormGroup({
    // arg1: helps angular to know what is inside this form
    // but its infer AbstractControl instead FormControl
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
  }, [RegisterValidators.match('password', 'confirm_password')])

  async register(){
    this.showAlert = true
    this.alertMsg = 'Please wait! Your account is being created'
    this.alertColor = this.blue
    this.inSubmission = true


    try {

      return

    } catch(e) {
      console.log(e)

      this.alertMsg = 'An unexpected error occurred. Please try again later.'
      this.alertColor = this.red
      this.inSubmission = false

      return
    }

    this.alertMsg = 'Success! Your account has been created.'
    this.alertColor = this.green
  }

}

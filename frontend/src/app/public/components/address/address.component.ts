import IAddress from 'src/app/core/models/address.model';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BeforeRegisterService } from './../../services/before-register.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  requestSent: boolean = false;

  // colors
  red = 'rgb(248 113 113)'
  green = 'rgb(74 222 128)'
  blue = 'rgb(26, 115, 232)'

  // deny button while submitting
  inSubmission = false

  // --- alert properties ---
  showAlert = false
  alertMsg = 'Please wait! Your account is being created'
  alertColor = this.blue
  // --- alert properties ---
  address: IAddress = {
    zip_code: '',
    state: '',
    city: '',
    street: '',
    number: '',
    area: ''
  }

  // force FormControl type
  zip_code = new UntypedFormControl('', [
    Validators.required,

  ])
  state = new UntypedFormControl('', [
    Validators.required,


  ])// [this.emailTaken.validate])
  city = new UntypedFormControl('', [
    Validators.required,

  ])
  street = new UntypedFormControl('', [
    Validators.required,

  ])
  number = new UntypedFormControl('', [
    Validators.required
  ])
  area = new UntypedFormControl('', [
    Validators.required,

  ])

  // instance of form group
  registerForm = new UntypedFormGroup({
    // arg1: helps angular to know what is inside this form
    // but its infer AbstractControl instead FormControl
    zip_code: this.zip_code,
    state: this.state,
    city: this.city,
    street: this.street,
    number: this.number,
    area: this.area
  })

  constructor(
    public beforeRegister: BeforeRegisterService,
    private user: UserService){
  }

  ngOnInit(): void {
  }

  register($event: Event): void{
    $event.preventDefault()

    this.showAlert = true
    this.alertMsg = 'Por favor, aguarde, estamos criando sua conta!'
    this.alertColor = this.blue
    this.inSubmission = true
    this.requestSent = true


    const subscription = this.user.saveUser(this.beforeRegister.getUser()).subscribe({
      next: (user) => {
        this.alertMsg = 'Sucesso! Enviamos um email de confirmação. Cheque seu email.'
        this.alertColor = this.green
      },
      error: (err) => {
        this.alertMsg = 'Um erro inesperado aconteceu. Tente novamente mais tarde.'
        this.alertColor = this.red
        this.inSubmission = false
        console.log(err)
      }
    })
  }

  back($event: Event): void{
    $event.preventDefault()
    this.beforeRegister.toggleAddress(this.registerForm.value)
    this.inSubmission = false
  }

}

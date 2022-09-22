import IAddress from 'src/app/core/models/address.model';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BeforeRegisterService } from './../../services/before-register.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import IUser from 'src/app/core/models/user.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, OnDestroy {

  requestSent: boolean = false;

  saveUser: IUser | undefined

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

  readonly subscriptions = new Subscription()

  constructor(
    public beforeRegister: BeforeRegisterService,
    private user: UserService,
    public modal: ModalService) {
  }
  ngOnDestroy(): void {
    this.modal.unregister('auth')
    this.subscriptions.unsubscribe()
  }

  ngOnInit(): void {
  }

  register($event: Event): void {

    $event.preventDefault()

    this.showAlert = true
    this.alertMsg = 'Por favor, aguarde, estamos criando sua conta!'
    this.alertColor = this.blue
    this.inSubmission = true
    this.requestSent = true

    this.saveUser = this.beforeRegister.getUser()
    this.saveUser.address = this.registerForm.value

    const subscription = this.user.saveUser(this.saveUser).subscribe({
      next: (value) => {
        console.log('saved with success', value)
        this.alertMsg = 'Sucesso! Enviamos um email de confirmação.'
        this.alertColor = this.green
        this.subscriptions.add(subscription)
      },
      error: (err) => {
        this.alertMsg = 'Algo deu errado. Tente novamente mais tarde.'
        this.alertColor = this.red
        this.inSubmission = false
        this.requestSent = false
        console.log(err)
        this.subscriptions.add(subscription)
      },
    })

  }

  back($event: Event): void {
    $event.preventDefault()
    this.beforeRegister.toggleAddress(this.registerForm.value)
    this.inSubmission = false
  }

}

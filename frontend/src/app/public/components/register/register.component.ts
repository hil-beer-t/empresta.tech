import { BeforeRegisterService } from './../../services/before-register.service';
import { Component } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import IUser from 'src/app/core/models/user.model';
import { RegisterValidators } from '../../validators/register-validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  inSubmission = false;

  user: IUser = {
    alias: '',
    cpf: '',
    email: '',
    name: '',
    phoneNumber: '',
    income: 0,
  };

  constructor(
    public beforeRegister: BeforeRegisterService
  ) {
    // FormControl instead AbstractControl
    this.name;
  }

  // force FormControl type
  name = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  alias = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  cpf = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(14),
    Validators.maxLength(14),
  ]);
  email = new UntypedFormControl('', [
    Validators.required,
    Validators.email
  ]);
  income = new UntypedFormControl('', [
    Validators.required,
    Validators.min(0),
    Validators.max(1000000000000),
  ]);
  password = new UntypedFormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirm_password = new UntypedFormControl('', [Validators.required]);
  phoneNumber = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(14),
    Validators.maxLength(14),
  ]);

  // instance of form group
  registerForm = new UntypedFormGroup(
    {
      // arg1: helps angular to know what is inside this form
      // but its infer AbstractControl instead FormControl
      name: this.name,
      alias: this.alias,
      email: this.email,
      cpf: this.cpf,
      income: this.income,
      password: this.password,
      confirm_password: this.confirm_password,
      phoneNumber: this.phoneNumber,
    },
    [RegisterValidators.match('password', 'confirm_password')]
  );

  next() {
    this.beforeRegister.toggleRegistration(this.registerForm.value);
    console.log(this.beforeRegister.getUser());
  }
}

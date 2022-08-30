import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailTaken implements AsyncValidator{

  constructor() {}

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    throw new Error('Method not implemented.');
  }

  // validate = (control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  //   return this.auth.fetchSignInMethodsForEmail(control.value).then(
  //     response => response.length ? { emailTaken: true } : null
  //   )
  // }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }


}

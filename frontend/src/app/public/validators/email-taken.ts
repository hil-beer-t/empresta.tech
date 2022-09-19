import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class EmailTaken implements AsyncValidator {

  constructor(private user: UserService) { }

  validate = (control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    console.log(this.user.checkEmailIsNotTaken(control.value).subscribe({ next: (a) => { a } }))
    return this.user.checkEmailIsNotTaken(control.value)
  }
}

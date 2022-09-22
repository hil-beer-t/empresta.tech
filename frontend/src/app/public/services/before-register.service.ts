import IUser from 'src/app/core/models/user.model';
import { Injectable } from '@angular/core';
import IAddress from 'src/app/core/models/address.model';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription } from 'rxjs';

// Make address hidden and register visible
// When next(), make address visible and register hidden
// Pass user to address

interface IRegisterAddressAndUser {
  isRegisterVisible: boolean
  isAddressVisible: boolean
  user: IUser
}

@Injectable({
  providedIn: 'root'
})
export class BeforeRegisterService {

  private registerAddressAndUser: IRegisterAddressAndUser = {
    isRegisterVisible: true,
    isAddressVisible: false,

    user: {
      alias: '',
      cpf: '',
      email: '',
      name: '',
      phoneNumber: '',
      income: 0,
      address: {
        zip_code: '',
        state: '',
        city: '',
        street: '',
        number: '',
        area: ''
      }
    }
  }

  constructor(public userService: UserService) { }

  isRegisterVisible(): boolean {
    return this.registerAddressAndUser.isRegisterVisible;
  }

  isAddressVisible(): boolean {
    return this.registerAddressAndUser.isAddressVisible;
  }

  getUser(): IUser {
    return this.registerAddressAndUser.user;
  }

  toggleRegistration(user: IUser): void {
    this.registerAddressAndUser.user = user
    this.registerAddressAndUser.isRegisterVisible = !this.registerAddressAndUser.isRegisterVisible
    this.registerAddressAndUser.isAddressVisible = !this.registerAddressAndUser.isAddressVisible
  }

  toggleAddress(address: IAddress): void {
    this.registerAddressAndUser.user.address = address
    this.registerAddressAndUser.isRegisterVisible = !this.registerAddressAndUser.isRegisterVisible
    this.registerAddressAndUser.isAddressVisible = !this.registerAddressAndUser.isAddressVisible
  }

}

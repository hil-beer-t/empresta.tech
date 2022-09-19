import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import jwt_decode from 'jwt-decode';
import IToken from '../models/token.model';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token: string = ''
  decodedToken: IToken

  constructor(private user: UserService) {
    this.token = this.user.getToken() ?? '';
    this.decodedToken = jwt_decode<IToken>(this.token)
  }

  getUserEmail(): string {
    return this.decodedToken.sub
  }
}

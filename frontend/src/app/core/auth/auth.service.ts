import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);
  public _isAuthenticatedWithDelay$ = new Observable<boolean>();

  showNavAnchors = new EventEmitter<boolean>();

  constructor(private router: Router, private jwtHelper: JwtHelperService) {
  }

  public set setIsAuthenticated(value: boolean) {

    this.isAuthenticated = value
    this.showNavAnchors.emit(value)
    this._isAuthenticated$.next(value);
    this._isAuthenticatedWithDelay$ = this._isAuthenticated$.pipe(delay(1000))

    // if (this.isAuthenticated) {
    //   this.showNavAnchors.emit(true)
    //   this._isAuthenticated$.next(value);
    //   this._isAuthenticatedWithDelay$ = this._isAuthenticated$.pipe(delay(1000))
    // } else {
    //   this.showNavAnchors.emit(false)
    //   this._isAuthenticated$.next(value);
    //   this._isAuthenticatedWithDelay$ = this._isAuthenticated$.pipe(delay(1000))
    // }
  }

  public get getIsAuthenticated(): boolean {
    // console.log(this.isAuthenticated)
    // return this.isAuthenticated
    // if (localStorage.getItem('access_token') && this.jwtHelper.isTokenExpired(localStorage.getItem('access_token') ?? undefined)) {
    //   return true
    // }
    this.showNavAnchors.emit(this.isAuthenticated)
    return this.isAuthenticated
  }

  haveToken(): boolean {
    if (localStorage.getItem('access_token') && this.jwtHelper.isTokenExpired(localStorage.getItem('access_token') ?? undefined)) {
      return true
    }
    return false
  }

  public async logout($event?: Event) {

    if ($event) {
      $event.preventDefault()
    }

    this.setIsAuthenticated = false
    localStorage.removeItem('access_token')

    this.router.navigateByUrl('').then(() => {
      window.location.reload()
    })
  }

}

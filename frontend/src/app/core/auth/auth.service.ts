import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);
  public _isAuthenticatedWithDelay$ = new Observable<boolean>();

  showNavAnchors = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  public set setIsAuthenticated(value: boolean) {

    this.isAuthenticated = value

    if (this.isAuthenticated) {
      this.showNavAnchors.emit(true)
      this._isAuthenticated$.next(value);
      this._isAuthenticatedWithDelay$ = this._isAuthenticated$.pipe(delay(1000))
    } else {
      this.showNavAnchors.emit(false)
      this._isAuthenticated$.next(value);
      this._isAuthenticatedWithDelay$ = this._isAuthenticated$.pipe(delay(1000))
    }
  }

  public get getIsAuthenticated(): boolean {
    return this.isAuthenticated
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

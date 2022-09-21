import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, filter, map, Observable, of, pipe, Subject, switchMap } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  helper = new JwtHelperService()

  // isAuthenticated = false
  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);
  public _isAuthenticatedWithDelay$ = new Observable<boolean>();

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  public set setIsAuthenticated(value: boolean) {
    this._isAuthenticated$.next(value);
    this._isAuthenticatedWithDelay$ = this._isAuthenticated$.pipe(delay(1000))
  }

  public get getIsAuthenticated(): Observable<boolean> {
    return this._isAuthenticated$.asObservable();
  }

  public get isAuthenticated(): boolean {
    if (localStorage.getItem('access_token') && this.helper.isTokenExpired(localStorage.getItem('access_token') ?? undefined)) {
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

    this.router.navigateByUrl('/')
  }

  // getIsAuthenticated(): boolean {
  //   return this.isAuthenticated
  // }

  // setIsAuthenticated(value: boolean) {
  //   this.isAuthenticated = value
  // }

  // isAuthenticated(): boolean {
  //   if (localStorage.getItem('access_token') && this.helper.isTokenExpired(localStorage.getItem('access_token') ?? undefined)) {
  //     return true
  //   }
  //   return false
  // }

}

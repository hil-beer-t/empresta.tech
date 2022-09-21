import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoanGuard implements CanActivateChild {

  constructor(private auth: AuthService, private router: Router) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.auth.getIsAuthenticated) {
      console.log("dentro do guard")
      return true
    }

    this.router.navigate([''])

    return false;

  }

}

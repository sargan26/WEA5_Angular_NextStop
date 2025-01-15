import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthenticationService} from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getRole();
    if (role === 'ROLE_ADMIN' || role === 'ROLE_COMPANY') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}

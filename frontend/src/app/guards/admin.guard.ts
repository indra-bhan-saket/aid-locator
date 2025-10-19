import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      console.log('User not authenticated. Redirecting to home page.');
      // Redirect to home page if not authenticated
      return this.router.createUrlTree(['/']);
    }

    // Check if user is admin
    if (!this.authService.isAdmin()) {
      console.log('User is not an admin. Access denied.');
      // Redirect to home page if not admin
      return this.router.createUrlTree(['/']);
    }

    // Allow access if authenticated and admin
    console.log('Admin access granted.');
    return true;
  }
}

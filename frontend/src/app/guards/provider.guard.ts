import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const user = this.authService.getUser();
    
    // Check if user is authenticated and has provider role
    if (this.authService.isAuthenticated() && user?.role?.toLowerCase() === 'provider') {
      return true;
    }
    
    // Redirect to home if not authorized
    this.router.navigate(['/']);
    return false;
  }
}

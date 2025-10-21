import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HealthCheckService } from '../services/health-check.service';
import { AuthService } from '../services/auth.service';
import { LoginModalComponent } from '../shared/login-modal/login-modal';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private healthCheckService: HealthCheckService,
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  onHealthCheckClick() {
    this.healthCheckService.triggerHealthCheck();
  }

  onLoginClick() {
    const modalRef = this.modalService.open(LoginModalComponent, {
      centered: true,
      size: 'md',
      backdrop: 'static'
    });

    modalRef.result.then(
      (result) => {
        console.log('Login/Register result:', result);
        // Update authentication status after login
        if (result.action === 'login') {
          this.checkAuthStatus();
        }
      },
      (reason) => {
        console.log('Modal dismissed:', reason);
      }
    );
  }

  onLogoutClick() {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout().subscribe({
        next: () => {
          console.log('Logout successful');
          this.isLoggedIn = false;
          // Navigate to home page
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Logout error:', error);
          // Clear auth data even if API fails
          this.authService.clearAuthData();
          this.isLoggedIn = false;
          this.router.navigate(['/']);
        }
      });
    }
  }
}

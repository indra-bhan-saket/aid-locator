import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { LoginUserDto, RegisterUserDto } from '../../models/auth.models';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-modal.html',
  styleUrls: ['./login-modal.css']
})
export class LoginModalComponent implements OnInit {
  mode: 'login' | 'register' = 'login';
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  initializeForms(): void {
    // Login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      loginAs: ['provider', Validators.required]
    });

    // Register form
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    //   providerName: ['', [Validators.required, Validators.minLength(2)]],
      accountType: ['individual', Validators.required]
    });
  }

  switchToRegister(): void {
    this.mode = 'register';
    this.loginForm.reset({ loginAs: 'provider' });
    this.errorMessage = '';
    this.successMessage = '';
  }

  switchToLogin(): void {
    this.mode = 'login';
    this.registerForm.reset({ accountType: 'individual' });
    this.errorMessage = '';
    this.successMessage = '';
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const loginData: LoginUserDto = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.isLoading = false;
          
          // Close modal
          this.activeModal.close({ action: 'login', data: response });
          
          // Navigate based on user role
          if (response.user.role?.toLowerCase() === 'admin') {
            this.router.navigate(['/admin']);
          } else if (response.user.role?.toLowerCase() === 'provider') {
            this.router.navigate(['/provider']);
          } else {
            // Stay on current page for other roles
            console.log('User logged in successfully');
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          this.isLoading = false;
          this.errorMessage = error.message || 'Please provide valid credentials';
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const registerData: RegisterUserDto = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        phone: this.registerForm.value.phone,
        // providerName: this.registerForm.value.providerName,
        type: this.registerForm.value.accountType,
        role: 'provider'
      };

      this.authService.register(registerData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.isLoading = false;
          
          // Show success message in modal
          this.successMessage = 'Registration successful!. Please reach out to Admin for approval.';
          this.errorMessage = '';
          
          // Reset the register form
          this.registerForm.reset({ accountType: 'individual' });
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.isLoading = false;
          this.errorMessage = error.message || 'Registration failed. Please try again.';
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.activeModal.dismiss('cancel');
  }

  closeModal(): void {
    this.activeModal.dismiss('close');
  }
}

import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
  ],

  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required]),
  });

  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      this.loading = true;
      const credentials = {
        username: this.form.value.uname!.trim(),
        password: this.form.value.password!.trim(),
      };

      this.authService.login(credentials).subscribe({
        next: (res: Boolean) => {
          console.log('Response from backend:', res);
          if (res) {
            this.authService.getUserByUsername(credentials.username).subscribe({
              next: (res: any) => {
                console.log('User ID:', res);
                this.authService.saveUserDetailsToLocalStorage(res);
                // Store the user ID in localStorage or sessionStorage
                localStorage.setItem('userId', res.id);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', credentials.username);

                // Show success message
                this.toastr.success('Login Successful');

                // Navigate to the dashboard
                setTimeout(() => {
                  this.router.navigate(['/dashboard']);
                }, 100);
              },
              error: (error: any) => {
                console.error('Error fetching user ID:', error);
                this.toastr.error('Error retrieving user ID');
                this.loading = false;
              },
            });
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.toastr.error('Invalid credentials!');
          this.loading = false;
        },
        complete: () => {
          console.log('Login attempt complete');
          this.loading = false;
        },
      });
    } else {
      this.toastr.warning('Please fill in all required fields.');
    }
  }

}

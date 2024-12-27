import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { catchError, debounceTime, switchMap, of } from 'rxjs';
import { RouterModule } from '@angular/router'; // Import RouterModule for routerLink
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule for formGroup

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [MaterialModule, NgIf, RouterModule, ReactiveFormsModule], // Add RouterModule and ReactiveFormsModule here
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent implements OnInit {
  form: FormGroup;
  usernameAvailable: boolean | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      mobile: new FormControl('', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    // Real-time username availability check
    this.form.get('username')?.valueChanges.pipe(
      debounceTime(300), // Wait 300ms after user stops typing
      switchMap((username) =>
        this.authService.checkUsernameAvailability(username).pipe(
          catchError(() => of(false)) // Handle errors gracefully
        )
      )
    ).subscribe((isAvailable) => {
      this.usernameAvailable = isAvailable;
    });
  }

  get f() {
    return this.form.controls;
  }

  submit(): void {
    if (this.form.valid) {
      const { username, email, password, name, mobile } = this.form.value;

      this.authService.register({ username, email, password, name, mobile }).subscribe({
        next: (response: Boolean) => {
          if (response == true) {
            this.toastr.success('Registration successful!');
            this.router.navigate(['/']);
          } else {
            this.toastr.error(`Registration failed: ${response}`);
          }
        },
        error: () => {
          this.toastr.error('An error occurred during registration.');
        },
      });
    } else {
      this.toastr.warning('Please fill in all required fields.');
    }
  }
}

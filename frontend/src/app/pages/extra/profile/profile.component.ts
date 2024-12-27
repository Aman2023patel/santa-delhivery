import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
        RouterModule,
        CommonModule,
        NgScrollbarModule,
        TablerIconsModule,
        MaterialModule,
        FormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit  {
  user: any;
  userAddress: any;
  orders: any[] = [];
  totalOrders: number = 0;

  constructor(private authService:AuthService , private locationService: LocationService, private toastr: ToastrService,private orderService : OrderService) {}

  ngOnInit(): void {
    // Retrieve user details from localStorage
    this.user = this.authService.getUserDetailsFromLocalStorage();
    this.loadUserAddress();
    // this.loadUserDetails();
    this.loadUserOrders();

  }

  loadUserAddress(): void {
    this.locationService.getLocation(this.user.id).subscribe({
      next: (response) => {
        this.userAddress = response.address;
        console.log('Address:',response.address);
      },
      error: (err) => {
        console.error('Error fetching address:', err);
      }
    });
  }
  loadUserOrders(): void {
    const loggedInUser = this.authService.getUserDetailsFromLocalStorage();
    if (loggedInUser && loggedInUser.id) {
      this.orderService.getUserOrders(loggedInUser.id).subscribe(
        (response) => {
          this.orders = response;
          this.totalOrders = this.orders.length; // Calculate total orders
        },
        (error) => {
          this.toastr.error('Failed to load orders');
        }
      );
    }
  }

}

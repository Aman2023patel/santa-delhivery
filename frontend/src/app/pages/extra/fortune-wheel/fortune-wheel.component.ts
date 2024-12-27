import { CommonModule, NgStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Subscription, interval } from 'rxjs'; // Added required imports

@Component({
  selector: 'app-fortune-wheel',
  standalone: true,
  imports: [
    NgStyle,
    CommonModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule,
    ToastrModule
  ],
  templateUrl: './fortune-wheel.component.html',
  styleUrl: './fortune-wheel.component.scss',
})
export class FortuneWheelComponent implements OnInit {
  gifts = [
    { name: 'Toy Car', icon: 'fas fa-car' },
    { name: 'Doll', icon: 'fas fa-puzzle-piece' },
    { name: 'Bicycle', icon: 'fas fa-bicycle' },
    { name: 'Gift Card', icon: 'fas fa-credit-card' },
    { name: 'Stuffed Bear', icon: 'fas fa-teddy-bear' },
    { name: 'Board Game', icon: 'fas fa-chess' },
    { name: 'Lego Set', icon: 'fas fa-cogs' },
    { name: 'Puzzle', icon: 'fas fa-puzzle-piece' }
  ];

  rotation: number = 0;
  result: any = null;
  spinning = false;
  orderPlaced = false;
  orderId: string | null = null;
  deliveryProgress: any[] = [];
  progressSubscription: Subscription | null = null;

  constructor(private http: HttpClient, private toastr: ToastrService , private router:Router) {}

  ngOnInit(): void {}

  spinWheel() {
    if (this.spinning) return;

    this.spinning = true;
    this.result = null;
    this.orderPlaced = false;
    this.toastr.info('Spinning the wheel...');
    const randomDegree = Math.floor(Math.random() * 360) + 1440; // At least 4 full rotations
    this.rotation += randomDegree;

    setTimeout(() => {
      const index = Math.floor((this.rotation % 360) / (360 / this.gifts.length));
      this.result = this.gifts[index];
      this.spinning = false;
      this.toastr.success(`You won: ${this.result.name}! 🎉`);
    }, 4000);
  }

  orderNow(result: any) {
    const userId = localStorage.getItem('userId'); // Get user ID from local storage
    if (userId) {
      this.http.post<any>('http://localhost:8080/api/orders/create', null, {
        params: {
          userId: userId,
          giftName: result.name,
        },
      }).subscribe(
        response => {
          this.toastr.success(`Order placed for: ${result.name}!`);
          this.orderId = response.id; // Get order ID from the response
          this.orderPlaced = true;

          // Update the user's order count
          this.updateUserOrderCount(userId);

          this.router.navigate(['/dashboard']);
        },
        error => {
          this.toastr.error('Failed to place the order. Please try again.');
        }
      );
    } else {
      this.toastr.error('User not logged in');
    }
  }

  updateUserOrderCount(userId: string) {
    this.http.post<any>('http://localhost:8080/api/users/updateOrderCount', { userId })
      .subscribe(
        response => {
          if (response) {
            this.toastr.success('Order Placed successfully');
          } else {
            this.toastr.error('Failed to update user order count.');
          }
        },
        error => {
          // Handle any errors that occur during the HTTP request
          console.error('Failed to update user order count', error);  // Log the error to get more details
          this.toastr.error('Failed to update user order count.');
        }
      );
  }


  // startDeliveryProgressUpdate() {
  //   if (!this.orderId) return;

  //   // Start polling every 10 seconds to update delivery progress
  //   this.progressSubscription = interval(10000).subscribe(() => {
  //     this.http.post<any>(`http://localhost:8080/api/orders/${this.orderId}/updateProgress`, {})
  //       .subscribe(
  //         updatedOrder => {
  //           this.deliveryProgress = updatedOrder.deliveryProgress;
  //           this.toastr.info('Delivery progress updated.');
  //         },
  //         error => {
  //           this.toastr.error('Failed to update delivery progress.');
  //         }
  //       );
  //   });
  // }

  // ngOnDestroy(): void {
  //   if (this.progressSubscription) {
  //     this.progressSubscription.unsubscribe();
  //   }
  // }
}

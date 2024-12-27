import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from 'src/app/services/location.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  userAddress: any;
  userId : any;


  location: any = {
    latitude: '',
    longitude: '',
    address: '',
  };
  filteredAddresses: string[] = [];
  username: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private locationService: LocationService
  ) {
    this.username = localStorage.getItem('username');
  }

  ngOnInit() {
    this.requestLocationPermission();
  }

  onSelectAddress(event: any) {
    this.location.address = event.option.value;
  }

  requestLocationPermission() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.location.latitude = position.coords.latitude;
        this.location.longitude = position.coords.longitude;

        this.getAddress(this.location.latitude, this.location.longitude);
      });
    } else {
      alert('Geolocation is not supported by your browser');
    }
  }

  loadUserAddress(): void {
    this.locationService.getLocation(this.userId).subscribe({
      next: (response) => {
        this.userAddress = response.address;
        console.log('Address:',response.address);
      },
      error: (err) => {
        console.error('Error fetching address:', err);
      }
    });
  }

  getAddress(latitude: number, longitude: number) {
    const apiKey = '';
    // const apiKey = '';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results[0]) {
          this.location.address = data.results[0].formatted_address;
        } else {
          this.location.address = 'Unable to fetch address';
        }
      });
  }

  saveLocation() {
    const userId = localStorage.getItem('userId');
    console.log('Saving location:', this.location);

    if (userId) {
      this.locationService.saveLocation({ ...this.location, userId }).subscribe(
        (response) => {
          console.log('Location saved:', response);
          this.toastr.success('Location saved successfully', 'Success');
        },
        (error) => {
          console.error('Error saving location:', error);
          this.toastr.error('Failed to save location', 'Error');
        }
      );
    } else {
      console.error('No user ID found.');
      this.toastr.error('No user ID found', 'Error');
    }
  }

  logout() {
    localStorage.clear();
    this.toastr.info('Logged out successfully', 'Info');

    this.router.navigate(['/authentication/login']);
  }
}

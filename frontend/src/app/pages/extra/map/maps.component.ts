
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { NgIf } from '@angular/common';

declare var google: any;

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [GoogleMapsModule, GoogleMap, MatProgressBar, MatCardSubtitle, MatCardTitle, MatCardContent, MatCard, NgIf],
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class AppIconsComponent implements OnInit, AfterViewInit {
  @ViewChild(GoogleMap) googleMap: GoogleMap;

  warehouseLocation = { lat: 19.018255, lng: 72.847938 }; // Fixed warehouse location
  userLocation = { lat: 0, lng: 0 }; // Initially set to (0, 0)
  directionsService: any;
  directionsRenderer: any;
  marker: any;
  route: any[] = [];

  // Declare the missing properties
  markerOptions: google.maps.MarkerOptions;
  deliveryPosition: google.maps.LatLng;
  deliveryMarkerOptions: google.maps.MarkerOptions;
  progress: number = 0; // Initialize the progress variable
  simulationInProgress: boolean = false; // Flag to disable the button

  constructor(
    private authService: AuthService,
    private locationService: LocationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.authService.getUserDetailsFromLocalStorage();
    this.loadUserAddress();

    // Initialize the DirectionsService and DirectionsRenderer
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
  }

  ngAfterViewInit(): void {
    if (this.googleMap && this.googleMap.googleMap) {
      this.directionsRenderer.setMap(this.googleMap.googleMap);
    } else {
      console.error('Google Map instance not available.');
    }
  }

  loadUserAddress(): void {
    this.locationService.getLocation(this.authService.getUserDetailsFromLocalStorage().id).subscribe({
      next: (response) => {
        if (response.latitude && response.longitude) {
          this.userLocation.lat = response.latitude;
          this.userLocation.lng = response.longitude;
          console.log('Address fetched successfully:', response.address);
        } else {
          console.error('Invalid response from the location service.');
          this.toastr.error('Failed to fetch user location.');
        }
      },
      error: (err) => {
        console.error('Error fetching user location:', err);
        this.toastr.error('Unable to fetch user location.');
      },
    });
  }

  simulateDelivery() {
    this.simulationInProgress = true;
    this.progress = 0;
    this.showDirections();
  }

  showDirections() {
    const origin = new google.maps.LatLng(this.warehouseLocation.lat, this.warehouseLocation.lng);
    const destination = new google.maps.LatLng(this.userLocation.lat, this.userLocation.lng);

    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (response: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        // Set the directions on the map
        this.directionsRenderer.setDirections(response);

        const route = response.routes[0].overview_path;
        this.animateMarkerAlongRoute(route);
      } else {
        console.error('Error fetching directions:', status);
        this.toastr.error('Unable to fetch directions.');
      }
    });
  }

  animateMarkerAlongRoute(route: any[]) {
    let index = 0;
    const totalSteps = route.length;
    const stepDuration = 50;


    this.marker = new google.maps.Marker({
      position: route[index],
      map: this.googleMap.googleMap,
      icon: {
        url: 'assets/images/logos/santa-face.svg',
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50),
      },
      animation: google.maps.Animation.DROP,
    });

    const moveMarker = () => {
      if (index < totalSteps - 1) {
        index++;
        this.marker.setPosition(route[index]);

        this.progress = Math.round(((index + 1) / totalSteps) * 100);

        setTimeout(moveMarker, stepDuration);
      } else {
        console.log('Delivery completed');
        this.progress = 100;

        this.toastr.success('Delivery completed');
        this.simulationInProgress = false;
      }
    };

    // Start the marker animation
    moveMarker();
  }
}

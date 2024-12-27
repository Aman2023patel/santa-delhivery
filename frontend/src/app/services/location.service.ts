import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    private apiUrl = '/api/location';
    private apiBaseUrl = 'http://localhost:8080/api/location';

    constructor(private http: HttpClient) {}

    saveLocation(location: any) {
      return this.http.post(`${this.apiBaseUrl}`, location);
    }

    getLocation(userId: string): Observable<any> {
      return this.http.get(`${this.apiBaseUrl}/${userId}`);
  }

}

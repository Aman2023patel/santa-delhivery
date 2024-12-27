import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private apiUrl = 'http://localhost:8080/api/delivery';

  constructor(private http: HttpClient) {}

  assignGift(userId: string, giftName: string): Observable<any> {
    const params = { userId, giftName };
    return this.http.post(`${this.apiUrl}/assign`, null, { params });
  }
}

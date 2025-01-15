import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AdminRoutesService {
  private apiUrl = `${environment.apiBaseUrl}/routes`;

  constructor(private http: HttpClient) {}

  createRoute(routeData: any): Observable<any> {
    console.log('POST Payload:', routeData);
    return this.http.post(`${this.apiUrl}`, routeData);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AdminStopsService {
  private apiUrl = `${environment.apiBaseUrl}/stops`;

  constructor(private http: HttpClient) {}

  createStop(stopData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, stopData);
  }

  updateStop(stopId: string, stopData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${stopId}`, stopData);
  }

  getAllStops(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}

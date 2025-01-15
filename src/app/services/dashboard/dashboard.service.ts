import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ROUTES} from '../../routing/app.routes.constants';
import {environment} from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  getNextDepartures(stopId: string, date: string, time: string, limit: number): Observable<any[]> {
    const url = `${this.apiUrl}/stops/${stopId}/next-departures`;
    const params = { date, time, limit: limit.toString() };
    return this.http.get<any[]>(url, { params });
  }
}

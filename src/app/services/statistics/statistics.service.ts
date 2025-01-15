import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ROUTES} from '../../routing/app.routes.constants';
import {environment} from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  getStatistics(startDate: string, endDate: string, routeID?: string): Observable<any[]> {
    const params: any = { startDate };
    if (endDate) {
      params.endDate = endDate;
    }

    if (routeID) {
      params.routeID = routeID;
    }

    return this.http.get<any[]>(`${this.apiUrl}/statistics/by-timespan`, { params });
  }
}

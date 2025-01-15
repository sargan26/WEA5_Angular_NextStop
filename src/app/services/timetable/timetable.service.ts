import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class TimetableService {
  private apiUrl = `${environment.apiBaseUrl}/schedules/connections`;

  constructor(private http: HttpClient) {}

  getConnections(
    startStopId: string,
    endStopId: string,
    date: string,
    time: string,
    limit: number
  ): Observable<any[]> {
    const params = { startStopId, endStopId, date, time, limit: limit.toString() };

    return this.http.get<any[]>(this.apiUrl, { params });
  }
}

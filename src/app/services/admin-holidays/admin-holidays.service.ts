import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AdminHolidaysService {
  private baseUrl = `${environment.apiBaseUrl}/holidays`; // API-URL

  constructor(private http: HttpClient) {}

  createHoliday(holidayData: {
    startDate: string;
    endDate: string;
    dateDescription: string;
    isHoliday: boolean;
    isSchoolHoliday: boolean;
  }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.baseUrl, holidayData);
  }

  updateHoliday(holidayData: {
    startDate: string;
    endDate: string;
    dateDescription: string;
    isHoliday: boolean;
    isSchoolHoliday: boolean;
  }): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(this.baseUrl, holidayData);
  }

  deleteHoliday(startDate: string, endDate: string): Observable<{ message: string }> {
    const params = { startDate, endDate };
    return this.http.delete<{ message: string }>(this.baseUrl, { params });
  }

  getHolidays(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Stop {
  stopID: string;
  stopName: string;
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root',
})
export class StopsService {
  private readonly apiUrl = 'http://localhost:5051/api/stops';

  constructor(private http: HttpClient) {}

  searchByName(query: string): Observable<Stop[]> {
    return this.http.get<Stop[]>(`${this.apiUrl}/search/by-name`, {
      params: { query },
    });
  }

  searchByLocation(latitude: number, longitude: number): Observable<Stop[]> {
    return this.http.get<Stop[]>(`${this.apiUrl}/search/by-location`, {
      params: { latitude, longitude },
    });
  }

}

import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { StopsService, Stop } from '../../services/stops.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';

@Component({
  selector: 'mitterlehner-stops',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    NgIf,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef
  ],
  templateUrl: './stops.component.html',
  styles: [`
    .container {
      margin: 10px;
    }
    .radio-group {
      margin-bottom: 10px;
      display: flex;
      gap: 10px;
    }
    .field {
      margin-bottom: 10px;
    }
    .search-form button {
      margin-bottom: 20px; /* Abstand zum nächsten Element */
    }
  `]
})
export class StopsComponent {
  searchType: 'name' | 'location' = 'name'; // Standard: Suche nach Name
  nameQuery: string = '';
  latitude: number | null = null;
  longitude: number | null = null;
  stops: Stop[] = [];
  displayedColumns: string[] = ['stopName', 'latitude', 'longitude']

  constructor(private stopsService: StopsService) { }

  searchStops() {
    if (this.searchType === 'name' && this.nameQuery.trim() !== '') {
      this.stopsService.searchByName(this.nameQuery).subscribe({
        next: (results) => {
          this.stops = results;
          console.log('Suchergebnisse:', this.stops);
        },
        error: (err) => {
          console.error('Fehler bei der Suche:', err);
        },
      });
    } else if (this.searchType === 'location' && this.latitude !== null && this.longitude !== null) {
      this.stopsService.searchByLocation(this.latitude, this.longitude).subscribe({
        next: (results) => {
          this.stops = results;
          console.log('Suchergebnisse:', this.stops);
        },
        error: (err) => {
          console.error('Fehler bei der Suche:', err);
        },
      });
    } else {
      console.error('Ungültige Eingaben.');
    }
  }
}

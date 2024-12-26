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
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
  private _searchType: 'name' | 'location' = 'name';

  get searchType(): 'name' | 'location' {
    return this._searchType;
  }

  set searchType(value: 'name' | 'location') {
    this._searchType = value;
    this.nameQuery = '';
    this.stops = []; // Stops leeren, wenn der Suchtyp geändert wird
  }

  nameQuery: string = '';
  latitude: number | null = null;
  longitude: number | null = null;
  stops: Stop[] = [];
  displayedColumns: string[] = ['stopName', 'latitude', 'longitude']

  private searchSubject = new Subject<string>();

  constructor(private stopsService: StopsService) {
    // Vorschlagssuche
    this.searchSubject.pipe(
      debounceTime(300), // 300ms Verzögerung
      distinctUntilChanged(), // Ignoriere gleiche Eingaben
      switchMap((query) =>
        query.trim()
          ? this.stopsService.searchByName(query).pipe(catchError(() => of([])))
          : of([])
      )
    ).subscribe((results) => {
      this.stops = results;
    });
  }

  onNameInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value); // Vorschlagssuche triggern
  }

  searchStops() {
    if (this.searchType === 'location' && this.latitude !== null && this.longitude !== null) {
      this.stopsService.searchByLocation(this.latitude, this.longitude).subscribe({
        next: (results) => {
          this.stops = results;
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

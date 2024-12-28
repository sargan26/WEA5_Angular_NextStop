import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AdminStopsService} from '../../services/admin-stops/admin-stops.service';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {StopsService} from '../../services/stops/stops.service';

@Component({
  selector: 'app-admin-stops',
  templateUrl: './admin-stops.component.html',
  styleUrls: ['./admin-stops.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatError,
    MatLabel,
    MatInput,
    NgIf,
    MatButton,
    MatProgressSpinner,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    FormsModule
  ]
})
export class AdminStopsComponent {
  stopForm: FormGroup;
  stops: any[] = [];
  searchQuery: string = '';
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedRow: any = null;

  constructor(private fb: FormBuilder, private adminStopsService: AdminStopsService, private stopsService: StopsService) {
    this.stopForm = this.fb.group({
      stopID: [
        '',
        [Validators.required, this.noSpacesOrSpecialCharsValidator],
      ],
      stopName: [
        '',
        [Validators.required, this.noSpacesOrSpecialCharsValidator], // Validator is now inside the array
      ],
      latitude: [
        null,
        [Validators.required, Validators.min(-90), Validators.max(90)],
      ],
      longitude: [
        null,
        [Validators.required, Validators.min(-180), Validators.max(180)],
      ],
    });

    this.fetchAllStops();
  }

  fetchAllStops() {
    this.adminStopsService.getAllStops().subscribe((stops) => {
      this.stops = stops;
    });
  }

  onSearchInput() {
    if (this.searchQuery.trim() === '') {
      this.fetchAllStops();
    } else {
      this.stopsService.searchByName(this.searchQuery).subscribe((stops) => {
        this.stops = stops;
      });
    }
  }

  populateForm(stop: any): void {
    this.selectedRow = stop;
    this.stopForm.patchValue({
      stopID: stop.stopID,
      stopName: stop.stopName,
      latitude: stop.latitude,
      longitude: stop.longitude,
    });
    this.successMessage = null; // Clear messages
    this.errorMessage = null; // Clear messages
  }

  // Custom Validator for no spaces or special characters
  private noSpacesOrSpecialCharsValidator(control: any) {
    const forbidden = /[^a-zA-Z0-9]/.test(control.value); // Prüft auf nicht-alphanumerische Zeichen
    return forbidden ? { invalidChars: true } : null;
  }

  onCreate(): void {
    if (this.stopForm.invalid) {
      this.errorMessage = 'Bitte korrigieren Sie die Eingaben.';
      return;
    }

    const stopData = this.stopForm.value;

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.adminStopsService.createStop(stopData).subscribe({
      next: () => {
        this.successMessage = 'Haltestelle erfolgreich erstellt.';
        this.stopForm.reset();
        this.loading = false;
      },
      error: (error) => {
        if (error.status === 409) {
          this.errorMessage = 'Haltestelle mit dieser ID existiert bereits.';
        } else {
          this.errorMessage =
            error.error?.title || 'Fehler beim Erstellen der Haltestelle.';
        }
        this.loading = false;
      },
    });
  }

  onEdit(): void {
    if (this.stopForm.invalid) {
      this.errorMessage = 'Bitte korrigieren Sie die Eingaben.';
      return;
    }

    const stopData = {
      stopName: this.stopForm.value.stopName,
      latitude: this.stopForm.value.latitude,
      longitude: this.stopForm.value.longitude,
    };
    const stopId = this.stopForm.value.stopID;

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.adminStopsService.updateStop(stopId, stopData).subscribe({
      next: () => {
        this.successMessage = 'Haltestelle erfolgreich aktualisiert.';
        this.loading = false;
      },
      error: (error) => {
        if (error.status === 404) {
          this.errorMessage = 'Haltestelle mit dieser ID wurde nicht gefunden.';
        } else {
          this.errorMessage =
            error.error?.title || 'Fehler beim Aktualisieren der Haltestelle.';
        }
        this.loading = false;
      },
    });
  }

}

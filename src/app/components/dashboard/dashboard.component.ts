import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DashboardService} from '../../services/dashboard/dashboard.service';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatLabel,
    MatError,
    MatCellDef,
    MatHeaderCellDef,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardForm: FormGroup;
  nextDepartures: any[] = [];
  displayedColumns: string[] = ['routeID', 'plannedDeparture', 'endStation'];
  loading = false;
  errorMessage: string | null = null;
  searchAttempted = false;

  constructor(private fb: FormBuilder, private dashboardService: DashboardService) {
    this.dashboardForm = this.fb.group({
      stopId: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      limit: [3, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {}

  onSearch(): void {
    this.searchAttempted = true;

    if (this.dashboardForm.invalid) {
      this.errorMessage = 'Bitte korrigieren Sie die Eingaben.';
      return;
    }

    const { stopId, date, time, limit } = this.dashboardForm.value;
    this.loading = true;
    this.errorMessage = null;
    this.nextDepartures = [];

    this.dashboardService.getNextDepartures(stopId, date, time, limit).subscribe({
      next: (data) => {
        this.nextDepartures = data;
        this.loading = false;
      },
      error: (error) => {
        if (error.status === 404) {
          this.errorMessage = `Haltestelle mit der ID '${stopId}' wurde nicht gefunden.`;
        } else {
          this.errorMessage = 'Fehler beim Laden der Abfahrten.';
        }
        this.loading = false;
      },
    });
  }
}

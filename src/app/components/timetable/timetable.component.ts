import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TimetableService } from '../../services/timetable/timetable.service';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatLabel,
    MatError,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow
  ],
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  timetableForm: FormGroup;
  results: any[] = [];
  displayedColumns: string[] = ['route', 'startStop', 'endStop'];
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private timetableService: TimetableService) {
    this.timetableForm = this.fb.group({
      startStopId: ['', Validators.required],
      endStopId: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      limit: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.timetableForm.invalid) {
      this.errorMessage = 'Bitte korrigieren Sie die Eingaben.';
      return;
    }

    const { startStopId, endStopId, date, time, limit } = this.timetableForm.value;

    this.errorMessage = null;
    this.results = [];

    this.timetableService.getConnections(startStopId, endStopId, date, time, limit).subscribe({
      next: (data) => {
        console.log('Received data:', data);
        this.results = data;
      },
      error: (error) => {
        this.errorMessage = error.status === 404 ? 'Keine Verbindungen gefunden.' : 'Fehler beim Abrufen der Verbindungen.';
      }
    });
  }
}

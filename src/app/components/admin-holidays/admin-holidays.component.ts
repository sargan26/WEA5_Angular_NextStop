import {Component, OnInit} from '@angular/core';
import {AdminHolidaysService} from '../../services/admin-holidays/admin-holidays.service';
import {DatePipe, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
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
import {MatSort, MatSortHeader} from '@angular/material/sort';

@Component({
  selector: 'app-admin-holidays',
  templateUrl: './admin-holidays.component.html',
  imports: [
    NgIf,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatRadioGroup,
    MatRadioButton,
    MatError,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    DatePipe,
    MatSort
  ],
  styleUrls: ['./admin-holidays.component.css']
})
export class AdminHolidaysComponent implements OnInit {
  holidayData = {
    startDate: '',
    endDate: '',
    dateDescription: '',
    isHoliday: true,
    isSchoolHoliday: false
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;
  holidaySelectionError = false;
  holidays: any[] = [];
  displayedColumns: string[] = ['date', 'description', 'isHoliday', 'isSchoolHoliday'];
  selectedHoliday: any = null;

  constructor(private holidaysService: AdminHolidaysService) {}

  validateHolidaySelection() {
    this.holidaySelectionError =
      this.holidayData.isHoliday && this.holidayData.isSchoolHoliday;
  }

  ngOnInit(): void {
    this.loadHolidays();
  }

  selectHoliday(holiday: any): void {
    this.selectedHoliday = holiday;

    // Convert date in UTC
    const correctedDate = new Date(`${holiday.calendarDate}Z`); // Add 'Z' for UTC

    // Fill the form with values from selected entry
    this.holidayData.startDate = correctedDate.toISOString().split('T')[0];
    this.holidayData.endDate = correctedDate.toISOString().split('T')[0];
    this.holidayData.dateDescription = holiday.dateDescription;
    this.holidayData.isHoliday = holiday.isHoliday;
    this.holidayData.isSchoolHoliday = holiday.isSchoolHoliday;
  }

  createHoliday() {
    // Reset messages
    this.successMessage = null;
    this.errorMessage = null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Manual conversion
    const startDateParts = this.holidayData.startDate.split('-');
    const startDate = new Date(
      Number(startDateParts[0]), // Year
      Number(startDateParts[1]) - 1, // Month
      Number(startDateParts[2]) // Day
    );

    // Validation
    if (this.holidayData.startDate > this.holidayData.endDate) {
      this.errorMessage = 'Das Enddatum muss nach dem Startdatum liegen.';
      return;
    }

    if (this.holidaySelectionError) {
      this.errorMessage = 'Bitte nur Feiertag oder Schulferien auswählen.';
      return;
    }

    if (startDate <= today) {
      this.errorMessage = 'Zu erstellender Feiertag muss in der Zukunft liegen.';
      return;
    }

    // API-Call
    this.holidaysService.createHoliday(this.holidayData).subscribe({
      next: (response) => {
        this.successMessage = "Feiertag erfolgreich erstellt."
        this.loadHolidays();
      },
      error: (error) => {
        this.errorMessage = 'Fehler beim Erstellen des Feiertags.';
        console.error(error);
      }
    });
  }

  onUpdateHoliday(): void {
    // Reset messages
    this.successMessage = null;
    this.errorMessage = null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Manual conversion
    const startDateParts = this.holidayData.startDate.split('-');
    const startDate = new Date(
      Number(startDateParts[0]), // Year
      Number(startDateParts[1]) - 1, // Month
      Number(startDateParts[2]) // Day
    );

    // Validation
    if (!this.holidayData.startDate || !this.holidayData.endDate) {
      this.errorMessage = 'Start- und Enddatum sind erforderlich.';
      return;
    }

    if (this.holidayData.startDate > this.holidayData.endDate) {
      this.errorMessage = 'Das Enddatum muss nach dem Startdatum liegen.';
      return;
    }

    if (this.holidaySelectionError) {
      this.errorMessage = 'Bitte nur Feiertag oder Schulferien auswählen.';
      return;
    }

    if (startDate <= today) {
      this.errorMessage = 'Zu bearbeitender Feiertag muss in der Zukunft liegen.';
      return;
    }

    // API Call
    this.holidaysService.updateHoliday(this.holidayData).subscribe({
      next: (response) => {
        this.successMessage = 'Feiertag erfolgreich aktualisiert.';
        this.errorMessage = null;
        this.loadHolidays(); // Refresh table
      },
      error: (error) => {
        this.successMessage = null;
        this.errorMessage = 'Fehler beim Aktualisieren des Feiertags.';
      },
    });
  }



  deleteHoliday() {
    // Reset messages
    this.successMessage = null;
    this.errorMessage = null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Manual conversion
    const startDateParts = this.holidayData.startDate.split('-');
    const startDate = new Date(
      Number(startDateParts[0]), // Year
      Number(startDateParts[1]) - 1, // Month
      Number(startDateParts[2]) // Day
    );

    // Validation
    if (!this.holidayData.startDate || !this.holidayData.endDate) {
      this.errorMessage = 'Start- und Enddatum sind erforderlich, um einen Feiertag zu löschen.';
      return;
    }

    if (startDate <= today) {
      this.errorMessage = 'Zu löschender Feiertag muss in der Zukunft liegen.';
      return;
    }

    console.log('deleteHoliday()');

    // API-Call
    this.holidaysService.deleteHoliday(this.holidayData.startDate, this.holidayData.endDate).subscribe({
      next: (response) => {
        this.successMessage = "Feiertag gelöscht";
        this.loadHolidays();
      },
      error: (error) => {
        this.errorMessage = 'Fehler beim Löschen des Feiertags.';
        console.error(error);
      }
    });
  }

  loadHolidays(): void {
    this.holidaysService.getHolidays().subscribe({
      next: (data: any[]) => {
        this.holidays = data;
      },
      error: (err) => {
        this.errorMessage = 'Fehler beim Laden der Feiertage.';
      }
    });
  }

}

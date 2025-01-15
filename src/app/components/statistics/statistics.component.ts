import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import { BaseChartDirective } from 'ng2-charts';
import {ChartConfiguration, ChartData, ChartOptions, ChartType} from 'chart.js';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {StatisticsService} from '../../services/statistics/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
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
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    DecimalPipe,
    NgForOf,
    BaseChartDirective
  ],
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  statisticsForm: FormGroup;
  statistics: any[] = [];
  displayedColumns: string[] = [
    'routeID',
    'avgDelay',
    'onTimePercentage',
    'slightlyLatePercentage',
    'latePercentage',
    'severelyLatePercentage',
  ];
  loading = false;
  errorMessage: string | null = null;
  searchAttempted = false;

  constructor(private fb: FormBuilder, private statisticsService: StatisticsService) {
    this.statisticsForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: [''],
      routeID: [''],
    });
  }

  ngOnInit(): void {}

  getChartData(stat: any): ChartData<'pie'> {
    return {
      labels: ['Pünktlich', 'Leicht verspätet', 'Verspätet', 'Deutlich verspätet'],
      datasets: [
        {
          data: [
            stat.onTimePercentage,
            stat.slightlyLatePercentage,
            stat.latePercentage,
            stat.severelyLatePercentage,
          ],
          backgroundColor: ['#4caf50', '#ffc107', '#ff9800', '#f44336'], // Optional: Farben
        },
      ],
    };
  }

  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  getBarChartData(): ChartData<'bar'> {
    const labels = this.statistics.map(stat => stat.routeID);
    const data = this.statistics.map(stat => stat.avgDelay || 0);

    return {
      labels,
      datasets: [
        {
          label: 'Durchschnittliche Verspätung (Sekunden)',
          data,
          backgroundColor: '#42a5f5', // Blau für Balken
        },
      ],
    };
  }

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Routen',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Verspätung (s)',
        },
        beginAtZero: true,
      },
    },
  };

  onSearch(): void {
    this.searchAttempted = true;

    if (this.statisticsForm.invalid) {
      this.errorMessage = 'Bitte korrigieren Sie die Eingaben.';
      return;
    }

    const { startDate, endDate, routeID } = this.statisticsForm.value;
    this.loading = true;
    this.errorMessage = null;
    this.statistics = [];

    this.statisticsService.getStatistics(startDate, endDate, routeID).subscribe({
      next: (data) => {
        this.statistics = data;
        this.loading = false;
      },
      error: (error) => {
        if (error.status === 404) {
          this.errorMessage = 'Keine Statistikdaten für diese Route gefunden.';
        } else {
          this.errorMessage = 'Fehler beim Abrufen der Statistikdaten.';
        }
        this.loading = false;
      },
    });
  }
}

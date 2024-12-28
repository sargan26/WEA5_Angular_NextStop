import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatCheckbox} from '@angular/material/checkbox';
import {NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {AdminRoutesService} from '../../services/admin-routes/admin-routes.service';

@Component({
  selector: 'mitterlehner-admin-routes',
  templateUrl: './admin-routes.component.html',
  styleUrls: ['./admin-routes.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatCheckbox,
    NgForOf,
    NgIf,
    MatButton
  ]
})
export class AdminRoutesComponent {
  routeForm: FormGroup;

  constructor(private fb: FormBuilder, private adminRoutesService: AdminRoutesService) {
    this.routeForm = this.fb.group({
      routeId: ['', [Validators.required]],
      routeName: ['', [Validators.required]],
      validFrom: ['', [Validators.required]],
      validUntil: ['', [Validators.required]],
      validOnWeekday: [false],
      validOnWeekend: [false],
      validOnHoliday: [false],
      validOnSchoolHoliday: [false],
      routeStops: this.fb.array([]),
    });
  }

  get routeStops(): FormArray {
    return this.routeForm.get('routeStops') as FormArray;
  }

  addStop(): void {
    const stopGroup = this.fb.group({
      stopId: ['', [Validators.required]],
      sequenceNumber: ['', [Validators.required]],
      scheduledRouteStopArrTime: ['', [Validators.required]],
      scheduledRouteStopDepTime: ['', [Validators.required]],
    });
    this.routeStops.push(stopGroup);
  }

  removeStop(index: number): void {
    this.routeStops.removeAt(index);
  }

  onSubmit(): void {
    if (this.routeForm.invalid) {
      return;
    }

    const routeData = this.routeForm.value;
    this.adminRoutesService.createRoute(routeData).subscribe({
      next: () => {
        alert('Route erfolgreich erstellt!');
        this.routeForm.reset();
        this.routeStops.clear();
      },
      error: (err) => {
        console.error('Fehler beim Erstellen der Route:', err);
      },
    });
  }
}

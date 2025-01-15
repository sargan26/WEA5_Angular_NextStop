import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors, ValidatorFn,
  Validators
} from '@angular/forms';
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
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

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
      vin: [null, Validators.required],
      scheduledRouteDepTime: ['', Validators.required],
      scheduledRouteArrTime: ['', Validators.required],
      routeStops: this.fb.array([], this.atLeastOneStopValidator),
    },
      { validators: this.validDateRangeValidator() }
    );
  }

atLeastOneStopValidator(control: AbstractControl): ValidationErrors | null {
    const formArray = control as FormArray;
    if (formArray.length === 0) {
      return { noStops: true }; // Return an error if no stops exist
    }
    return null; // No error if at least one stop exists
  }

sequenceNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value !== null && value < 1) {
        return { invalidSequenceNumber: true };
      }
      return null;
    };
  }

  validDateRangeValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const validFrom = formGroup.get('validFrom')?.value;
      const validUntil = formGroup.get('validUntil')?.value;

      if (validFrom && validUntil && new Date(validFrom) > new Date(validUntil)) {
        return { invalidDateRange: true };
      }
      return null;
    };
  }

  get routeStops(): FormArray {
    return this.routeForm.get('routeStops') as FormArray;
  }

  addStop(): void {
    const stopGroup = this.fb.group({
      stopId: ['', [Validators.required]],
      sequenceNumber: ['', [Validators.required, this.sequenceNumberValidator()]],
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
      this.errorMessage = 'Bitte korrigieren Sie die Eingaben.';
      return;
    }

    const routeData = this.routeForm.value;
    this.loading = true;
    this.successMessage = null;
    this.errorMessage = null;

    this.adminRoutesService.createRoute(routeData).subscribe({
      next: () => {
        this.successMessage = 'Route erfolgreich erstellt.';
        this.loading = false;
        this.routeForm.markAsPristine();
        this.routeForm.markAsUntouched();
      },
      error: (error) => {
        if (error.status === 409) {
          this.errorMessage = 'Eine Route mit dieser ID existiert bereits.';
        } else if (error.status === 404) {
          this.errorMessage = 'Eine oder mehrere Haltestellen wurden nicht gefunden.';
        } else {
          this.errorMessage = 'Fehler beim Erstellen der Route.';
        }
        this.loading = false;
      },
    });
  }
}

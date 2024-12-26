import { Routes } from '@angular/router';
import { TimetableComponent } from './features/timetable/timetable.component';
import { StopsComponent } from './features/stops/stops.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

import { AdminStopsComponent } from './admin/admin-stops/admin-stops.component';
import { AdminRoutesComponent } from './admin/admin-routes/admin-routes.component';
import { AdminHolidaysComponent } from './admin/admin-holidays/admin-holidays.component';
import { AdminStatisticsComponent } from './admin/admin-statistics/admin-statistics.component';

export const routes: Routes = [
  // Allgemein
  { path: 'timetable', component: TimetableComponent },
  { path: 'stops', component: StopsComponent },
  { path: 'dashboard', component: DashboardComponent },

  // Admin
  { path: 'admin/stops', component: AdminStopsComponent },
  { path: 'admin/routes', component: AdminRoutesComponent },
  { path: 'admin/holidays', component: AdminHolidaysComponent },
  { path: 'admin/statistics', component: AdminStatisticsComponent },

  // Default Route
  { path: '', redirectTo: '/timetable', pathMatch: 'full' },
  { path: '**', redirectTo: '/timetable' }, // Fallback Route
];

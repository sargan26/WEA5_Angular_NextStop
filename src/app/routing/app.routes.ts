import { Routes } from '@angular/router';
import { ROUTES } from './app.routes.constants';

import { TimetableComponent } from '../components/timetable/timetable.component';
import { StopsComponent } from '../components/stops/stops.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { StatisticsComponent } from '../components/statistics/statistics.component';

import { AdminStopsComponent } from '../components/admin-stops/admin-stops.component';
import { AdminRoutesComponent } from '../components/admin-routes/admin-routes.component';
import { AdminHolidaysComponent } from '../components/admin-holidays/admin-holidays.component';
import {AuthGuard} from './auth.guard';


export const routes: Routes = [
  // General
  { path: ROUTES.TIMETABLE, component: TimetableComponent },
  { path: ROUTES.STOPS, component: StopsComponent },
  { path: ROUTES.DASHBOARD, component: DashboardComponent },
  { path: ROUTES.STATISTICS, component: StatisticsComponent },

  // Admin
  { path: ROUTES.ADMIN.STOPS, component: AdminStopsComponent, canActivate: [AuthGuard]},
  { path: ROUTES.ADMIN.ROUTES, component: AdminRoutesComponent, canActivate: [AuthGuard] },
  { path: ROUTES.ADMIN.HOLIDAYS, component: AdminHolidaysComponent, canActivate: [AuthGuard] },

  // Default Route
  { path: '', redirectTo: ROUTES.TIMETABLE, pathMatch: 'full' },
  { path: '**', redirectTo: ROUTES.TIMETABLE }, // Fallback Route
];

import { Component, ViewChild } from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import {MatListItem, MatListSubheaderCssMatStyler, MatNavList} from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {NgIf} from '@angular/common';
import {filter} from 'rxjs';

@Component({
  selector: 'mitterlehner-root',
  standalone: true, // Aktiviert Standalone-Komponenten
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatNavList,
    MatToolbar,
    MatIcon,
    MatButtonModule,
    MatListItem,
    RouterLink,
    MatListSubheaderCssMatStyler,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'NextStop';
  pageTitle = '';
  isAdmin = true; // TODO implement logic

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private router: Router) {
    // Überwache die Route und aktualisiere den Titel
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePageTitle();
      });
  }

  // Methode zur Aktualisierung des Titels basierend auf der Route
  updatePageTitle() {
    const route = this.router.url;
    if (route.includes('/timetable')) {
      this.pageTitle = 'Fahrplanabfrage';
    } else if (route.includes('/stops')) {
      this.pageTitle = 'Haltestellen';
    } else if (route.includes('/dashboard')) {
      this.pageTitle = 'Anzeigetafel';
    } else if (route.includes('/admin/stops')) {
      this.pageTitle = 'Admin Haltestellen';
    } else if (route.includes('/admin/routes')) {
      this.pageTitle = 'Admin Routen';
    } else if (route.includes('/admin/holidays')) {
      this.pageTitle = 'Admin Feiertage';
    } else if (route.includes('/admin/statistics')) {
      this.pageTitle = 'Admin Statistiken';
    } else {
      this.pageTitle = ''; // Fallback
    }
  }

  toggleSidenav(sidenav: MatSidenav) {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }
}

import {Component, ViewChild} from '@angular/core';
import { ROUTES } from './routing/app.routes.constants';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListItem, MatListSubheaderCssMatStyler, MatNavList} from '@angular/material/list';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {filter} from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import {AuthenticationService} from './services/authentication/authentication.service';

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
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NextStop';
  pageTitle = '';

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private router: Router, private authService: AuthenticationService) {
    this.authService.configure();

    // Monitor route and update title
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePageTitle();
      });
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
    this.authService.redirectToBaseUrl();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getRole(): string | null {
    return this.authService.getRole();
  }

  // Update title based on route
  updatePageTitle() {
    const route = this.router.url;

    if (route.includes('/' + ROUTES.ADMIN.STOPS)) {
      this.pageTitle = 'Admin Haltestellen';
    } else if (route.includes('/' + ROUTES.ADMIN.ROUTES)) {
      this.pageTitle = 'Admin Routen';
    } else if (route.includes('/' + ROUTES.ADMIN.HOLIDAYS)) {
      this.pageTitle = 'Admin Feiertage';
    } else if (route.includes('/' + ROUTES.STATISTICS)) {
      this.pageTitle = 'Statistiken';
    } else if (route.includes('/' + ROUTES.TIMETABLE)) {
      this.pageTitle = 'Fahrplanabfrage';
    } else if (route.includes('/' + ROUTES.STOPS)) {
      this.pageTitle = 'Haltestellen';
    } else if (route.includes('/' + ROUTES.DASHBOARD)) {
      this.pageTitle = 'Anzeigetafel';
    } else {
      this.pageTitle = ''; // Fallback
    }
  }

  toggleSidenav(sidenav: MatSidenav) {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  protected readonly ROUTES = ROUTES;
}

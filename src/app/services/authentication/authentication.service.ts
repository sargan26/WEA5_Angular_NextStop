import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {environment} from '../../../environment';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private role: string | null = null;

  constructor(private oauthService: OAuthService) {}

  configure() {
    this.oauthService.configure({
      issuer: 'http://localhost:8080/realms/nextstop',
      clientId: 'nextstop-api',
      redirectUri: environment.frontendBaseUrl + '/',
      responseType: 'code',
      scope: 'openid profile email',
      postLogoutRedirectUri: environment.frontendBaseUrl+ '/',
      showDebugInformation: true,
    });
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.logOut();
    this.redirectToBaseUrl();
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken();
  }

  getRole(): string | null {
    if (!this.role) {
      const token = this.oauthService.getAccessToken();
      if (token) {
        const decodedToken: any = jwtDecode(token);

        const resourceRoles = decodedToken.resource_access?.['nextstop-api']?.roles;
        if (resourceRoles && resourceRoles.length > 0) {
          this.role = resourceRoles[0];
        }
      }
    }
    return this.role;
  }


  redirectToBaseUrl() {
    window.location.href = `${environment.frontendBaseUrl}`;
  }
}

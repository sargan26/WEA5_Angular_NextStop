import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/nextstop',
  loginUrl: 'http://localhost:8080/realms/nextstop/protocol/openid-connect/auth',
  logoutUrl: 'http://localhost:8080/realms/nextstop/protocol/openid-connect/logout',
  tokenEndpoint: 'http://localhost:8080/realms/nextstop/protocol/openid-connect/token',
  sessionCheckIFrameUrl: 'http://localhost:8080/realms/nextstop/protocol/openid-connect/login-status-iframe.html',
  userinfoEndpoint: 'http://localhost:8080/realms/nextstop/protocol/openid-connect/userinfo',
  clientId: 'nextstop-api',
  redirectUri: window.location.origin + '/index.html',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  scope: 'openid profile email',
  silentRefreshTimeout: 5000,
  timeoutFactor: 0.25,
  sessionChecksEnabled: true,
  showDebugInformation: true,
  clearHashAfterLogin: false,
};

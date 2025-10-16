import { Injectable } from '@angular/core';
import { setCookie, getCookie, removeCookie } from 'typescript-cookie';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { ApiResponseObject } from '@billing-models/api-reponse.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(token: string) {
    setCookie('token-smart-shell', token, { expires: 365, path: '/' });
  }

  getToken() {
    const token = getCookie('token-smart-shell');
    return token;
  }

  removeToken() {
    removeCookie('token-smart-shell');
  }

  saveRefreshToken(token: string) {
    setCookie('token-refresh-smart-shell', token, { expires: 365, path: '/' });
  }

  getRefreshToken() {
    const token = getCookie('token-refresh-smart-shell');
    return token;
  }

  removeRefreshToken() {
    removeCookie('token-refresh-smart-shell');
  }

  isValidToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwt_decode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      // console.log('Hoy es : ',today)
      // console.log('El token vence el : ', tokenDate)
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  isValidRefreshToken() {
    const token = this.getRefreshToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwt_decode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      // console.log('Hoy es : ',today)
      // console.log('El token vence el : ', tokenDate)
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  isValidRefreshTokenAdvanced(): ApiResponseObject<boolean> {
    const token = this.getRefreshToken();
    if (!token) {
      return {
        status: -3,
        message: 'Sesion eliminada, vuelva a iniciar sesion',
        logMessage: 'Token de Refresco no encontrado en las Cookies',
        logUser: 'System',
        logTime: new Date(),
        object: false,
      };
    }
    const decodeToken = jwt_decode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      if (tokenDate.getTime() < today.getTime()) {
        return {
          status: -3,
          message: 'Sesion eliminada, vuelva a iniciar sesion',
          logMessage: `Token de Refresco ha expirado el ${tokenDate} y la hora del sistema es ${today}`,
          logUser: 'System',
          logTime: new Date(),
          object: false,
        };
      } else {
        return {
          status: 1,
          message: 'Token de Refresco Valido',
          logMessage: 'Token de Refresco Valido',
          logUser: 'System',
          logTime: new Date(),
          object: true,
        };
      }
    }
    return {
      status: -3,
      message: 'Sesion eliminada, vuelva a iniciar sesion',
      logMessage: 'Token de Refresco no se ha podido generar',
      logUser: 'System',
      logTime: new Date(),
      object: false,
    };
  }
}

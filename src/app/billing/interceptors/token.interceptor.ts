import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { TokenService } from 'src/app/auth/services/token.service';
import { AuthService } from 'src/app/auth/services/auth.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => true);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true)
}

export function uncheckToken() {
  return new HttpContext().set(CHECK_TOKEN, false)
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // request : Representa la Solicitud HTTP Original
    // next: Representa el HttpClient que finalmente se envia
    if(request.context.get(CHECK_TOKEN)){ // Solo si la solictud tiene el contexto CHECK_TOKEN
      const isValidToken =  this.tokenService.isValidToken() // Valido si el Token Princial esta vigente
      if (isValidToken) {
        return this.addToken(request, next);
      } else {
        return this.updateAccessTokenAndRefreshToken(request, next)
      }
    } else {
      return next.handle(request); // Sin cambios
    }
  }

  addToken(request: HttpRequest<unknown>, next: HttpHandler){
    const accessToken = this.tokenService.getToken() // Ontiene el token, de los cookies
    if(accessToken) {
      const cloneRequest = request.clone({ // Clona la peticion y adiciona el Token en los Headers
        headers: request.headers.set('Authorization',`Bearer ${accessToken}`)
      })
      console.log('Token',accessToken)
      return next.handle(cloneRequest)
    } else {
      console.log('No Token')
      return next.handle(request)
    }
  }

  updateAccessTokenAndRefreshToken(request: HttpRequest<unknown>, next: HttpHandler){
    const refreshToken = this.tokenService.getRefreshToken()
    const isValidRefreshToken = this.tokenService.isValidRefreshToken()
    if (refreshToken && isValidRefreshToken ){ // Si el Token de Resfresh aun es valido, y si el existe ( cargado en los cookies )
      return this.authService.postRefreshToken(refreshToken) // Solicitamos en el servicio, el nuevo Token
      .pipe(
        switchMap(() => this.addToken(request, next)) // Llamo a la funcion original .. que clona y adiciona el token en los headers
      )
    }
    return next.handle(request) // Finalmente ..
  }
}

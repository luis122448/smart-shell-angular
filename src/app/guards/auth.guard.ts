import { Dialog } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { Observable } from 'rxjs';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { TokenService } from 'src/app/auth/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private dialog: Dialog,
    private defaultValuesService: DefaultValuesService
  ){}

  canActivate(): boolean {
    // Verificamos si el Token es valido
    const data = this.tokenService.isValidRefreshTokenAdvanced()
    if(data.object){
      return true
    } else {
      // Cuando se rechaza el acceso, porque el Token a vencido
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: data
      });
      this.tokenService.removeToken() // Eliminamos el Token vencido
      this.tokenService.removeRefreshToken()
      this.defaultValuesService.removeAllLocalStorage()
      this.router.navigate(['/login']) // Redirigimos al inicio
      return true
    }
  }
}

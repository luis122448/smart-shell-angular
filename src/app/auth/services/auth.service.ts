import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseAuth, ResponseAuthVerify } from '../models/auth.model';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs'
import { TokenService } from './token.service';
import { environment } from '@enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.API_URL
  AUTH = '/v1/auth'
  constructor(
    private httpClient:HttpClient,
    private tokenService:TokenService
  ) { }

  postLogin(coduser: string, password: string){
    return this.httpClient.post<ResponseAuth>(`${this.API_URL}${this.AUTH}/login`,{
      coduser,
      password
    })
  }

  postVerifyCode(coduser: string, codver: string){
    return this.httpClient.post<ResponseAuthVerify>(`${this.API_URL}${this.AUTH}/verify-code`,{
      coduser,
      codver
    }).pipe(
      tap(data =>{
        if(data.status === 1 && data.token && data.refreshToken){
          this.tokenService.saveToken(data.token)
          this.tokenService.saveRefreshToken(data.refreshToken)
        }
      })
    )
  }

  postRefreshToken(refreshToken: string){
    return this.httpClient.post<ResponseAuthVerify>(`${this.API_URL}${this.AUTH}/refreshtoken`, {refreshToken})
    .pipe(
      tap(data =>{
        if(data.status === 1 && data.token && data.refreshToken){
          this.tokenService.saveToken(data.token)
          this.tokenService.saveRefreshToken(data.refreshToken)
        }
      })
    )
  }

  postLogout(){
    this.tokenService.removeToken()
    this.tokenService.removeRefreshToken()
  }

}

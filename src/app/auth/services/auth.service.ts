import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseAuth, ApiResponseMetadata, AuthVerify } from "../models/auth.model";
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';
import { DefaultValuesService } from './default-values.service';
import { MetadataModel } from "@auth/models/default-values.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.API_URL
  AUTH = environment.PATH_AUTH

  constructor(
    private httpClient:HttpClient,
    private tokenService:TokenService,
    private defaultValuesService: DefaultValuesService
  ) { }

  postLogin(company: string, coduser: string, password: string){
    return this.httpClient.post<ApiResponseMetadata<any, MetadataModel>>(`${this.API_URL}${this.AUTH}/login`,{
      company,
      coduser,
      password
    }).pipe(
      tap(data =>{
        if(data.status === 1 && data.object?.token && data.object?.refreshToken){
          this.tokenService.saveToken(data.object.token)
          this.tokenService.saveRefreshToken(data.object.refreshToken)
        }
      }),
    )
  }

  postVerifyCode(company: string, coduser: string, verifyCode: string){
    return this.httpClient.post<ApiResponseMetadata<AuthVerify, MetadataModel>>(`${this.API_URL}${this.AUTH}/verify-code`,{
      company,
      coduser,
      verifyCode
    }).pipe(
      tap(data =>{
        if(data.status === 1 && data.object?.token && data.object?.refreshToken){
          this.tokenService.saveToken(data.object.token)
          this.tokenService.saveRefreshToken(data.object.refreshToken)
        }
      })
    )
  }

  postRefreshToken(refreshToken: string){
    return this.httpClient.post<ApiResponseAuth<AuthVerify>>(`${this.API_URL}${this.AUTH}/refresh-token`, {refreshToken})
    .pipe(
      tap(data =>{
        if(data.status === 1 && data.object?.token && data.object?.refreshToken){
          this.tokenService.saveToken(data.object.token)
          this.tokenService.saveRefreshToken(data.object.refreshToken)
        }
      })
    )
  }

  postLogout(){
    this.tokenService.removeToken()
    this.tokenService.removeRefreshToken()
    this.defaultValuesService.removeAllLocalStorage()
  }

}

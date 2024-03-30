import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseObject } from '@billing-models/api-reponse.model';
import { User } from '@billing-models/user.model';
import { environment } from '@enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING
  constructor(
    private httpCliente: HttpClient
  ) { }

  getProfile(){
    return this.httpCliente.get<ApiResponseObject<User>>(`${this.API_URL}${this.PATH_BILLING}/user/profile`)
  }

}

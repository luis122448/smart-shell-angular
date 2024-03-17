import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DAOSeller } from '../models/vendedor.mode';
import { environment } from '@enviroment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpCLient: HttpClient
  ) { }

  getAll(){
    return this.httpCLient.get<DAOSeller>(`${this.API_URL}${this.PATH_BILLING}/seller/by-all`);
  }

}

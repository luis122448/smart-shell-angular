import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DAOTypeInventory } from '../models/type-inventory.model';
import { catchError, of } from 'rxjs'
import { environment } from '@enviroment';

@Injectable({
  providedIn: 'root'
})
export class TypeInventoryService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING
  constructor(
    private httpCliente: HttpClient
  ) { }

  getAll(){
    return this.httpCliente.get<DAOTypeInventory>(`${this.API_URL}${this.PATH_BILLING}/type-inventory/by-all`)
    .pipe(catchError(
      error => of({
        status: -3,
        message: error.message,
        list: []
      })
    ))
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { DAOTypePaymentCondition } from '@billing-models/type-payment-condition.model';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypePaymentConditionService {

  API_URL = environment.API_URL;
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpCLient: HttpClient
  ) { }

  getByAll(){
    return this.httpCLient.get<DAOTypePaymentCondition>(`${this.API_URL}${this.PATH_BILLING}/type-payment-condition/by-all`)
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'list': []
      })))
  }

}

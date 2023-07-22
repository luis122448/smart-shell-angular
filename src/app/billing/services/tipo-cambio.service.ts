import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map,catchError  } from 'rxjs/operators';
import { ExchangeRateSunat, DAOExchangeRate } from '../models/tipo-cambio.model';
import { environment } from '@enviroment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  API_URL_SUNAT = 'https://www.sunat.gob.pe/a/txt/tipoCambio.txt'
  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING
  constructor(
    private httpCliente: HttpClient
  ) { }

  getExchangeRateSunat(): Observable<ExchangeRateSunat>{
    return this.httpCliente.get<string>(this.API_URL_SUNAT)
    .pipe(map(data =>{
      const parts = data.split('|')
      return {
        registdate: new Date(parts[0]),
        eventa: parseFloat(parts[1]),
        ecompra: parseFloat(parts[2])
      }
    }),
    catchError(error =>{
      console.log(error)
      throw error;
    }))
  }

  getByLike(startat: Date, finalat: Date, origen: string, destin: string){
    let params = new HttpParams()
    const datePipe = new DatePipe('en-US');

    const auxFinicio = datePipe.transform(startat, 'dd/MM/yyyy')
    const auxFfinal = datePipe.transform(finalat, 'dd/MM/yyyy')
    if ( auxFinicio && auxFfinal ) {
      params = params.set('startat',auxFinicio);
      params = params.set('finalat',auxFfinal);
      if (origen && destin) {
        params = params.set('origen', origen);
        params = params.set('destin', destin);
      }
      return this.httpCliente.get<DAOExchangeRate>(`${this.API_URL}${this.PATH_BILLING}/exchange-rate/by-like`, { params: params })
        .pipe(catchError(
          error => of({
            'status':-3,
            'message':error.message,
            'list': []
          })
        ));
    } else {
      return of({
        'status':-3,
        'message':'EL filtro de Fecha es Obligatorio',
        'list': []
      })
    }
  }

  postSave(data: ExchangeRateSunat){
    return this.httpCliente.post<DAOExchangeRate>(`${this.API_URL}${this.PATH_BILLING}/exchange-rate`,data)
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'object': null
      })
    ))
  }

  delDelete(registdate: Date, origen: string, destin: string){
    let params = new HttpParams()
    .set('registdate', registdate.toISOString().split('T')[0]) // Convierte la registdate a formato "YYYY-MM-DD"
    .set('origen', origen)
    .set('destin', destin)
    return this.httpCliente.delete<DAOExchangeRate>(`${this.API_URL}${this.PATH_BILLING}/exchange-rate`,{ params: params })
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'object': null
      })
    ))
  }

}

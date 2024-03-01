import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map,catchError  } from 'rxjs/operators';
import { ExchangeRateSunat, DAOExchangeRate, ExchangeRateAPISunat } from '../models/exchange-rate.model';
import { environment } from '@enviroment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  API_URL_SUNAT = 'https://api.sunat.dev/sunat/tc'
  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING
  constructor(
    private httpCliente: HttpClient
  ) { }

  getExchangeRateSunat(date: Date): Observable<ExchangeRateSunat>{
    let params = new HttpParams()
    .set('fechaInicio', date.toISOString().split('T')[0]) // Convierte la fecha a formato "YYYY-MM-DD"
    .set('fechaFin', date.toISOString().split('T')[0]) // Convierte la fecha a formato "YYYY-MM-DD"
    .set('apikey', environment.API_SUNAT_TOKEN)
    return this.httpCliente.get<ExchangeRateAPISunat>(this.API_URL_SUNAT, { params })
    .pipe(
      // CAPTURE THE ERROR
      // {"statusCode":400,"body":{"errors":[{"message":"error en parametros"}]}}
      map(data =>{
      if (data.statusCode == 400) {
        throw new Error('The exchange rate was not found for the selected date')
      }
      if (data.statusCode !== 200) {
        throw new Error(data.body.errors[0].message)
      }
      const parts = data.body.data.tipoCambioByFecha.items[0]
      return {
        registdate: new Date(parts.fechaSunat),
        eventa: parseFloat(parts.venta),
        ecompra: parseFloat(parts.compra)
      }
    }),
    catchError(error =>{
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

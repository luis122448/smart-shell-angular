import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InterlocutorComercial, DAOInterlocutorComercial, DTOInterlocutorComercial, PAGEInterlocutorComercial, DTOIntcomCondicionPago, IntcomCondicionPago, DAOIntcomCondicionPagoView } from '../models/interlocutor-comercial.model';
import { of, catchError, Observable } from 'rxjs'
import { environment } from '@enviroment';

@Injectable({
  providedIn: 'root'
})
export class BusinessPartnerService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING
  PATH_BUSINESS_PARTNER = environment.PATH_BUSINESS_PARTNER

  constructor(
    private httpCLient: HttpClient
  ) { }

  getByLike(codbuspar : string, busnam: string, status : string = 'S'){
    let params = new HttpParams();
    params = params.set('codbuspar',codbuspar)
    params = params.set('busnam',busnam)
    params = params.set('status',status)
    return this.httpCLient.get<DAOInterlocutorComercial>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/by-like`,{ params })
  }

  // getClienteCodintcom(codbuspar : string, status : string = 'S'){
  //   let params = new HttpParams();
  //   params = params.set('codbuspar',codbuspar)
  //   params = params.set('status',status)
  //   return this.httpCLient.get<DAOInterlocutorComercial>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/by-like`,{ params })
  // }

  // getClienteRazsoc(busnam: string, status : string = 'S'){
  //   let params = new HttpParams()
  //   params = params.set('busnam',busnam)
  //   params = params.set('status',status)
  //   return this.httpCLient.get<DAOInterlocutorComercial>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/by-like`,{ params })
  // }

  getById(codbuspar: string): Observable<DTOInterlocutorComercial>{
    return this.httpCLient.get<DTOInterlocutorComercial>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/${codbuspar}`)
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'object': null
      })))
  }

  getByPage(typbuspar:number, codbuspar: string,busnam: string,status: boolean, pageSize: number = 10,pageIndex: number = 0){
    let params = new HttpParams()
    params = params.set('typbuspar',typbuspar)
    params = params.set('codbuspar',codbuspar)
    params = params.set('busnam',busnam)
    if (!status) {
      params = params.set('status','S')
    }
    params = params.set('size',pageSize.toString())
    params = params.set('page',pageIndex.toString())
    return this.httpCLient.get<PAGEInterlocutorComercial>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/by-page`,{ params })
  }

  postSave(data: InterlocutorComercial): Observable<DTOInterlocutorComercial>{
    return this.httpCLient.post<DTOInterlocutorComercial>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}`,data)
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'object': null
      })))
  }

  putUpdate(codbuspar: string, data: InterlocutorComercial): Observable<DTOInterlocutorComercial>{
    return this.httpCLient.put<DTOInterlocutorComercial>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/${codbuspar}`,data)
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'object': null
      })))
  }

  delDelete(codbuspar: string): Observable<DTOInterlocutorComercial>{
    return this.httpCLient.delete<DTOInterlocutorComercial>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/${codbuspar}`)
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'object': null
      })))
  }

  putUndelete(codbuspar: string): Observable<DTOInterlocutorComercial>{
    return this.httpCLient.put<DTOInterlocutorComercial>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/undelete/${codbuspar}`,{})
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'object': null
      })))
  }

  // Relacionado con la Condicion de Pago
  getByCodintcomCondicionPago(codbuspar: string){
    let params = new HttpParams().set('codbuspar',codbuspar)
    return this.httpCLient.get<DAOIntcomCondicionPagoView>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/typpaycon`,{ params })
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'list': []
      })))
  }

  postSaveCondicionPago(data: IntcomCondicionPago): Observable<DTOIntcomCondicionPago>{
    return this.httpCLient.post<DTOIntcomCondicionPago>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/typpaycon`,data)
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'object': null
      })))
  }

  delDeleteCondicionPago(codbuspar: string,typpaycon: number): Observable<DTOIntcomCondicionPago>{
    let params = new HttpParams()
    params = params.set('codbuspar',codbuspar)
    params = params.set('typpaycon',typpaycon)
    return this.httpCLient.delete<DTOIntcomCondicionPago>(`${this.API_URL}${this.PATH_BILLING}${this.PATH_BUSINESS_PARTNER}/typpaycon`,{ params })
    .pipe(catchError(
      error => of({
        'status':-3,
        'message':error.message,
        'object': null
      })))
  }

}

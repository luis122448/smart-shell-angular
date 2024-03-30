import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FacbolGlobalStatusService {

  private isStatusInvoiceRegister = new BehaviorSubject<boolean>(false)
  private isStatusInvoiceRegisterDetail = new BehaviorSubject<boolean>(false)
  private isStatusInvoiceSave = new BehaviorSubject<boolean>(false)
  isStatusInvoiceRegister$ = this.isStatusInvoiceRegister.asObservable()
  isStatusInvoiceRegisterDetail$ = this.isStatusInvoiceRegisterDetail.asObservable()
  isStatusInvoiceSave$ = this.isStatusInvoiceSave.asObservable()

  constructor(
  ) {}

  setStatusInvoiceRegister(isStatus: boolean){
    this.isStatusInvoiceRegister.next(isStatus)
  }

  getStatusInvoiceRegister(){
    return this.isStatusInvoiceRegister.getValue()
  }

  setStatusInvoiceRegisterDetail(isStatus: boolean){
    this.isStatusInvoiceRegisterDetail.next(isStatus)
  }

  getStatusInvoiceRegisterDetail(){
    return this.isStatusInvoiceRegisterDetail.getValue()
  }

  setStatusInvoiceSave(isStatus: boolean){
    this.isStatusInvoiceSave.next(isStatus)
  }

  getStatusInvoiceSave(){
    return this.isStatusInvoiceSave.getValue()
  }
}

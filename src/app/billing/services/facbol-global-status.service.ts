import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FacbolGlobalStatusService {

  private isStatusInvoiceReceiptRegister = new BehaviorSubject<boolean>(false)
  private isStatusInvoiceReceiptRegisterDetail = new BehaviorSubject<boolean>(false)
  private isStatusInvoiceReceiptSave = new BehaviorSubject<boolean>(false)
  isStatusInvoiceReceiptRegister$ = this.isStatusInvoiceReceiptRegister.asObservable()
  isStatusInvoiceReceiptRegisterDetail$ = this.isStatusInvoiceReceiptRegisterDetail.asObservable()
  isStatusInvoiceReceiptSave$ = this.isStatusInvoiceReceiptSave.asObservable()

  constructor(
  ) {}

  setStatusInvoiceReceiptRegister(isStatus: boolean){
    this.isStatusInvoiceReceiptRegister.next(isStatus)
  }

  getStatusInvoiceReceiptRegister(){
    return this.isStatusInvoiceReceiptRegister.getValue()
  }

  setStatusInvoiceReceiptRegisterDetail(isStatus: boolean){
    this.isStatusInvoiceReceiptRegisterDetail.next(isStatus)
  }

  getStatusInvoiceReceiptRegisterDetail(){
    return this.isStatusInvoiceReceiptRegisterDetail.getValue()
  }

  setStatusInvoiceReceiptSave(isStatus: boolean){
    this.isStatusInvoiceReceiptSave.next(isStatus)
  }

  getStatusInvoiceReceiptSave(){
    return this.isStatusInvoiceReceiptSave.getValue()
  }
}

import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FacbolGlobalStatusService {

  private isStatusInvoiceRegister = new BehaviorSubject<boolean>(false)
  private isStatusInvoiceSave = new BehaviorSubject<boolean>(false)
  isStatusInvoiceRegister$ = this.isStatusInvoiceRegister.asObservable()
  isStatusInvoiceSave$ = this.isStatusInvoiceSave.asObservable()

  constructor(
  ) {}

  setStatusInvoiceRegister(isStatus: boolean){
    this.isStatusInvoiceRegister.next(isStatus)
  }

  getStatusInvoiceRegister(){
    return this.isStatusInvoiceRegister.getValue()
  }

  setStatusInvoiceSave(isStatus: boolean){
    this.isStatusInvoiceSave.next(isStatus)
  }

  getStatusInvoiceSave(){
    return this.isStatusInvoiceSave.getValue()
  }
}

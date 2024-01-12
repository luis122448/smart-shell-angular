import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class GlobalStatusService {

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private isStatusInvoiceSubject = new BehaviorSubject<'search' | 'register'>('register');
  private isStatusConfigurationSubject = new BehaviorSubject<'company' | 'serie'>('company');
  private isBranchSubject = new BehaviorSubject<string>('1');
  private isPlaceOfIssue = new BehaviorSubject<string>('1');
  isLoading$ = this.isLoadingSubject.asObservable()
  isStatusInvoice$ = this.isStatusInvoiceSubject.asObservable()
  isStatusConfiguration$ = this.isStatusConfigurationSubject.asObservable()
  isBranchSubject$ = this.isBranchSubject.asObservable()
  isPlaceOfIssue$ = this.isPlaceOfIssue.asObservable()

  constructor(
    private ngxSpinnerService: NgxSpinnerService
  ) {}

  getLoading() {
    return this.isLoadingSubject.getValue();
  }
  setLoading(isLoading: boolean) {
    this.isLoadingSubject.next(isLoading);
    if(isLoading){
      this.ngxSpinnerService.show()
    } else {
      this.ngxSpinnerService.hide()
    }
  }

  getStatusInvoice(){
    return this.isStatusInvoiceSubject.getValue()
  }
  setStatusInvoice(data: 'search' | 'register'){
    this.isStatusInvoiceSubject.next(data)
  }

  getStatusConfiguration(){
    return this.isStatusConfigurationSubject.getValue()
  }

  setStatusConfiguration(data: 'company' | 'serie'){
    this.isStatusConfigurationSubject.next(data)
  }

  getBranchSubject(){
    return this.isBranchSubject.getValue()
  }
  setBranchSubject(data: string){
    this.isBranchSubject.next(data)
  }

  getPlaceOfIssue(){
    return this.isPlaceOfIssue.getValue()
  }
  setPlaceOfIssue(data: string){
    this.isPlaceOfIssue.next(data)
  }

}

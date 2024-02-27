import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypePaymentConditionService } from '../../services/type-payment-condition.service';
import { GlobalStatusService } from '../../services/global-status.service';
import { Dialog } from '@angular/cdk/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchDocumentInvoice, SearchFilterDocumentInvoice } from '@billing-models/document-invoice.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SituationCommercialDocumentService } from '@billing-services/situation-commercial-document.service';
import { ReasonCommercialDocumentService } from '@billing-services/reason-commercial-document.service';
import { SituationCommercialDocument } from '@billing-models/situacion-commercial-document';
import { ReasonCommercialDocument } from '@billing-models/reason-commercial-document';
import { InterlocutorComercial } from '@billing-models/interlocutor-comercial.model';
import { DialogGetClienteComponent } from '@billing/modules/interlocutor-comercial/page/dialog-get-cliente/dialog-get-cliente.component';
import { TypePaymentCondition } from '@billing-models/type-payment-condition.model';
import { DocumentInvoiceService } from '@billing-services/document-invoice.service';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { Currency, Seller, Serie } from 'src/app/auth/models/default-values.model';

@Component({
  selector: 'app-search-facbol',
  templateUrl: './search-facbol.component.html',
  styleUrls: ['./search-facbol.component.scss']
})
export class SearchFacbolComponent implements OnInit{

  faMagnifyingGlass = faMagnifyingGlass
  faXmark = faXmark
  situations : SituationCommercialDocument[] = []
  reasons : ReasonCommercialDocument[] = []
  paymentConditions : TypePaymentCondition[] = []
  statusBuspar = false;

  formSearchDocument! : FormGroup
  private buidForm(){
    const today = new Date().toJSON().split('T')[0]
    const beforeSevenDays = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toJSON().split('T')[0]
    this.formSearchDocument = this.formBuilder.group({
      typcomdoc : [1,[Validators.required]],
      startat : [beforeSevenDays,[Validators.required]],
      finalat : [today,[Validators.required]],
      sitcomdoc : this.formBuilder.array([1]),
      reacomdoc : this.formBuilder.array([1]),
      codbranch : ['-1',[]],
      codplaiss : ['-1',[]],
      serie : ['-1',[]],
      codcur : ['-1',[]],
      codsel : ['-1',[]],
      typpaycon : ['-1',[]],
      codbuspar : ['-1',[]],
      busnam : ['-1',[]]
    })
  }
  dataSourceSearchDocument =  DataSourceSearchDocumentInvoice.getInstance();
  // Default Values
  series : Serie[]
  sellers : Seller[]
  currencies : Currency[]

  constructor(
    private formBuilder:FormBuilder,
    private typePaymentConditionService:TypePaymentConditionService,
    private documentInvoiceService:DocumentInvoiceService,
    private globalStatusService:GlobalStatusService,
    private defaultValuesService:DefaultValuesService,
    private dialog: Dialog,
    private matSnackBar: MatSnackBar
  ){
    this.buidForm()
    this.series = this.defaultValuesService.getCookieValue('series').filter(data => data.typcomdoc === 1)
    this.sellers = this.defaultValuesService.getCookieValue('sellers')
    this.currencies = this.defaultValuesService.getCookieValue('currencies')
  }

  ngOnInit(): void {
    this.series = this.defaultValuesService.getCookieValue('series').filter(data => data.typcomdoc === 1)
    this.sellers = this.defaultValuesService.getCookieValue('sellers')
    this.currencies = this.defaultValuesService.getCookieValue('currencies')
    this.reasons = this.defaultValuesService.getCookieValue('reasons').filter(data => data.typcomdoc === 1)
    this.situations = this.defaultValuesService.getCookieValue('situations').filter(data => data.typcomdoc === 1)
    this.typePaymentConditionService.getByAll()
    .subscribe({
      next:data =>{
        this.paymentConditions = data.list
      }
    })
    this.globalStatusService.isPlaceOfIssue$.subscribe(
      {
        next:data => {this.codplaiss?.setValue(data)}
      }
    )
    this.globalStatusService.isBranchSubject$.subscribe(
      {
        next:data => {this.codbranch?.setValue(data)}
      }
    )
  }

  changeTypcomdoc(event: any){
    const typcomdoc: number = parseInt(event.target.value)
    this.series = this.defaultValuesService.getCookieValue('series').filter(data => data.typcomdoc === typcomdoc)
    this.reasons = this.defaultValuesService.getCookieValue('reasons').filter(data => data.typcomdoc === typcomdoc)
    this.situations = this.defaultValuesService.getCookieValue('situations').filter(data => data.typcomdoc === typcomdoc)
  }

  toggleSelectionSituation(option: string){
    const index = this.sitcomdoc.value.indexOf(option);
    if (index === -1) {
      this.sitcomdoc.push(this.formBuilder.control(option));
    } else {
      this.sitcomdoc.removeAt(index);
    }
  }

  toggleSelectAllSituation(event: any){
    const isChecked = event?.target?.checked;
    if (isChecked) {
      this.situations.forEach(data => {
        this.sitcomdoc.push(this.formBuilder.control(data.sitcomdoc))
      })
    } else {
      this.sitcomdoc.clear()
    }
  }

  toggleSelectionReason(option: string){
    const index = this.reacomdoc.value.indexOf(option);
    if (index === -1) {
      this.reacomdoc.push(this.formBuilder.control(option));
    } else {
      this.reacomdoc.removeAt(index);
    }
  }


  toggleSelectAllReason(event: any){
    const isChecked = event?.target?.checked;
    if (isChecked) {
      this.reasons.forEach(data => {
        this.reacomdoc.push(this.formBuilder.control(data.reacomdoc))
      })
    } else {
      this.reacomdoc.clear()
    }
  }

  isInputInvalid(fieldName: string): boolean{
    const field = this.formSearchDocument.get(fieldName)
    return field ? field.invalid && field.touched : true
  }

  openDialogGetCli(){
    const dialogRef = this.dialog.open<InterlocutorComercial>(DialogGetClienteComponent, {
      data: { codbuspar: this.codbuspar?.value,busnam: this.busnam?.value  }
    });
    dialogRef.closed.subscribe({
      next:data => {
        if (data) {
          this.statusBuspar = true
          this.codbuspar?.setValue(data.codbuspar)
          this.busnam?.setValue(data.busnam)
        }
      }
    })
  }

  cleanBuspar(){
    this.codbuspar?.setValue('')
    this.busnam?.setValue('')
    this.statusBuspar = false
  }

  searchDocument(){
    if (this.formSearchDocument.valid){
      this.globalStatusService.setLoading(true)
      const searchFilterDocumentInvoice : SearchFilterDocumentInvoice = {
        typcomdoc: this.typcomdoc?.value,
        startat: this.startat?.value,
        finalat: this.finalat?.value,
        sitcomdoc: this.sitcomdoc.value.join(','),
        reacomdoc: this.reacomdoc.value.join(','),
        codbranch: this.codbranch?.value,
        codplaiss: this.codplaiss?.value,
        serie: this.serie?.value,
        codcur: this.codcur?.value,
        codsel: this.codsel?.value,
        typpaycon: this.typpaycon?.value,
        codbuspar: this.codbuspar?.value,
        busnam: this.busnam?.value
      }
      this.documentInvoiceService.getSearchDocument(searchFilterDocumentInvoice)
      .subscribe({
        next:data =>{
          if (data.status<=0) {
            this.dialog.open(DialogErrorAlertComponent,{
              width: '400px',
              data: { status:data.status, meesage:data.message }
            })
          }
          this.dataSourceSearchDocument.getInit(data.list)
        },
        error:err =>{
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: err.error
          })
          this.globalStatusService.setLoading(false)
        },
        complete: () => this.globalStatusService.setLoading(false)
      })
    } else {
      this.dialog.open(DialogErrorAlertComponent,{
        width: '400px',
        data: { no_fields_required: 'Y'}
      })
      this.formSearchDocument.markAllAsTouched()
    }
  }

  get typcomdoc(){
    return this.formSearchDocument.get('typcomdoc')
  }
  get startat(){
    return this.formSearchDocument.get('startat')
  }
  get finalat(){
    return this.formSearchDocument.get('finalat')
  }
  get sitcomdoc(): FormArray{
    return this.formSearchDocument.get('sitcomdoc') as FormArray
  }
  get reacomdoc(): FormArray{
    return this.formSearchDocument.get('reacomdoc') as FormArray
  }
  get codbranch(){
    return this.formSearchDocument.get('codbranch')
  }
  get codplaiss(){
    return this.formSearchDocument.get('codplaiss')
  }
  get serie(){
    return this.formSearchDocument.get('serie')
  }
  get codcur(){
    return this.formSearchDocument.get('codcur')
  }
  get codsel(){
    return this.formSearchDocument.get('codsel')
  }
  get typpaycon(){
    return this.formSearchDocument.get('typpaycon')
  }
  get codbuspar(){
    return this.formSearchDocument.get('codbuspar')
  }
  get busnam(){
    return this.formSearchDocument.get('busnam')
  }

}

export class DataSourceSearchDocumentInvoice extends DataSource<SearchDocumentInvoice> {
  private static instance: DataSourceSearchDocumentInvoice;
  private data = new BehaviorSubject<SearchDocumentInvoice[]>([]);

  private constructor() {
    super();
  }

  public static getInstance(): DataSourceSearchDocumentInvoice {
    if (!DataSourceSearchDocumentInvoice.instance) {
      DataSourceSearchDocumentInvoice.instance = new DataSourceSearchDocumentInvoice();
    }
    return DataSourceSearchDocumentInvoice.instance;
  }

  connect(): Observable<SearchDocumentInvoice[]> {
    return this.data;
  }

  disconnect() {}

  getInit(data: SearchDocumentInvoice[]) {
    this.data.next(data);
  }

  get() {
    return this.data.getValue();
  }

  getCount() {
    const aux = this.data.getValue();
    return aux.reduce((count, data) => count + 1, 0);
  }
}

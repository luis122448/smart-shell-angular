import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypePaymentConditionService } from '../../services/type-payment-condition.service';
import { SerieCommercialDocumentService } from '../../services/serie-commercial-document.service';
import { BusinessPartnerService } from '../../services/interlocutor-comcercial.service';
import { GlobalStatusService } from '../../services/global-status.service';
import { Dialog } from '@angular/cdk/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchDocumentInvoice } from '@billing-models/document-invoice.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SerieCommercialDocument } from '@billing-models/serie-commercial-document.model';
import { SituationCommercialDocumentService } from '@billing-services/situation-commercial-document.service';
import { ReasonCommercialDocumentService } from '@billing-services/reason-commercial-document.service';
import { SituationCommercialDocument } from '@billing-models/situacion-commercial-document';
import { ReasonCommercialDocument } from '@billing-models/reason-commercial-document';
import { InterlocutorComercial } from '@billing-models/interlocutor-comercial.model';
import { DialogGetClienteComponent } from '@billing/modules/interlocutor-comercial/page/dialog-get-cliente/dialog-get-cliente.component';
import { TypePaymentCondition } from '@billing-models/type-payment-condition.model';
import { DocumentInvoiceService } from '@billing-services/document-invoice.service';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { DatePipe } from '@angular/common';
import { faRectangleList,faPrint,faEnvelope,faBuildingColumns,faBan } from '@fortawesome/free-solid-svg-icons';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { Currency, Seller, Serie } from 'src/app/auth/models/default-values.model';
import { MyDate } from '@billing-utils/date';
import { forkJoin } from 'rxjs';

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
    this.formSearchDocument = this.formBuilder.group({
      typcomdoc : [1,[Validators.required]],
      startat : ['',[Validators.required]],
      finalat : ['',[Validators.required]],
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
    private situationCommercialDocumentService:SituationCommercialDocumentService,
    private reasonCommercialDocumentService:ReasonCommercialDocumentService,
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
    const defaultFinalDate = new Date()
    const defaultStartDate = new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate())
    this.formSearchDocument.patchValue({
      startat: defaultStartDate.toISOString().substring(0, 10), // Formato yyyy-MM-dd
      finalat: defaultFinalDate.toISOString().substring(0, 10)
    });
  }

  ngOnInit(): void {
    this.series = this.defaultValuesService.getCookieValue('series').filter(data => data.typcomdoc === 1)
    this.sellers = this.defaultValuesService.getCookieValue('sellers')
    this.currencies = this.defaultValuesService.getCookieValue('currencies')
    this.situationCommercialDocumentService.getByTypcomdoc(this.typcomdoc?.value)
    .subscribe({
      next:data =>{
        this.situations = data.list
      }
    })
    this.reasonCommercialDocumentService.getByLike(this.typcomdoc?.value, 1)
    .subscribe({
      next:data =>{
        this.reasons = data.list
      }
    })
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
  }

  toggleSelectionSituation(option: string){
    const index = this.sitcomdoc.value.indexOf(option);
    if (index === -1) {
      this.sitcomdoc.push(this.formBuilder.control(option));
    } else {
      this.sitcomdoc.removeAt(index);
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
    console.log(this.formSearchDocument.value)
    if (this.formSearchDocument.valid){
      // Eliminar la propiedad busnam
      delete this.formSearchDocument.value.busnam;
      // Convertir los valores de sitcomdoc y reacomdoc en una cadena separada por comas
      this.formSearchDocument.value.sitcomdoc = this.formSearchDocument.value.sitcomdoc.join(',');
      this.formSearchDocument.value.reacomdoc = this.formSearchDocument.value.reacomdoc.join(',');
      this.globalStatusService.setLoading(true)
      this.documentInvoiceService.getSearchDocument(this.formSearchDocument.value)
      .subscribe({
        next:data =>{
          console.log('Info : ',data)
          if (data.list.length === 0) {
            this.dialog.open(DialogErrorAlertComponent,{
              width: '400px',
              data: { no_data_found: 'S' }
            })
          }
          this.dataSourceSearchDocument.getInit(data.list)
          console.log('Values : ',this.dataSourceSearchDocument.get())
          this.globalStatusService.setLoading(false)
        },
        error:error =>{
          console.log(error)
          this.globalStatusService.setLoading(false)
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: { status:-1, message: "An Unknow Error", logMessage: "" }
          })
        }
      })
    } else {
      this.dialog.open(DialogErrorAlertComponent,{
        width: '400px',
        data: { status:-1, message: "Invalid query, review the required fields" }
      })
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

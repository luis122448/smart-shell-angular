import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { DataSource } from '@angular/cdk/collections';
import { ExchangeRate } from '@billing-models/tipo-cambio.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExchangeRateService } from '../../services/tipo-cambio.service';
import { faPenToSquare, faBroom, faTrashCan, faFilePen,faFileInvoice, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { DialogErrorAlertComponent } from '@shared-components/dialog-error-alert/dialog-error-alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoDataFoundMessageDialog, MatSnackBarSuccessConfig } from '../../utils/constants';
import { GlobalStatusService } from '../../services/global-status.service';
import { decimalExchangeRate } from '../../utils/validator';
import { MatsnackbarSuccessComponent } from '@shared-components/matsnackbar-success/matsnackbar-success.component';
import { MyDate } from '../../utils/date';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog-crud-tipo-cambio',
  templateUrl: './dialog-crud-tipo-cambio.component.html',
  styleUrls: ['./dialog-crud-tipo-cambio.component.scss']
})
export class DialogCrudExchangeRateComponent implements OnInit {

  faPenToSquare = faPenToSquare
  faBroom = faBroom
  faTrashCan = faTrashCan
  faFilePen = faFilePen
  faFileInvoice = faFileInvoice
  faCircleInfo = faCircleInfo
  formSearchExchangeRate!: FormGroup
  formCrudExchangeRate! : FormGroup
  dataSource = new DataSourceExchangeRate()
  displayedColumns: string[] = ['registdate','origen','destin','eventa','ecompra','operac']
  labelTab = ['Tipo de Cambio - Historial','Registrar Tipo de Cambio','Ayuda']
  selectedTab = new FormControl(0)

  private buildForm(){
    this.formSearchExchangeRate = this.formBuilder.group({
      startat: [new Date(),[Validators.required]],
      finalat: [new Date(),[Validators.required]],
      origen: ['',[]],
      destin: ['',[]],
    })
    this.formCrudExchangeRate = this.formBuilder.group({
      registdate: [new Date(),[Validators.required]],
      origen: ['PEN',[Validators.required]],
      destin: ['USD',[Validators.required]],
      fventa: [0.00,[]],
      fcompra: [0.00,[]],
      cventa: [0.00,[]],
      ccompra: [0.00,[]],
      eventa: [0.00,[Validators.required, Validators.min(2), Validators.max(5), Validators.pattern(/^\d{1,5}(?:\.\d{0,4})?$/)]],
      ecompra: [0.00,[Validators.required, Validators.min(2), Validators.max(5), Validators.pattern(/^\d{1,5}(?:\.\d{0,4})?$/)]]
    })
  }

  isInputInvalid(fieldName: string): boolean{
    const field = this.formCrudExchangeRate.get(fieldName)
    return field ? field.invalid && field.touched : true
  }
  formatDate(date: number[]): String {
    const aux : Date = MyDate.convertToCustomDateShort(date)
    // Si la registdate recibida es Valida ... ( Asincronismo )
    if (aux instanceof Date && !isNaN(aux.getTime())){
      return this.datePipe.transform(aux,'dd/MM/yy') || ''
    }
    return ''
  }

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private matSnackBar: MatSnackBar,
    private tipoCambioService : ExchangeRateService,
    private globalStatusService: GlobalStatusService,
  ){
    this.buildForm()
  }
  ngOnInit(): void {
    this.globalStatusService.setLoading(true)
    this.tipoCambioService.getByLike(this.startat?.value, this.finalat?.value,
      '', '')
    .subscribe({
      next:data => {
      this.dataSource.getInit(data.list)
      if (data.status <= 0){
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: { status:data.status, message:data.message }
        })
      } else {
        data.list.length === 0 ? this.dialog.open(DialogErrorAlertComponent, NoDataFoundMessageDialog) : this.matSnackBar.openFromComponent(MatsnackbarSuccessComponent,MatSnackBarSuccessConfig)
      }
      this.globalStatusService.setLoading(false)},
      error:error => {
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: { status:-3, message:error.message }
      })
      this.globalStatusService.setLoading(false)}
    })
  }

  searchExchangeRate(){
    this.globalStatusService.setLoading(true)
    this.tipoCambioService.getByLike(this.startat?.value, this.finalat?.value,this.origen?.value, this.destin?.value)
    .subscribe({
      next:data => {
      this.dataSource.getInit(data.list)
      if (data.status <= 0){
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: { status:data.status, message:data.message }
        })
      } else {
        data.list.length === 0 ? this.dialog.open(DialogErrorAlertComponent, NoDataFoundMessageDialog) : this.matSnackBar.openFromComponent(MatsnackbarSuccessComponent,MatSnackBarSuccessConfig)
      }
      this.globalStatusService.setLoading(false)},
      error:error => {
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: { status:-3, message:error.message }
      })
      this.globalStatusService.setLoading(false)}
    })
  }

  crudExchangeRate(row: ExchangeRate | null){
    this.selectedTab.setValue(1)
  }

  importSunat(){
    this.globalStatusService.setLoading(true)
    this.tipoCambioService.getExchangeRateSunat()
    .subscribe({
      next:data =>{
        this.crudFecha?.setValue(data.registdate)
        this.crudEventa?.setValue(data.eventa)
        this.crudEcompra?.setValue(data.ecompra)
        this.crudFventa?.setValue(data.eventa)
        this.crudFcompra?.setValue(data.ecompra)
        this.crudCventa?.setValue(data.eventa)
        this.crudCcompra?.setValue(data.ecompra)
        this.matSnackBar.openFromComponent(MatsnackbarSuccessComponent,MatSnackBarSuccessConfig)
        this.globalStatusService.setLoading(false)
      },
      error:error =>{
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: { status:-3, message:error.message }
        })
        this.globalStatusService.setLoading(false)
      }
    })
  }

  saveExchangeRate(){
    if (this.formCrudExchangeRate.valid) {
      this.globalStatusService.setLoading(true)
      if (this.crudCcompra) {
        this.crudCcompra.setValue(this.crudEcompra?.value)
      }
      if (this.crudFcompra) {
        this.crudFcompra.setValue(this.crudEcompra?.value)
      }
      if (this.crudCventa) {
        this.crudCventa.setValue(this.crudEventa?.value)
      }
      if (this.crudFventa) {
        this.crudFventa.setValue(this.crudEventa?.value)
      }
      this.tipoCambioService.postSave(this.formCrudExchangeRate.value)
      .subscribe(data => {
        if (data.status <= 0) {
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: {status: data.status, message: data.message}
          })
        } else {
          this.matSnackBar.openFromComponent(MatsnackbarSuccessComponent ,MatSnackBarSuccessConfig)
          this.formCrudExchangeRate.patchValue({
            fventa: 0,
            fcompra: 0,
            cventa: 0,
            ccompra: 0,
            eventa: 0,
            ecompra: 0,
          });
        }
        this.globalStatusService.setLoading(false)
      })
    } else {
      this.formCrudExchangeRate.markAllAsTouched()
    }
  }

  deleteExchangeRate(row: ExchangeRate){
    this.globalStatusService.setLoading(true)
    this.tipoCambioService.delDelete(MyDate.convertToCustomDateShort(row.registdate), row.origen, row.destin)
    .subscribe({
      next:data => {
        if (data.status <= 0) {
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: {status: data.status, message: data.message}
          })
        } else {
          this.matSnackBar.openFromComponent(MatsnackbarSuccessComponent ,MatSnackBarSuccessConfig)
          this.dataSource.getClean(row)
        }
      this.globalStatusService.setLoading(false)},
      error:error =>{
        console.log(error)
        this.globalStatusService.setLoading(false)
      }
    })
  }

  closeDialog(){
    this.dialogRef.close()
  }

  get startat(){
    return this.formSearchExchangeRate.get('startat')
  }
  get finalat(){
    return this.formSearchExchangeRate.get('finalat')
  }
  get origen(){
    return this.formSearchExchangeRate.get('origen')
  }
  get destin(){
    return this.formSearchExchangeRate.get('destin')
  }

  get crudFecha(){
    return this.formCrudExchangeRate.get('registdate')
  }

  get crudMonori(){
    return this.formCrudExchangeRate.get('origen')
  }

  get crudMondes(){
    return this.formCrudExchangeRate.get('destin')
  }
  get crudFventa(){
    return this.formCrudExchangeRate.get('fventa')
  }
  get crudFcompra(){
    return this.formCrudExchangeRate.get('fcompra')
  }
  get crudCventa(){
    return this.formCrudExchangeRate.get('cventa')
  }

  get crudCcompra(){
    return this.formCrudExchangeRate.get('ccompra')
  }
  get crudEventa(){
    return this.formCrudExchangeRate.get('eventa')
  }

  get crudEcompra(){
    return this.formCrudExchangeRate.get('ecompra')
  }
}

export class DataSourceExchangeRate extends DataSource<ExchangeRate>{

  data = new BehaviorSubject<ExchangeRate[]>([])

  connect(): Observable<ExchangeRate[]>{
    return this.data
  }

  disconnect() {

  }

  getInit(data: ExchangeRate[]){
    this.data.next(data)
  }

  getClean(clean: ExchangeRate){
    const aux =  this.data.getValue()
    const newData = aux.filter(data => !(data.registdate === clean.registdate && data.origen === clean.origen && data.destin === clean.destin))
    this.data.next(newData)
  }

}

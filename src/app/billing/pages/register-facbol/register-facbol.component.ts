import { Component, OnInit } from '@angular/core';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { DialogGetClienteComponent } from '../../modules/interlocutor-comercial/page/dialog-get-cliente/dialog-get-cliente.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BusinessPartnerService } from '../../services/interlocutor-comcercial.service';
import { IntcomCondicionPagoView, InterlocutorComercial } from '../../models/interlocutor-comercial.model';
import { DataSourceDocumentHeader } from '../../data/datasource-facbol.service';
import { ExchangeRateService } from '../../services/tipo-cambio.service';
import { DialogErrorAlertComponent } from '@shared-components/dialog-error-alert/dialog-error-alert.component';
import { MatSnackBarSuccessConfig, NoDataFoundMessageDialog } from '../../utils/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatsnackbarSuccessComponent } from '@shared-components/matsnackbar-success/matsnackbar-success.component';
import { GlobalStatusService } from '../../services/global-status.service';
import { FacbolGlobalStatusService } from '../../services/facbol-global-status.service';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { Currency, Reason, Seller, Serie } from 'src/app/auth/models/default-values.model';

@Component({
  selector: 'app-register-facbol',
  templateUrl: './register-facbol.component.html',
  styleUrls: ['./register-facbol.component.scss']
})
export class RegisterFacbolComponent implements OnInit {

  form!: FormGroup
  faMagnifyingGlass = faMagnifyingGlass
  faXmark = faXmark
  // DataSource
  dataSource = DataSourceDocumentHeader.getInstance()
  // SubStatus
  statusBuspar = false;

  // Obj
  tipoConPag: IntcomCondicionPagoView[] = [];
  series : Serie[]
  sellers : Seller[]
  currencies : Currency[]
  reasons: Reason[]

  private buildForm(typcomdoc: number | undefined, serie: string | undefined, reacomdoc: number | undefined) {
    this.form =  this.formBuilder.group({
      typcomdoc: [typcomdoc,[Validators.required]],
      sitcomdoc: [1,[Validators.required]],
      serie: [serie,[Validators.required]],
      numdoc: [0,[Validators.required]],
      registdate: [new Date(),[Validators.required]],
      codbranch: [1,[Validators.required]],
      codplaiss: [1,[Validators.required]],
      ingsalcom: [1,[Validators.required]],
      reacomdoc: [reacomdoc,[Validators.required]],
      codcur: ['PEN',[Validators.required]],
      exchangerate: [0,[Validators.required,Validators.pattern(/^\d{1,4}(\.\d{1,4})?$/)]],
      codbuspar: ['',[Validators.required]],
      busnam: ['',[Validators.required]],
      addres: ['',[Validators.required]],
      poscod: ['000000',[Validators.required]],
      codlistprice: [0,[Validators.required]],
      codsel: ['',[Validators.required]],
      typpaycon: [1,[Validators.required]],
      incigv: [1,[Validators.required]],
      tasigv: [18.00,[Validators.required]],
      refere: ['',[]],
      observ: ['',[]],
      commen: ['',[]],
    })
  }

  constructor(
    private dialog: Dialog,
    private formBuilder: FormBuilder,
    private businessPartnerService: BusinessPartnerService,
    private tipoCambioService: ExchangeRateService,
    private matSnackBar: MatSnackBar,
    private globalStatusService: GlobalStatusService,
    private facbolGlobalStatusService: FacbolGlobalStatusService,
    private defaultValuesService: DefaultValuesService
  ){
    this.series = this.defaultValuesService.getCookieValue('series').filter(data => data.typcomdoc === 1)
    this.sellers = this.defaultValuesService.getCookieValue('sellers')
    this.currencies = this.defaultValuesService.getCookieValue('currencies')
    this.reasons = this.defaultValuesService.getCookieValue('reasons').filter(data => data.typcomdoc === 1 && data.ingsalcom === 1)

    // Default Values
    const defaultSeries = this.series.find(data => data.defaul === 'Y');
    const defaultReason = this.reasons.find(data => data.defaul === 'Y');
    this.buildForm(1,defaultSeries?.serie,defaultReason?.reacomdoc)
  }

  ngOnInit(): void {
    this.series = this.defaultValuesService.getCookieValue('series').filter(data => data.typcomdoc === 1)
    this.sellers = this.defaultValuesService.getCookieValue('sellers')
    this.currencies = this.defaultValuesService.getCookieValue('currencies')
    this.reasons = this.defaultValuesService.getCookieValue('reasons').filter(data => data.typcomdoc === 1 && data.ingsalcom === 1)
    this.onTipCamChange()
    this.facbolGlobalStatusService.isStatusInvoiceSave$
    .subscribe({
      next:data =>{
        if(!data){
          this.form.markAllAsTouched()
          if(!this.form.valid) {
            this.facbolGlobalStatusService.setStatusInvoiceRegister(false);
          } else {
            this.facbolGlobalStatusService.setStatusInvoiceRegister(true);
          }
        }
      },
      error:error =>{
        console.log(error)
        this.form.markAllAsTouched()
      }
    })
  }

  isInputInvalid(fieldName: string): boolean{
    const field = this.form.get(fieldName)
    return field ? field.invalid && field.touched : true
  }

  openDialogGetCli(){

    // console.log('1',this.form.get('typcomdoc')?.value)
    // console.log('2',this.form.get('serie')?.value)
    // console.log('3',this.form.get('reacomdoc')?.value)
    if (!(this.form.get('typcomdoc')?.value &&
      this.form.get('serie')?.value &&
      this.form.get('reacomdoc')?.value)) {
      this.dialog.open(DialogErrorAlertComponent,{
        width: '400px',
        data: { status: -3, message: 'Tipo de Documento, Serie y Motivo son Obligatorio!' }
      })
      return
    }

    const dialogRef = this.dialog.open<InterlocutorComercial>(DialogGetClienteComponent, {
      data: { codbuspar: this.form.get('codbuspar')?.value,busnam: this.form.get('busnam')?.value  }
    });

    dialogRef.closed.subscribe(data => {
      if (data) {
        this.form.get('codbuspar')?.setValue(data.codbuspar)
        this.form.get('busnam')?.setValue(data.busnam)
        this.form.get('addres')?.setValue(data.addres)
        this.form.get('poscod')?.setValue(data.poscod)
        this.form.get('codlistprice')?.setValue(data.codlistprice)
        // Asignar las Condiciones Pago
        this.businessPartnerService.getByCodintcomCondicionPago(data.codbuspar)
        .subscribe(data => {
          this.tipoConPag = data.list
        })
        // Deshabilitar todos los inputs
        this.form.get('typcomdoc')?.disable()
        this.form.get('serie')?.disable()
        this.form.get('codmot')?.disable()
        this.form.get('codbuspar')?.disable()
        this.form.get('busnam')?.disable()
        this.form.get('addres')?.disable()
        this.statusBuspar = true
        if (this.form.get('addres')?.value === 0) {
          this.facbolGlobalStatusService.setStatusInvoiceRegister(false);
        } else {
          this.facbolGlobalStatusService.setStatusInvoiceRegister(true);
        }
      }
    })
    this.dataSource.getPush(this.form.value)
  }

  cleanBuspar(){
    this.form.get('codbuspar')?.setValue('')
    this.form.get('busnam')?.setValue('')
    this.form.get('addres')?.setValue('')
    // Habilitar todos los inputs
    this.form.get('typcomdoc')?.enable()
    this.form.get('serie')?.enable()
    this.form.get('codmot')?.enable()
    this.form.get('codbuspar')?.enable()
    this.form.get('busnam')?.enable()
    this.form.get('addres')?.enable()
    this.dataSource.getPush(this.form.value)
    this.statusBuspar = false
    this.facbolGlobalStatusService.setStatusInvoiceRegister(false);
  }

  changeTypcomdoc(event: any){
    const typcomdoc: number = parseInt(event.target.value)
    this.series = this.defaultValuesService.getCookieValue('series').filter(data => data.typcomdoc === typcomdoc)
    this.reasons = this.defaultValuesService.getCookieValue('reasons').filter(data => data.typcomdoc === typcomdoc && data.ingsalcom === 1)
    // this.series = this.defaultValuesService.series.filter(data => data.typcomdoc === typcomdoc)
    // this.reasons = this.defaultValuesService.reasons.filter(data => data.typcomdoc === typcomdoc && data.ingsalcom === 1)
  }

  onIncigvChange(event: any){
    const incigv = event.target.value
    if (incigv === 'N') {
      this.form.get('tasigv')?.setValue(0.00)
    } else {
      this.form.get('tasigv')?.setValue(18.00)
    }
    this.dataSource.updateData('incigv', incigv);
  }

  onCodcurChange(event: any){
    const codcur = event.target.value
    this.dataSource.updateData('codcur', codcur);
    this.onTipCamChange()
  }

  onFemisiChange(event: any){
    const registdate: Date = event.target.value
    // console.log(registdate)
    // this.dataSource.putFemisi(registdate)
    this.dataSource.updateData('registdate', registdate);
    this.onTipCamChange()
  }

  onTipCamChange(){
    this.globalStatusService.setLoading(true)
    this.tipoCambioService.getByLike(this.form.get('registdate')?.value,this.form.get('registdate')?.value,'PEN','USD')
    .subscribe({
      next:data =>{
        console.log(data)
        var newTipcam = 0
        if (data.status<=0) {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: { status:data.status, message:data.message }
          })
          this.facbolGlobalStatusService.setStatusInvoiceRegister(false);
        } else {
          if (data.list.length === 0 ) {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: { status:-1, message:'No existe tipo de cambio, para la registdate seleccionada' }
            })
            this.form.get('exchangerate')?.setValue(0)
            this.facbolGlobalStatusService.setStatusInvoiceRegister(false);
          } else {
            this.matSnackBar.openFromComponent(MatsnackbarSuccessComponent,MatSnackBarSuccessConfig)
            newTipcam = data.list[0].eventa
            this.form.get('exchangerate')?.enable()
            this.form.get('exchangerate')?.setValue(newTipcam)
            this.facbolGlobalStatusService.setStatusInvoiceRegister(true);
            this.form.get('exchangerate')?.disable()
          }
        }
      this.dataSource.updateData('exchangerate', newTipcam);
      this.globalStatusService.setLoading(false)
      },
      error:error =>{
        console.log(error)
        this.facbolGlobalStatusService.setStatusInvoiceRegister(false);
      }
    })
  }

}

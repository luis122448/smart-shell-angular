import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { DataSource } from '@angular/cdk/collections';
import { ExchangeRate } from '@billing-models/exchange-rate.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExchangeRateService } from '../../../../services/tipo-cambio.service';
import { faPenToSquare, faBroom, faTrashCan, faFilePen,faFileInvoice, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { DialogErrorAlertComponent } from '@shared-components/dialog-error-alert/dialog-error-alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoDataFoundMessageDialog, MatSnackBarSuccessConfig } from '../../../../utils/constants';
import { GlobalStatusService } from '../../../../services/global-status.service';
import { decimalExchangeRate } from '../../../../utils/validator';
import { MatsnackbarSuccessComponent } from '@shared-components/matsnackbar-success/matsnackbar-success.component';
import { MyDate } from '../../../../utils/date';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog-crud-tipo-cambio',
  templateUrl: './dialog-crud-tipo-cambio.component.html',
  styleUrls: ['./dialog-crud-tipo-cambio.component.scss']
})
export class DialogCrudExchangeRateComponent {

  faPenToSquare = faPenToSquare
  faBroom = faBroom
  faTrashCan = faTrashCan
  faFilePen = faFilePen
  faFileInvoice = faFileInvoice
  faCircleInfo = faCircleInfo
  labelTab = ['Tipo de Cambio - Historial','Registrar Tipo de Cambio','Ayuda']
  selectedTab = new FormControl(0)

  constructor(
    private datePipe: DatePipe,
    private dialogRef: DialogRef,
  ){ }

  onCrud(data: boolean){
    if (data) {
      this.selectedTab.setValue(1)
    } else {
      this.selectedTab.setValue(0)
    }
  }

  onClose(data: boolean){
    if (data) {
      this.dialogRef.close(data)
    }
  }

  closeDialog(){
    this.dialogRef.close()
  }

}

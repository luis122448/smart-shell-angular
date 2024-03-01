import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { faPenToSquare, faBroom, faTrashCan, faFilePen,faFileInvoice, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

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

import { Component, Inject, OnInit } from '@angular/core';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { BusinessPartnerService } from '../../../../services/interlocutor-comcercial.service';
import { InterlocutorComercial } from '../../../../models/interlocutor-comercial.model';
import { faFileInvoice,faCreditCard,faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';

export interface DialogData {
  codbuspar: string
  busnam: string
}

@Component({
  selector: 'app-dialog-crud-cliente',
  templateUrl: './dialog-crud-cliente.component.html',
  styleUrls: ['./dialog-crud-cliente.component.scss']
})
export class DialogCrudClienteComponent implements OnInit{

  faFileInvoice = faFileInvoice
  faCreditCard = faCreditCard
  faAddressBook = faAddressBook
  cliente: InterlocutorComercial | null = null
  selectedTab = new FormControl()
  constructor(
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private businessPartnerService: BusinessPartnerService,
    @Inject(DIALOG_DATA) private data: DialogData
  ){ }
  ngOnInit(): void {
    // this.businessPartnerService.getById(this.data.codbuspar)
    // .subscribe(data => {
    //   this.cliente = data.object
    // })
  }

  closeDialog(){
    this.dialogRef.close()
  }

}

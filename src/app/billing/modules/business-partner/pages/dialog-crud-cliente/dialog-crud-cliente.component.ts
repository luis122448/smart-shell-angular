import { Component, Inject, OnInit } from '@angular/core';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { BusinessPartner } from '@billing-models/business-partner.model';
import {
  faFileInvoice,
  faCreditCard,
  faAddressBook,
} from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';

interface DialogData {
  codbuspar: string;
  busnam: string;
  isNewBussinessPartner: boolean;
}

@Component({
  selector: 'app-dialog-crud-cliente',
  templateUrl: './dialog-crud-cliente.component.html',
  styleUrls: ['./dialog-crud-cliente.component.scss'],
})
export class DialogCrudClienteComponent implements OnInit {
  faFileInvoice = faFileInvoice;
  faCreditCard = faCreditCard;
  faAddressBook = faAddressBook;
  cliente: BusinessPartner | null = null;
  selectedTab = new FormControl();
  isNewBussinessPartner = false;
  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) private data: DialogData
  ) {
    this.isNewBussinessPartner = this.data.isNewBussinessPartner;
  }
  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }
}

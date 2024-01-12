import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef, DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { BusinessPartnerService } from '../../../../services/interlocutor-comcercial.service';
import { InterlocutorComercial } from '../../../../models/interlocutor-comercial.model';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { GlobalStatusService } from '../../../../services/global-status.service';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoDataFoundMessageDialog } from '@billing-utils/constants';
import { MatsnackbarMessageComponent } from '@shared/components/matsnackbar-message/matsnackbar-message.component';

export interface DialogData {
  codbuspar: string
  busnam: string
}

@Component({
  selector: 'app-dialog-get-cliente',
  templateUrl: './dialog-get-cliente.component.html',
  styleUrls: ['./dialog-get-cliente.component.scss']
})
export class DialogGetClienteComponent implements OnInit{

  faMagnifyingGlass = faMagnifyingGlass
  dataSource = new DataSourceInterlocutorComercial();
  displayedColumns: string[] = ['codbuspar', 'busnam','nroidedoc'];
  input =  new FormControl('',{ nonNullable: true })
  countRecords = 0;

  constructor(
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private matSnackBar: MatSnackBar,
    private businessPartnerService: BusinessPartnerService,
    private globalStatusService: GlobalStatusService,
    @Inject(DIALOG_DATA) private data: DialogData
  ){}
  ngOnInit(): void {
    if (this.data.busnam && this.data.codbuspar){
      this.dialog.open(DialogErrorAlertComponent,{
        width: '400px',
        data: { only_one_criterion:'S' }
      })
      this.dialogRef.close(null)
    }
    else if (this.data.codbuspar || this.data.busnam){
      if ((this.data.codbuspar && this.data.codbuspar.length < 3) || (this.data.busnam && this.data.busnam.length < 3)){
        this.dialog.open(DialogErrorAlertComponent,{
          width: '400px',
          data: { minimum_length:3 }
        })
        this.dialogRef.close(null)
      } else {
        this.globalStatusService.setLoading(true)
        this.businessPartnerService.getByLike(this.data.codbuspar,this.data.busnam)
        .subscribe({
          next: data =>{
            if (data.status <= 0 || data.list.length === 0){
              this.dialog.open(DialogErrorAlertComponent,{
                width: '400px',
                data: { no_data_found:'S' }
              })
              this.dialogRef.close(null)
            }
            if (data.status > 0 && data.list.length === 1 ){
              this.dialogRef.close(data.list[0])
            }
            this.dataSource.getInit(data.list)
            this.globalStatusService.setLoading(false)
            this.countRecords = this.dataSource.getCount()
          },
          error: error =>{
            this.dialog.open(DialogErrorAlertComponent,{
              width: '400px',
              data: error.error
            })
            this.globalStatusService.setLoading(false)
            this.dialogRef.close(null)
          }
        })
      }
    }
    this.input.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(data =>{
        this.dataSource.getFind(data);
    })
  }

  closeDialog(row: InterlocutorComercial | null){
    this.dialogRef.close(row)
  }

}

export class DataSourceInterlocutorComercial extends DataSource<InterlocutorComercial>{

  data = new BehaviorSubject<InterlocutorComercial[]>([])
  originalData = new BehaviorSubject<InterlocutorComercial[]>([])

  connect(): Observable<InterlocutorComercial[]>{
    return this.data
  }

  disconnect() {

  }

  getInit(data: InterlocutorComercial[]){
    this.data.next(data);
    this.originalData.next(data);
  }

  getFind(query: string){
    const data = this.originalData.getValue()
    const newData = data.filter(data =>{
      const word = `${data.codbuspar}${data.busnam}`
      return word.toLowerCase().includes(query.toLowerCase())
    })
    this.data.next(newData)
  }

  getCount(){
    const data = this.data.getValue()
    return data.reduce((count, data) => count = count + 1, 0)
  }

}

import { DataSource } from '@angular/cdk/collections';
import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeSerieCommercialDocument, SerieCommercialDocument } from '@billing-models/serie-commercial-document.model';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { SerieCommercialDocumentService } from '@billing-services/serie-commercial-document.service';
import { MatSnackBarSuccessConfig } from '@billing-utils/constants';
import { DialogDeleteQuestionComponent } from '@shared/components/dialog-delete-question/dialog-delete-question.component';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { MatsnackbarSuccessComponent } from '@shared/components/matsnackbar-success/matsnackbar-success.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { Document } from 'src/app/auth/models/default-values.model';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';

@Component({
  selector: 'app-serie-commercial-document',
  templateUrl: './serie-commercial-document.component.html',
  styleUrls: ['./serie-commercial-document.component.scss']
})
export class SerieCommercialDocumentComponent implements OnInit{

  @Output() changeView = new EventEmitter<ChangeSerieCommercialDocument>()

  dataSourceSerieCommercialDocument = new DataSourceSerieCommercialDocument()
  displayedColumns: string[] = ['serie','descri','codext','operac']
  formSearchSerieCommercialDocument!: FormGroup
  listCommercialDocument: Document[] = []

  private buildForm(typcomdoc: number = 0){
    this.formSearchSerieCommercialDocument = this.formBuilder.group({
      typcomdoc: [{value:typcomdoc,disabled: false}]
    })
  }

  constructor(
    private serieCommercialDocumentService: SerieCommercialDocumentService,
    private defaultValuesService: DefaultValuesService,
    private globalStatusService: GlobalStatusService,
    private formBuilder: FormBuilder,
    private dialog: Dialog,
    private matSnackBar: MatSnackBar
  ){
    this.buildForm(1)
    this.listCommercialDocument = this.defaultValuesService.getLocalStorageValue('documents')
  }

  ngOnInit(): void {
    this.searchSerieCommercialDocument()
  }

  isInputInvalid(fieldName: string): boolean{
    const field = this.formSearchSerieCommercialDocument.get(fieldName)
    return field ? field.invalid && field.touched : true
  }

  searchSerieCommercialDocument(){
    this.globalStatusService.setLoading(true)
    this.serieCommercialDocumentService.getByTypcomdoc(this.typcomdoc?.value)
    .subscribe({
      next:data =>{
        this.dataSourceSerieCommercialDocument.getInit(data.list)
        if (data.status<=0) {
          this.dialog.open(DialogErrorAlertComponent,{
            width: '400px',
            data: data
          })
        }
        this.globalStatusService.setLoading(false)
      },
    error: err =>{
      this.dataSourceSerieCommercialDocument.getReset()
      this.dialog.open(DialogErrorAlertComponent,{
        width: '400px',
        data: err.error
      })
      this.globalStatusService.setLoading(false)
    }
    })
  }

  selectionChangeSerieCommercialDocument(){
    this.searchSerieCommercialDocument()
  }

  crudSerieCommercialDocument(row: SerieCommercialDocument | null){
    this.changeView.emit({
      view: 'crud',
      typcomdoc: this.typcomdoc?.value,
      serie: row?.serie || ''
    })
  }

  deleteSerieCommercialDocument(row: SerieCommercialDocument){
    const dialogRef = this.dialog.open<boolean>(DialogDeleteQuestionComponent,{
      width: '400px',
      data: { status: 0, message: `Are you sure to delete serie commercial document ${row.serie} - ${row.descri} ? This action is not reversible!` }
    })
    dialogRef.closed.subscribe({
      next:data =>{
        if (data) {
          this.serieCommercialDocumentService.delDelete(row.typcomdoc,row.serie)
          .subscribe({
            next:data =>{
              if (data.status<=0) {
                this.dialog.open(DialogErrorAlertComponent,{
                  width: '400px',
                  data: data
                })
              }
              if (data.status>=0){
                this.matSnackBar.openFromComponent(MatsnackbarSuccessComponent,MatSnackBarSuccessConfig)
                this.dataSourceSerieCommercialDocument.getClean(row.typcomdoc,row.serie)
              }
            },
            error:err =>{
              this.dialog.open(DialogErrorAlertComponent,{
                width: '400px',
                data: err.error
              })
            }
          })
        }
      }
    })
  }

  get typcomdoc(){
    return this.formSearchSerieCommercialDocument.get('typcomdoc')
  }

}

export class DataSourceSerieCommercialDocument extends DataSource<SerieCommercialDocument>{

  data = new BehaviorSubject<SerieCommercialDocument[]>([])

  connect(): Observable<SerieCommercialDocument[]>{
    return this.data
  }

  disconnect () {

  }

  getInit(data: SerieCommercialDocument[]){
    this.data.next(data)
  }

  getClean(typcomdoc: number, serie: string){
    const aux = this.data.getValue()
    const cleanData = aux.filter(data => !(data.typcomdoc == typcomdoc && data.serie == serie))
    this.data.next(cleanData)
  }

  getReset(){
    this.data.next([])
  }

}

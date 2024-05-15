import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DocumentDetail } from '@billing-models/document-detail.model';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { DialogGetArticleComponent } from '../dialog-get-article/dialog-get-article.component';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormArray,
  FormControl,
} from '@angular/forms';
import {
  faMagnifyingGlass,
  faXmark,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '@billing-models/article.model';
import {
  DataSourceDocumentDetail,
  DataSourceDocumentHeader,
} from '../../data/datasource-facbol.service';
import { FacbolGlobalStatusService } from '../../services/facbol-global-status.service';
import { BehaviorSubject } from 'rxjs';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { DocumentInvoice } from '@billing-models/document-invoice.model';
import { GlobalStatusService } from '@billing-services/global-status.service';

@Component({
  selector: 'app-detail-items-facbol',
  templateUrl: './detail-items-facbol.component.html',
  styleUrls: ['./detail-items-facbol.component.scss'],
})
export class DetailItemsFacbolComponent{
  @Input() isNewDocument = false;
  @Input() isEditDocumentValue : DocumentInvoice | undefined = undefined
  @Input() isCalculateDocument = false;
  formDetailDocument!: FormGroup;
  dataHeaderSource = DataSourceDocumentHeader.getInstance();
  dataDetailSource = DataSourceDocumentDetail.getInstance();
  dataDetail = new BehaviorSubject<FormGroup[]>([]);

  displayedColumns: string[] = ['numite', 'typinv','codart','quantity','price','subtotal','operac'];
  faMagnifyingGlass = faMagnifyingGlass;
  faPenToSquare = faPenToSquare;
  faXmark = faXmark;

  // Var
  codlistprice: number = 0;

  private buildForm() {
    // Clear Form
    this.dataDetail = new BehaviorSubject<FormGroup[]>([]);
    this.dataDetailSource.delReset();
    // Init Form
    this.formDetailDocument = this.formBuilder.group({
      detailDocument: this.formBuilder.array([]),
    });
    const detailForm : FormGroup = this.formBuilder.group({
      numite: [{ value: 0, disabled: false }, [Validators.required]],
      typinv: [{ value: '', disabled: false }, [Validators.required]],
      codart: [{ value: '', disabled: false }, [Validators.required]],
      etiqueta: [{ value: '', disabled: true }, []],
      quantity: [{ value: 0, disabled: true }, [Validators.required]],
      price: [{ value: 0.00.toFixed(2), disabled: true }, [Validators.required]],
    });
    this.detailDocument.push(detailForm);
    this.dataDetail.next([detailForm]);
  }

  constructor(
    private dialog: Dialog,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private globalStatusService: GlobalStatusService,
    private facbolGlobalStatusService: FacbolGlobalStatusService,
  ) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes1', changes);
    if (changes['isNewDocument'] && changes['isNewDocument'].currentValue === true) {
      this.buildForm();
    }
    if (changes['isEditDocumentValue'] && changes['isEditDocumentValue'].currentValue !== undefined) {
      this.buildForm();
      const dataDetailDocument = changes['isEditDocumentValue'].currentValue.details;
      for (let i = 0; i < dataDetailDocument.length; i++) {
        this.addItem(dataDetailDocument[i]);
      }
    }
    if(changes['isCalculateDocument'] && changes['isCalculateDocument'].currentValue === true){
      if(this.detailDocument.controls.length <= 1){
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: {
            status: -3,
            message : `Document not have items` }
        });
        this.facbolGlobalStatusService.setStatusInvoiceRegisterDetail(false);
        this.globalStatusService.setLoading(false);
        return;
      }
      this.detailDocument.controls.forEach((row) => {
        if(row.invalid && row.value.numite > 0){
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: {
              status: -3,
              message : `Article ${row.value.codart} not Quuantity or Price` }
          });
          this.facbolGlobalStatusService.setStatusInvoiceRegisterDetail(false);
          this.globalStatusService.setLoading(false);
          return;
        }
      });
      this.facbolGlobalStatusService.setStatusInvoiceRegisterDetail(true);
    }
  }

  isInputInvalid(fieldName: string): boolean {
    const field = this.detailDocument.get(fieldName);
    return field ? field.invalid && field.touched : true;
  }

  addItem(row: DocumentDetail) {
    const detailForm = this.formBuilder.group({
      numite: [{ value: row.numite, disabled: false }, [Validators.required]],
      typinv: [{ value: row.typinv, disabled: false }, [Validators.required]],
      codart: [{ value: row.codart, disabled: false }, [Validators.required]],
      etiqueta: [
        { value: row.etiqueta, disabled: false },
        [Validators.required],
      ],
      quantity: [
        { value: row.quantity, disabled: false },
        [Validators.required, Validators.min(1)],
      ],
      price: [{ value: row.price.toFixed(2), disabled: ( row.modprice === 'Y' ? false : true ) }, [Validators.required, Validators.min(0.01)]]
    });
    this.detailDocument.push(detailForm);
    this.dataDetail.next(this.detailDocument.controls as FormGroup[]);
    this.dataDetailSource.getPush({
      numite: row.numite,
      typinv: row.typinv,
      desinv: row.desinv,
      codart: row.codart,
      desart: row.desart,
      etiqueta: row.etiqueta,
      quantity: row.quantity,
      stock: row.stock,
      price: row.price
    });
    this.preCalculate(row, row.price);
    this.changeDetectorRef.detectChanges();
  }

  deleteItem(row: DocumentDetail) {
    this.detailDocument.removeAt(row.numite);
    this.dataDetail.next(this.detailDocument.controls as FormGroup[]);
    this.dataDetailSource.getDelete(row.numite);
  }

  openDialogGetArticle(item: DocumentDetail) {
    // Validate length of codart or desart
    if (item.codart.length < 3) {
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: { minimum_length:3 }
      })
      return;
    }
    const dataHeader = this.dataHeaderSource.get();
    this.codlistprice = dataHeader.codlistprice ?? 1;
    const dialogRefArticle = this.dialog.open<Article>(
      DialogGetArticleComponent,
      {
        data: {
          name: this.detailDocument.value[0]?.codart ?? '%',
          codlistprice: this.codlistprice,
        },
      }
    );
    item.codart = '';
    dialogRefArticle.closed.subscribe((data) => {
      if (data) {
        const nextNumite: number = this.dataDetailSource.getLastNumite() + 1;
        this.addItem({
          numite: nextNumite,
          typinv: data.typinv,
          desinv: data.desinv,
          codart: data.codart,
          desart: data.descri,
          etiqueta: 0,
          quantity: 1,
          stock: data.stock ?? 0,
          price: parseFloat(data.price?.toFixed(2) ?? '0.00'),
          moddesc: data.moddesc ?? 'N',
          modprice: data.modprice ?? 'N'
        });
      }
    });
  }

  openDialogGetEtiqueta() {}

  preCalculate(row: DocumentDetail, price: number) {
    const updateRow: DocumentDetail = {
      numite: row.numite,
      typinv: row.typinv,
      codart: row.codart,
      etiqueta: row.etiqueta,
      quantity: row.quantity,
      price: row.price || price,
    };
    this.dataDetailSource.putPreCalculate(updateRow.numite, updateRow);
    this.dataDetailSource.getCalculateImport(updateRow.numite);
  }

  get detailDocument(): FormArray {
    return this.formDetailDocument.controls['detailDocument'] as FormArray;
  }

}

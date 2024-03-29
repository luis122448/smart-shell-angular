import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-detail-items-facbol',
  templateUrl: './detail-items-facbol.component.html',
  styleUrls: ['./detail-items-facbol.component.scss'],
})
export class DetailItemsFacbolComponent implements OnInit {
  @Input() isNewDocument = false;
  @Input() isEditDocumentValue : DocumentInvoice | undefined = undefined
  formDetailDocument!: FormGroup;
  dataHeaderSource = DataSourceDocumentHeader.getInstance();
  dataDetailSource = DataSourceDocumentDetail.getInstance();
  dataDetail = new BehaviorSubject<FormGroup[]>([]);

  displayedColumns: string[] = ['numite', 'typinv','codart','quantity','price','subtotal','operac'];
  faMagnifyingGlass = faMagnifyingGlass;
  faPenToSquare = faPenToSquare;
  faXmark = faXmark;
  // SubStatus
  isStatusInvoiceRegister = false;

  // Var
  codlistprice: number = 0;

  private buildForm() {
    // Clear Form
    this.dataDetail = new BehaviorSubject<FormGroup[]>([]);
    this.dataDetailSource.delReset();
    // Init Form
    this.formDetailDocument = this.formBuilder.group({
      numite: [{ value: 0, disabled: false }, [Validators.required]],
      typinv: [{ value: '', disabled: false }, [Validators.required]],
      codart: ['', [Validators.required]],
      etiqueta: [{ value: '', disabled: false }, [Validators.required]],
      quantity: [{ value: 0, disabled: false }, [Validators.required]],
      price: [{ value: 0.00.toFixed(2), disabled: false }, [Validators.required]],
      detailDocument: this.formBuilder.array([]),
    });
    const detailForm : FormGroup = this.formBuilder.group({
      numite: [{ value: 0, disabled: false }, [Validators.required]],
      typinv: [{ value: '', disabled: false }, [Validators.required]],
      codart: [{ value: '', disabled: false }, [Validators.required]],
      etiqueta: [{ value: '', disabled: true }, [Validators.required]],
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
    private facbolGlobalStatusService: FacbolGlobalStatusService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.facbolGlobalStatusService.isStatusInvoiceRegister$.subscribe({
      next: (data) => {
        this.isStatusInvoiceRegister = data;
      },
      error: (error) => {
        this.isStatusInvoiceRegister = false;
      },
    });
  }

  ngOnChanges() {
    if (this.isNewDocument) {
      this.buildForm();
    }
    if (this.isEditDocumentValue) {
      this.buildForm();
      const dataDetailDocument = this.isEditDocumentValue.details;
      for (let i = 0; i < dataDetailDocument.length; i++) {
        this.addItem(dataDetailDocument[i]);
      }
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
        [Validators.required],
      ],
      price: [{ value: row.price, disabled: ( row.modprice === 'Y' ? true : false ) }, [Validators.required]]
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
          codart: this.detailDocument.value[0]?.codart ?? '0',
          desart: this.detailDocument.value[0]?.desart ?? '0',
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
          price: data.price ?? 0.0,
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

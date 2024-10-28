import { Component } from '@angular/core';
import { SituationCommercialDocument } from "@billing-models/situacion-commercial-document";
import { ReasonCommercialDocument } from "@billing-models/reason-commercial-document";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Currency, Serie } from "@auth/models/default-values.model";
import { GlobalStatusService } from "@billing-services/global-status.service";
import { DefaultValuesService } from "@auth/services/default-values.service";
import { Dialog } from "@angular/cdk/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DialogErrorAlertComponent } from "@shared/components/dialog-error-alert/dialog-error-alert.component";
import { SearchDocumentGeneric, SearchFilterDocumentGeneric } from "@billing-models/document-invoice.model";
import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { DOCUMENT_INVENTORY_TAKING } from "@billing-utils/constants";
import { DocumentInventoryTakingService } from "@billing-services/document-inventory-taking.service";

@Component({
  selector: 'app-search-inventory-taking',
  templateUrl: './search-inventory-taking.component.html',
  styleUrls: ['./search-inventory-taking.component.scss']
})
export class SearchInventoryTakingComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  situations: SituationCommercialDocument[] = [];
  reasons: ReasonCommercialDocument[] = [];

  formSearchDocument!: FormGroup;

  private buildForm() {
    const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
      .toJSON()
      .split('T')[0];
    const beforeSevenDays = new Date(
      new Date().getTime() - 7 * 24 * 60 * 60 * 1000
    )
      .toJSON()
      .split('T')[0];
    this.formSearchDocument = this.formBuilder.group({
      typcomdoc: [DOCUMENT_INVENTORY_TAKING, [Validators.required]],
      startat: [beforeSevenDays, [Validators.required]],
      finalat: [yesterday, [Validators.required]],
      sitcomdoc: this.formBuilder.array([0]),
      reacomdoc: this.formBuilder.array([0]),
      codbranch: ['-1', []],
      codplaiss: ['-1', []],
      serie: ['-1', []],
      codcur: ['-1', []]
    });
  }
  dataSourceSearchDocument = DataSourceSearchDocumentInventoryTaking.getInstance();
  // Default Values
  series: Serie[];
  currencies: Currency[];

  constructor(
    private formBuilder: FormBuilder,
    private documentInventoryTakingService: DocumentInventoryTakingService,
    private globalStatusService: GlobalStatusService,
    private defaultValuesService: DefaultValuesService,
    private dialog: Dialog,
    private matSnackBar: MatSnackBar
  ) {
    this.buildForm();
    this.currencies =
      this.defaultValuesService.getLocalStorageValue('currencies');
    this.series = this.defaultValuesService
      .getLocalStorageValue('series')
      .filter((data) => data.typcomdoc === DOCUMENT_INVENTORY_TAKING);
    this.reasons = this.defaultValuesService
      .getLocalStorageValue('reasons')
      .filter((data) => data.typcomdoc === DOCUMENT_INVENTORY_TAKING);
    this.situations = this.defaultValuesService
      .getLocalStorageValue('situations')
      .filter((data) => data.typcomdoc === DOCUMENT_INVENTORY_TAKING);
    this.situations.forEach((data) => {
      this.sitcomdoc.push(this.formBuilder.control(data.sitcomdoc));
    });
    this.reasons.forEach((data) => {
      this.reacomdoc.push(this.formBuilder.control(data.reacomdoc));
    });
    this.codbranch?.setValue(this.globalStatusService.isBranch());
    this.codplaiss?.setValue(this.globalStatusService.isPlaceOfIssue());
  }

  changeTypcomdoc(event: any) {
    const typcomdoc: number = parseInt(event.target.value);
    this.series = this.defaultValuesService
      .getLocalStorageValue('series')
      .filter((data) => data.typcomdoc === typcomdoc);
    this.reasons = this.defaultValuesService
      .getLocalStorageValue('reasons')
      .filter((data) => data.typcomdoc === typcomdoc);
    this.situations = this.defaultValuesService
      .getLocalStorageValue('situations')
      .filter((data) => data.typcomdoc === typcomdoc);
  }

  toggleSelectionSituation(option: string) {
    const index = this.sitcomdoc.value.indexOf(option);
    if (index === -1) {
      this.sitcomdoc.push(this.formBuilder.control(option));
    } else {
      this.sitcomdoc.removeAt(index);
    }
  }

  toggleSelectAllSituation(event: any) {
    const isChecked = event?.target?.checked;
    if (isChecked) {
      this.situations.forEach((data) => {
        this.sitcomdoc.push(this.formBuilder.control(data.sitcomdoc));
      });
    } else {
      this.sitcomdoc.clear();
    }
  }

  toggleSelectionReason(option: string) {
    const index = this.reacomdoc.value.indexOf(option);
    if (index === -1) {
      this.reacomdoc.push(this.formBuilder.control(option));
    } else {
      this.reacomdoc.removeAt(index);
    }
  }

  toggleSelectAllReason(event: any) {
    const isChecked = event?.target?.checked;
    if (isChecked) {
      this.reasons.forEach((data) => {
        this.reacomdoc.push(this.formBuilder.control(data.reacomdoc));
      });
    } else {
      this.reacomdoc.clear();
    }
  }

  isInputInvalid(fieldName: string): boolean {
    const field = this.formSearchDocument.get(fieldName);
    return field ? field.invalid && field.touched : true;
  }

  searchDocument() {
    if (this.formSearchDocument.invalid) {
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: { no_required_fields: 'Y' },
      });
      this.formSearchDocument.markAllAsTouched();
      return;
    }
    this.globalStatusService.setLoading(true);
    const SearchFilterDocumentGeneric: SearchFilterDocumentGeneric = {
      typcomdoc: this.typcomdoc?.value,
      startat: this.startat?.value,
      finalat: this.finalat?.value,
      sitcomdoc: this.sitcomdoc.value.join(','),
      reacomdoc: this.reacomdoc.value.join(','),
      codbranch: this.codbranch?.value,
      codplaiss: this.codplaiss?.value,
      serie: this.serie?.value,
      codcur: this.codcur?.value
    };
    this.documentInventoryTakingService
      .getPageDocument(SearchFilterDocumentGeneric,100,0)
      .subscribe({
        next: (data) => {
          if (data.status <= 0) {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: data,
            });
          }
          this.dataSourceSearchDocument.getInit(data.list);
        },
      });
  }

  get typcomdoc() {
    return this.formSearchDocument.get('typcomdoc');
  }
  get startat() {
    return this.formSearchDocument.get('startat');
  }
  get finalat() {
    return this.formSearchDocument.get('finalat');
  }
  get sitcomdoc(): FormArray {
    return this.formSearchDocument.get('sitcomdoc') as FormArray;
  }
  get reacomdoc(): FormArray {
    return this.formSearchDocument.get('reacomdoc') as FormArray;
  }
  get codbranch() {
    return this.formSearchDocument.get('codbranch');
  }
  get codplaiss() {
    return this.formSearchDocument.get('codplaiss');
  }
  get serie() {
    return this.formSearchDocument.get('serie');
  }
  get codcur() {
    return this.formSearchDocument.get('codcur');
  }
}

export class DataSourceSearchDocumentInventoryTaking extends DataSource<SearchDocumentGeneric> {
  private static instance: DataSourceSearchDocumentInventoryTaking;
  private data = new BehaviorSubject<SearchDocumentGeneric[]>([]);

  private constructor() {
    super();
  }

  public static getInstance(): DataSourceSearchDocumentInventoryTaking {
    if (!DataSourceSearchDocumentInventoryTaking.instance) {
      DataSourceSearchDocumentInventoryTaking.instance =
        new DataSourceSearchDocumentInventoryTaking();
    }
    return DataSourceSearchDocumentInventoryTaking.instance;
  }

  connect(): Observable<SearchDocumentGeneric[]> {
    return this.data;
  }

  disconnect() {}

  getInit(data: SearchDocumentGeneric[]) {
    this.data.next(data);
  }

  onChangeOpen(numint: number, isOpen: boolean) {
    const aux = this.data.getValue();
    const index = aux.findIndex((data) => data.numint === numint);
    aux[index].isOpen = isOpen;
    this.data.next(aux);
  }

  onChangeSituacion(numint: number, sitcomdoc: number, dessitcomdoc: string) {
    const aux = this.data.getValue();
    const index = aux.findIndex((data) => data.numint === numint);
    aux[index].sitcomdoc = sitcomdoc;
    aux[index].dessitcomdoc = dessitcomdoc;
    this.data.next(aux);
  }

  get() {
    return this.data.getValue();
  }

  getCount() {
    const aux = this.data.getValue();
    return aux.reduce((count, data) => count + 1, 0);
  }
}

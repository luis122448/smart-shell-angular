import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
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

export interface DialogData {
  codbuspar: string;
  busnam: string;
  isCode: boolean;
}

@Component({
  selector: 'app-dialog-get-cliente',
  templateUrl: './dialog-get-cliente.component.html',
  styleUrls: ['./dialog-get-cliente.component.scss'],
})
export class DialogGetClienteComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  dataSource = new DataSourceInterlocutorComercial();
  displayedColumns: string[] = ['codbuspar', 'busnam', 'nroidedoc'];
  input = new FormControl('', { nonNullable: true });
  countRecords = 0;
  selectedRowIndex: number | null = 0;
  scrollingUp = false;
  isKeyboardNavigation = false;

  constructor(
    private dialog: Dialog,
    private dialogRef: DialogRef,
    private matSnackBar: MatSnackBar,
    private businessPartnerService: BusinessPartnerService,
    private globalStatusService: GlobalStatusService,
    @Inject(DIALOG_DATA) private data: DialogData
  ) {}

  ngOnInit(): void {
    this.globalStatusService.setLoading(true);
    this.businessPartnerService
      .getByLike(this.data.codbuspar, this.data.busnam)
      .subscribe({
        next: (data) => {
          if (data.status <= 0){
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: data,
            });
            this.dialogRef.close(null);
          }
          if (data.status > 0 && data.list.length === 1) {
            this.dialogRef.close(data.list[0]);
          }
          this.dataSource.getInit(data.list);
          this.countRecords = this.dataSource.getCount();
        },
        error: (err) => {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: err.error,
          });
          this.dialogRef.close(null);
        },
        complete: () => {
          this.globalStatusService.setLoading(false);
        }
      });
    this.input.valueChanges.pipe(debounceTime(300)).subscribe((data) => {
      this.dataSource.getFind(data);
    });
  }

  @ViewChild('mainTable') mainTable!: ElementRef;
  ngAfterViewInit() {
    this.mainTable.nativeElement.focus();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (this.scrollingUp) {
      this.onArrowUp();
    } else {
      this.onArrowDown();
    }
  }

  onMouseOver(index: number) {
    if (!this.isKeyboardNavigation) {
      this.selectedRowIndex = index;
    }
  }

  onMouseOut() {
  }

  onArrowUp() {
    this.isKeyboardNavigation = true;
    this.scrollingUp = true;
    this.navigateRows(-1);

    setTimeout(() => {
      this.isKeyboardNavigation = false;
    }, 1000); // Retraso de 1 segundo
  }

  onArrowDown() {
    this.isKeyboardNavigation = true;
    this.scrollingUp = false;
    this.navigateRows(1);

    setTimeout(() => {
      this.isKeyboardNavigation = false;
    }, 1000); // Retraso de 1 segundo
  }

  private navigateRows(direction: number) {
    if (this.mainTable) {
      const rows = this.mainTable.nativeElement.querySelectorAll('.row-table');
      const currentRow = this.selectedRowIndex ?? 0;
      const targetRow = Math.max(0, Math.min(rows.length - 1, currentRow + direction));

      // Scroll to the selected row
      const rowElement = rows[targetRow] as HTMLElement;
      rowElement.scrollIntoView({ behavior: 'auto', block: 'center' });

      // Update selectedRowIndex
      this.selectedRowIndex = targetRow;
    }
  }

  closeDialog(row: InterlocutorComercial | null) {
    this.dialogRef.close(row);
  }

}

export class DataSourceInterlocutorComercial extends DataSource<InterlocutorComercial> {
  data = new BehaviorSubject<InterlocutorComercial[]>([]);
  originalData = new BehaviorSubject<InterlocutorComercial[]>([]);

  connect(): Observable<InterlocutorComercial[]> {
    return this.data;
  }

  disconnect() {}

  getInit(data: InterlocutorComercial[]) {
    this.data.next(data);
    this.originalData.next(data);
  }

  getFind(query: string) {
    const data = this.originalData.getValue();
    const newData = data.filter((data) => {
      const word = `${data.codbuspar}${data.busnam}`;
      return word.toLowerCase().includes(query.toLowerCase());
    });
    this.data.next(newData);
  }

  getCount() {
    const data = this.data.getValue();
    return data.reduce((count, data) => (count = count + 1), 0);
  }
}

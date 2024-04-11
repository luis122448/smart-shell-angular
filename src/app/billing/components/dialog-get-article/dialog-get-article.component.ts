import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DialogRef, DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { Article } from '../../models/article.model';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ArticleService } from '../../services/article.service';
import { GlobalStatusService } from '../../services/global-status.service';
import { ListPriceArticleService } from '@billing-services/list-price-article.service';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { Data } from '@angular/router';

export interface DialogData {
  name: string;
  codlistprice: number;
}

@Component({
  selector: 'app-dialog-get-article',
  templateUrl: './dialog-get-article.component.html',
  styleUrls: ['./dialog-get-article.component.scss'],
})
export class DialogGetArticleComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  dataSource = new DataSourceArticle();
  displayedColumns: string[] = ['codart', 'descri', 'codext'];
  input = new FormControl('', { nonNullable: true });
  countRecords = 0;
  selectedRowIndex: number | null = 0;
  scrollingUp = false;
  isKeyboardNavigation = false;

  constructor(
    private dialogRef: DialogRef,
    private dialog: Dialog,
    private articleService: ArticleService,
    private listPriceArticleService: ListPriceArticleService,
    private globalStatusService: GlobalStatusService,
    @Inject(DIALOG_DATA) private data: DialogData
  ) {}

  ngOnInit(): void {
    this.loadArticle(this.data.name);
    this.input.valueChanges.pipe(debounceTime(300)).subscribe((data) => {
      this.dataSource.getFind(data);
    });
  }

  loadArticle(name: string) {
    this.globalStatusService.setLoading(true);
    this.articleService.getByName(name).subscribe({
      next: (data) => {
        this.dataSource.getInit(data.list);
        this.countRecords = this.dataSource.getCount();
        if (data.list.length == 1) {
          this.closeDialog(data.list[0]);
        }
      },
      error: (err) => {
        this.dialog.open(DialogErrorAlertComponent, {
          width: '400px',
          data: err.error,
        });
        this.globalStatusService.setLoading(false);
        this.closeDialog(null);
      },
      complete: () => this.globalStatusService.setLoading(false),
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

  onMouseOut() {}

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
      const targetRow = Math.max(
        0,
        Math.min(rows.length - 1, currentRow + direction)
      );

      // Scroll to the selected row
      const rowElement = rows[targetRow] as HTMLElement;
      rowElement.scrollIntoView({ behavior: 'auto', block: 'center' });

      // Update selectedRowIndex
      this.selectedRowIndex = targetRow;
    }
  }

  closeDialog(row: Article | null) {
    if (row) {
      this.globalStatusService.setLoading(true);
      this.listPriceArticleService
        .getById(this.data.codlistprice, row.codart)
        .subscribe({
          next: (data) => {
            if (data.object) {
              row.desinv = 'MERC';
              row.price = data.object.price;
              row.stock = 0;
              row.moddesc = data.object.moddesc;
              row.modprice = data.object.modprice;
            } else {
              row.desinv = 'UND';
              row.price = 0;
              row.stock = 0;
              row.moddesc = 'Y';
              row.modprice = 'Y';
            }
          },
          error: (err) => {
            this.dialog.open(DialogErrorAlertComponent, {
              width: '400px',
              data: err.error,
            });
          },
          complete: () => {
            this.globalStatusService.setLoading(false);
            this.dialogRef.close(row);
          },
        });
    } else {
      this.dialogRef.close(null);
    }
  }
}

export class DataSourceArticle extends DataSource<Article> {
  data = new BehaviorSubject<Article[]>([]);
  originalData = new BehaviorSubject<Article[]>([]);

  connect(): Observable<Article[]> {
    return this.data;
  }

  disconnect() {}

  getInit(data: Article[]) {
    this.data.next(data);
    this.originalData.next(data);
  }

  getFind(query: string) {
    const data = this.originalData.getValue();
    const newData = data.filter((data) => {
      const word = `${data.codart}${data.codext}${data.descri}`;
      return word.toLowerCase().includes(query.toLowerCase());
    });
    this.data.next(newData);
  }

  getCount() {
    const data = this.data.getValue();
    return data.reduce((count, data) => (count = count + 1), 0) - 1;
  }
}

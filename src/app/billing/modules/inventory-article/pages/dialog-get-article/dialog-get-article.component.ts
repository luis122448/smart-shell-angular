import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DialogRef, DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { Article } from '@billing-models/article.model';
import { DataSource } from '@angular/cdk/collections';
import { ArticleService } from '@billing-services/article.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ListPriceArticleService } from '@billing-services/list-price-article.service';
import { DialogErrorAlertComponent } from "@shared/components/dialog-error-alert/dialog-error-alert.component";
import { PageEvent } from "@angular/material/paginator";

export interface DialogData {
  codart?: string;
  desart?: string;
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
  selectedRowIndex: number | null = 0;
  scrollingUp = false;
  isKeyboardNavigation = false;
  // Page
  totalElements = 0;
  pageSize = 25;
  pageIndex = 0;

  constructor(
    private dialogRef: DialogRef,
    private dialog: Dialog,
    private articleService: ArticleService,
    private listPriceArticleService: ListPriceArticleService,
    @Inject(DIALOG_DATA) private data: DialogData
  ) {}

  ngOnInit(): void {
    this.loadArticle(this.data.codart, this.data.desart);
    this.input.valueChanges.pipe(debounceTime(300)).subscribe((data) => {
      this.dataSource.getFind(data);
    });
  }

  loadArticle(codart: string = "%", desart: string = "%") {
    this.articleService.getByPage(1, codart, desart, true, 25, 0).subscribe({
      next: (data) => {
        if (data.status <= 0){
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: data,
          });
          this.dialogRef.close(null);
        }
        if (data.status > 0 && data.page.content.length === 1) {
          this.dialogRef.close(data.page.content[0]);
        }
        this.dataSource.getInit(data.page.content);
        this.totalElements = data.page.totalElements;
      },
      error: (err) => {
        this.dialogRef.close(null);
      }
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

  byPageEvent(e: PageEvent) {
    console.log(e.pageIndex);
    this.articleService
      .getByPage(
        -1,
        this.data.codart ? this.data.codart : "%",
        this.data.desart ? this.data.desart : "%",
        true,
        this.pageSize,
        e.pageIndex
      )
      .subscribe((data) => {
        this.dataSource.getInit(data.page.content);
      });
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
    }, 1000);
  }

  onArrowDown() {
    this.isKeyboardNavigation = true;
    this.scrollingUp = false;
    this.navigateRows(1);

    setTimeout(() => {
      this.isKeyboardNavigation = false;
    }, 1000);
  }

  private navigateRows(direction: number) {
    if (this.mainTable) {
      const rows = this.mainTable.nativeElement.querySelectorAll('.row-table');
      const currentRow = this.selectedRowIndex ?? 0;
      const targetRow = Math.max(
        0,
        Math.min(rows.length - 1, currentRow + direction)
      );
      const rowElement = rows[targetRow] as HTMLElement;
      rowElement.scrollIntoView({ behavior: 'auto', block: 'center' });
      this.selectedRowIndex = targetRow;
    }
  }

  closeDialog(row: Article | null) {
    if (!row) {
      this.dialogRef.close(null);
      return;
    }
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
          this.dialogRef.close(row);
        }, error: (err) => {
          this.dialogRef.close(null);
        }
      });
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

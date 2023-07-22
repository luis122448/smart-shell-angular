import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatInputModule } from '@angular/material/input';
// import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    MatPaginatorModule
  ],
  exports: [
    MatSlideToggleModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    MatPaginatorModule
  ],
  providers: []
})
export class MaterialModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@angular/cdk/dialog';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DialogModule,
    CdkTableModule,
    CdkAccordionModule,
    OverlayModule
  ],
  exports: [
    DialogModule,
    CdkTableModule,
    CdkAccordionModule,
    OverlayModule
  ]
})
export class CdkModule { }

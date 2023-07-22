import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicInfoClienteComponent } from './components/basic-info-cliente/basic-info-cliente.component';
import { CondicionPagoClienteComponent } from './components/condicion-pago-cliente/condicion-pago-cliente.component';
import { ContactoClienteComponent } from './components/contacto-cliente/contacto-cliente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    BasicInfoClienteComponent,
    CondicionPagoClienteComponent,
    ContactoClienteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    BasicInfoClienteComponent,
    CondicionPagoClienteComponent,
    ContactoClienteComponent
  ]
})
export class InterlocutorComercialModule { }

import { Component } from '@angular/core';
import { faMagnifyingGlass, faUsers, faCartFlatbed, faCommentsDollar,faIdBadge,
  faClipboardList, faTruckArrowRight, faCreditCard, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { InterlocutorComercial } from '@billing-models/interlocutor-comercial.model';
import { DialogAllClienteComponent } from 'src/app/billing/modules/interlocutor-comercial/page/dialog-all-cliente/dialog-all-cliente.component';
import { DialogCrudExchangeRateComponent } from '@billing/modules/exchange-rate/pages/dialog-crud-tipo-cambio/dialog-crud-tipo-cambio.component';
import { DialogAllInventarioArticleComponent } from '../../../inventario-articulo/components/dialog-all-inventario-articulo/dialog-all-inventario-articulo.component';
import { DialogDefaultConfig } from '@billing-utils/constants';
import { DialogDeleteQuestionComponent } from '@shared-components/dialog-delete-question/dialog-delete-question.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { DialogAllListPriceComponent } from '@billing/modules/list-price/components/dialog-all-list-price/dialog-all-list-price.component';
import { AlertStandardComponent } from '@shared/components/alert-standard/alert-standard.component';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';


@Component({
  selector: 'app-siderbar-rigth',
  templateUrl: './siderbar-rigth.component.html',
  styleUrls: ['./siderbar-rigth.component.scss']
})
export class SiderbarRigthComponent {

  faMagnifyingGlass = faMagnifyingGlass
  faUsers = faUsers
  faCartFlatbe = faCartFlatbed
  faCommentsDollar = faCommentsDollar
  faIdBadge = faIdBadge
  faClipboardList = faClipboardList
  faCreditCard = faCreditCard
  faTruckArrowRight = faTruckArrowRight
  faSquareXmark = faSquareXmark
  openSidebar = false;

  constructor(
    private dialog: Dialog,
    private authService:AuthService,
    private router: Router
  ){}

  openDialogBusinessPartner(){
    this.dialog.open<InterlocutorComercial>(DialogAllClienteComponent,DialogDefaultConfig)
  }

  openDialogExchangeRate(){
    this.dialog.open(DialogCrudExchangeRateComponent,DialogDefaultConfig)
  }

  openDialogArticle(){
    this.dialog.open(DialogAllInventarioArticleComponent,DialogDefaultConfig)
  }

  openDialogListPrice(){
    this.dialog.open(DialogAllListPriceComponent,DialogDefaultConfig)
  }

  openDialogTransport(){
    this.dialog.open(DialogErrorAlertComponent,{
      width: '400px',
      data: { status: -1, message: 'Functionality not available' }
    })
  }

  openDialogSeller(){
    this.dialog.open(DialogErrorAlertComponent,{
      width: '400px',
      data: { status: -1, message: 'Functionality not available' }
    })
  }

  openDialogPaymentCondition(){
    this.dialog.open(DialogErrorAlertComponent,{
      width: '400px',
      data: { status: -1, message: 'Functionality not available' }
    })
  }

  openDialogSesion(){
    const dialogCloseSesion = this.dialog.open(DialogDeleteQuestionComponent,{
      width: '400px',
      data: { status: -1, message: 'Esta seguro de cerrar sesión ?' }
    })
    dialogCloseSesion.closed
    .subscribe(data =>{
      if (data) {
        this.authService.postLogout()
        this.router.navigate(['/login'])
      }
    })
  }
}

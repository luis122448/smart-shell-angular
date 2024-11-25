import { Component } from '@angular/core';
import { faMagnifyingGlass, faUsers, faCartFlatbed, faCommentsDollar,faIdBadge,
  faClipboardList, faTruckArrowRight, faCreditCard, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { BusinessPartner } from '@billing-models/business-partner.model';
import { DialogAllClienteComponent } from '@billing-module-business-partner/pages/dialog-all-cliente/dialog-all-cliente.component';
import { DialogCrudExchangeRateComponent } from '@billing-module-exchange-rate/pages/dialog-crud-exchange-rate/dialog-crud-exchange-rate.component';
import { DialogAllInventoryArticleComponent } from '../../../billing/modules/inventory-article/components/dialog-all-inventario-articulo/dialog-all-inventario-articulo.component';
import { DialogDefaultConfig } from '@billing-utils/constants';
import { DialogDeleteQuestionComponent } from '@shared-components/dialog-delete-question/dialog-delete-question.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { DialogAllListPriceComponent } from '@billing/modules/list-price/components/dialog-all-list-price/dialog-all-list-price.component';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';


@Component({
  selector: 'app-siderbar-right',
  templateUrl: './siderbar-right.component.html',
  styleUrls: ['./siderbar-right.component.scss']
})
export class SiderbarRightComponent {

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
    this.dialog.open<BusinessPartner>(DialogAllClienteComponent,DialogDefaultConfig)
  }

  openDialogExchangeRate(){
    this.dialog.open(DialogCrudExchangeRateComponent,DialogDefaultConfig)
  }

  openDialogArticle(){
    this.dialog.open(DialogAllInventoryArticleComponent,DialogDefaultConfig)
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

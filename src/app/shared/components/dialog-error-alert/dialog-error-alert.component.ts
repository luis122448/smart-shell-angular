import { Component, Inject } from '@angular/core';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Mensaje } from '../../model/mensaje.model';
import { faCircleXmark,faCircleExclamation,faCircleInfo,faCircleMinus } from '@fortawesome/free-solid-svg-icons';

export const MESSAGE_NODATAFOUND = 'Search returned no results'
export const MESSAGE_ONLY_ONE_CRITERION = 'Type or select only one search criteria'

@Component({
  selector: 'app-dialog-error-alert',
  templateUrl: './dialog-error-alert.component.html',
  styleUrls: ['./dialog-error-alert.component.scss']
})
export class DialogErrorAlertComponent {

  faCircleXmark = faCircleXmark
  faCircleExclamation = faCircleExclamation
  faCircleInfo = faCircleInfo
  faCircleMinus = faCircleMinus

  mensaje: Mensaje = {
    status: -3,
    message: 'El mensaje de Error no llego al componente, revisar el codigo'
  }

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) private data: Mensaje
  ){
    if ( data.minimum_length ){
      this.mensaje = {
        status: -2,
        message: 'Enter at least ' + data.minimum_length + ' characters'
      }
    } else if ( data.no_data_found ) {
      this.mensaje = {
        status: -2,
        message: MESSAGE_NODATAFOUND
      }
    }  else if ( data.only_one_criterion ){
      this.mensaje = {
        status: -2,
        message: MESSAGE_ONLY_ONE_CRITERION
      }
    } else {
      this.mensaje = data
    }
  }

  onClose(){
    this.dialogRef.close()
  }

}

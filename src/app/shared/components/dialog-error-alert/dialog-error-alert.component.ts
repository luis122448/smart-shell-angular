import { Component, Inject } from '@angular/core';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Mensaje } from '../../model/mensaje.model';
import {
  faCircleXmark,
  faCircleExclamation,
  faCircleInfo,
  faCircleMinus,
} from '@fortawesome/free-solid-svg-icons';

export const MESSAGE_NODATAFOUND = 'Search returned no results';
export const MESSAGE_ONLY_ONE_CRITERION =
  'Type or select only one search criteria';
export const MESSAGE_NO_FILE_SELECTED = 'No file selected';
export const MESSAGE_NO_REQUIRED_FIELDS = 'Required fields (*) not completed';

@Component({
  selector: 'app-dialog-error-alert',
  templateUrl: './dialog-error-alert.component.html',
  styleUrls: ['./dialog-error-alert.component.scss'],
})
export class DialogErrorAlertComponent {
  faCircleXmark = faCircleXmark;
  faCircleExclamation = faCircleExclamation;
  faCircleInfo = faCircleInfo;
  faCircleMinus = faCircleMinus;

  varInfo: boolean = false;
  varWarning: boolean = false;
  varError: boolean = false;

  mensaje: Mensaje = {
    status: -3,
    message: 'El mensaje de Error no llego al componente, revisar el codigo',
  };

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) private data: Mensaje
  ) {
    if (data.minimum_length) {
      this.mensaje = {
        status: -1,
        message: 'Enter at least ' + data.minimum_length + ' characters',
      };
    } else if (data.no_data_found) {
      this.mensaje = {
        status: -1,
        message: MESSAGE_NODATAFOUND,
        logMessage: MESSAGE_NODATAFOUND,
      };
    } else if (data.only_one_criterion) {
      this.mensaje = {
        status: -1,
        message: MESSAGE_ONLY_ONE_CRITERION,
        logMessage: MESSAGE_ONLY_ONE_CRITERION,
      };
    } else if (data.no_file_selected) {
      this.mensaje = {
        status: -1,
        message: MESSAGE_NO_FILE_SELECTED,
        logMessage: MESSAGE_NO_FILE_SELECTED,
      };
    } else if (data.no_required_fields) {
      this.mensaje = {
        status: -1,
        message: MESSAGE_NO_REQUIRED_FIELDS,
        logMessage: MESSAGE_NO_REQUIRED_FIELDS,
      };
    } else if (data.status && data.message) {
      this.mensaje = data;
    } else {
      this.mensaje = {
        status: -3,
        message: 'AN UNKNOWN ERROR HAS OCCURRED',
        logMessage: 'THIS API DOES NOT RETURN A CODE AND MESSAGE ERROR',
      };
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onWarning() {
    this.varWarning = !this.varWarning;
  }

  onReport() {
    this.varError = !this.varError;
  }
}

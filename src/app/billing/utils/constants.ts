import { DialogDefault, DialogMessage } from "../models/dialogmessage.model";
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

//Image Upload Default
export const IMAGENOUPLOAD = '../../../../../../assets/images/resources/imageNoUpload.png'

export const DialogDefaultConfig: DialogDefault = {
  // width: '800px',
  // height: '800px'
}

export const NoDataFoundMessageDialog: DialogMessage = {
  width: '400px',
  data: {
    status: 0,
    message: 'No se encontraron resultados!'
  }
}

export const NoJpgFormatImage: DialogMessage = {
  width: '400px',
  data: {
    status: -3,
    message: 'Formato Incorrecto!, Solo se aceptan imagenes en formato jpg'
  }
}

export const NoFormatCorrect: DialogMessage = {
  width: '400px',
  data: {
    status: -3,
    message: 'Formato Incorrecto!, Solo se aceptan imagenes en formato jpg'
  }
}

export const MatSnackBarSuccessConfig = {
  duration: 1500,
  horizontalPosition: 'center' as MatSnackBarHorizontalPosition,
  verticalPosition: 'top' as MatSnackBarVerticalPosition
};

export const MatSnackBarMessageConfig = {
  duration: 15500,
  horizontalPosition: 'center' as MatSnackBarHorizontalPosition,
  verticalPosition: 'top' as MatSnackBarVerticalPosition
};

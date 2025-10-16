import { Component, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { faTrashArrowUp,faTrash, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Mensaje } from '../../model/mensaje.model';

@Component({
  selector: 'app-dialog-delete-question',
  templateUrl: './dialog-delete-question.component.html',
  styleUrls: ['./dialog-delete-question.component.scss']
})
export class DialogDeleteQuestionComponent {

  faTrashArrowUp = faTrashArrowUp
  faTrash = faTrash
  faCircleXmark = faCircleXmark
  mensaje: Mensaje = {
    status: -3,
    message: 'El mensaje de Error no llego al componente, revisar el codigo'
  }

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) private data: Mensaje
  ){
    this.mensaje = data
  }

  closeDialog(data: boolean){
    this.dialogRef.close(data)
  }
}

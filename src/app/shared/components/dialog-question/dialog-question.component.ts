import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { Mensaje } from '@shared/model/mensaje.model';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dialog-question',
  templateUrl: './dialog-question.component.html',
  styleUrls: ['./dialog-question.component.scss']
})
export class DialogQuestionComponent {
  faCircleQuestion = faCircleQuestion
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

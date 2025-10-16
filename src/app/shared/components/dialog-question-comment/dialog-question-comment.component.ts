import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { Mensaje } from '@shared/model/mensaje.model';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-question-comment',
  templateUrl: './dialog-question-comment.component.html',
  styleUrls: ['./dialog-question-comment.component.scss']
})
export class DialogQuestionCommentComponent {
  faCircleQuestion = faCircleQuestion
  formQuestion: FormControl = new FormControl('', Validators.required);

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
    if(!data){
      this.dialogRef.close({
        status: data,
        commen: ''
      })
      return
    }
    if(data && this.formQuestion.invalid){
      this.formQuestion.markAsTouched();
      return
    }
    this.dialogRef.close({
      status: data,
      commen: this.formQuestion.value
    })
  }

}

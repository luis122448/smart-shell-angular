import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-matsnackbar-success',
  templateUrl: './matsnackbar-success.component.html',
  styleUrls: ['./matsnackbar-success.component.scss']
})
export class MatsnackbarSuccessComponent {

  faCircleCheck = faCircleCheck

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string,
    private snackBarRef: MatSnackBarRef<MatsnackbarSuccessComponent>
  ){}

  onClose() {
    this.snackBarRef.dismiss();
  }
}

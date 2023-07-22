import { Component, Inject } from '@angular/core';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-matsnackbar-message',
  templateUrl: './matsnackbar-message.component.html',
  styleUrls: ['./matsnackbar-message.component.scss']
})
export class MatsnackbarMessageComponent {

  faCircleCheck = faCircleCheck

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string
  ){}

}

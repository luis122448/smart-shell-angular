import { Component } from '@angular/core';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-matsnackbar-success',
  templateUrl: './matsnackbar-success.component.html',
  styleUrls: ['./matsnackbar-success.component.scss']
})
export class MatsnackbarSuccessComponent {

  faCircleCheck = faCircleCheck
}

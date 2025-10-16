import { Component } from '@angular/core';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alert-standard',
  templateUrl: './alert-standard.component.html',
  styleUrls: ['./alert-standard.component.scss']
})
export class AlertStandardComponent {

  faCircleExclamation = faCircleExclamation
}

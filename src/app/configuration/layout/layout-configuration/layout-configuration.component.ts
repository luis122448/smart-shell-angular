import { Component } from '@angular/core';
import { GlobalStatusService } from '@billing-services/global-status.service';

@Component({
  selector: 'app-layout-configuration',
  templateUrl: './layout-configuration.component.html',
  styleUrls: ['./layout-configuration.component.scss']
})
export class LayoutConfigurationComponent {

  title: string = 'Company Configuration'
  save: boolean = false

  constructor(
    private globalStatusService: GlobalStatusService
  ) { }

  changeSave($event: boolean){
    this.save = $event
  }

}

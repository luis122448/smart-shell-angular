import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-configuration',
  templateUrl: './layout-configuration.component.html',
  styleUrls: ['./layout-configuration.component.scss']
})
export class LayoutConfigurationComponent {

  title: string = 'Company Configuration'
  save: boolean = false

  changeSave($event: boolean){
    this.save = $event
  }

}

import { Component, Input } from '@angular/core';
import { ConfigurationStatusService } from '@configuration/services/configuration-status.service';

@Component({
  selector: 'app-header-configuration',
  templateUrl: './header-configuration.component.html',
  styleUrls: ['./header-configuration.component.scss']
})
export class HeaderConfigurationComponent {

  @Input() title: string = '';

  constructor(
    private configurationStatusService: ConfigurationStatusService,
  ) { }

  onLeave(){
    this.configurationStatusService.setStatusConfigurationEdit(false, undefined);
    this.configurationStatusService.setStatusConfigurationSave(false, undefined);
    this.configurationStatusService.setStatusConfiguration('search');
  }

  onNew(){
    this.configurationStatusService.setStatusConfigurationEdit(false, undefined);
    this.configurationStatusService.setStatusConfigurationSave(false, undefined);
    this.configurationStatusService.setStatusConfiguration('new');
  }

  onSave() {
    console.log('onSave');
    this.configurationStatusService.setStatusConfigurationSave(true);
    setTimeout(() => {
      this.configurationStatusService.setStatusConfigurationSave(false);
    },100);
  }

  get isStatusConfiguration(){
    return this.configurationStatusService.isStatusConfiguration;
  }

}

import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class ConfigurationStatusService {

  isStatusConfiguration = signal<'search' | 'register' | 'new'>('search');
  isStatusConfigurationSave = signal<ConfigurationSaveObject>({
    status: false,
    data: undefined
  });
  isStatusConfigurationEdit = signal<ConfigurationSaveObject>({
    status: false,
    data: undefined
  });

  setStatusConfiguration(data: 'search' | 'register' | 'new') {
    this.isStatusConfiguration.set(data);
  }

  setStatusConfigurationSave(status: boolean, data?: any) {
    this.isStatusConfigurationSave.set({
      status: status,
      data: data
    });
  }

  setStatusConfigurationEdit(status: boolean, data?: any) {
    this.isStatusConfigurationEdit.set({
      status: status,
      data: data
    });
  }

}

export interface ConfigurationSaveObject {
  status: boolean;
  data?: any;
}

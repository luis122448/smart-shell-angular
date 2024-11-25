import { Component } from '@angular/core';
import { Company } from '@auth/models/default-values.model';
import { DefaultValuesService } from '@auth/services/default-values.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.scss'
})
export class BranchComponent {
  company!: Company

  constructor(
    private defaultValuesService: DefaultValuesService,
  ) {
    this.company = this.defaultValuesService.getLocalStorageValue('company')[0];
  }

}

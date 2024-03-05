import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-import-sbs',
  templateUrl: './button-import-sbs.component.html',
  styleUrls: ['./button-import-sbs.component.scss']
})
export class ButtonImportSbsComponent {
  @Input() disabled = false;
  @Input() loading = false;
  @Input() typeBtn: 'reset' | 'submit' | 'button' = 'button';
}

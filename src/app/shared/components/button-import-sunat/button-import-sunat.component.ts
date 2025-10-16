import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-import-sunat',
  templateUrl: './button-import-sunat.component.html',
  styleUrls: ['./button-import-sunat.component.scss']
})
export class ButtonImportSunatComponent {
  @Input() disabled = false;
  @Input() loading = false;
  @Input() typeBtn: 'reset' | 'submit' | 'button' = 'button';
}

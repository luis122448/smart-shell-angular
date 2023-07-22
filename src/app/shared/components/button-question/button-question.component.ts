import { Component, Input } from '@angular/core';
import { Colors, COLORS } from '../../model/color.model';

@Component({
  selector: 'app-button-question',
  templateUrl: './button-question.component.html',
  styleUrls: ['./button-question.component.scss']
})
export class ButtonQuestionComponent {
  @Input() disabled = false;
  @Input() loading = false;
  @Input() typeBtn: 'reset' | 'submit' | 'button' = 'button';
  @Input() colorBtn: Colors = 'green';

  mapColors = COLORS;

  constructor() {}

  get colors() {
    const colors = this.mapColors[this.colorBtn];
    if (colors) {
      return colors;
    }
    return {};
  }
}

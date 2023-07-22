import { Component,Input } from '@angular/core';
import { faSpinner,faFloppyDisk,faCalculator,faCircleLeft,faBroomBall,faCircleXmark,faPlus,faNewspaper,faTrashArrowUp,
  faMagnifyingGlass,faQuestion,faTrashCan,faPenToSquare, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Colors, COLORS, COLORSOPERAC } from '../../model/color.model';
import { ButtonOption } from '../../model/button-option.model';

@Component({
  selector: 'app-button-operac',
  templateUrl: './button-operac.component.html',
  styleUrls: ['./button-operac.component.scss']
})
export class ButtonOperacComponent {
  @Input() optionBtn: ButtonOption = ''
  @Input() colorBtn: Colors = 'sky';

  mapColors = COLORSOPERAC;

  constructor() {}

  get colors() {
    const colors = this.mapColors[this.colorBtn];
    if (colors) {
      return colors;
    }
    return {};
  }

  getIcon(optionBtn: string): IconDefinition {
    switch (optionBtn) {
      case 'save':
        return faFloppyDisk
      case 'edit':
        return faPenToSquare
      case 'delete':
        return faTrashCan
      case 'calculate':
        return faCalculator
      case 'clean':
        return faBroomBall
      case 'back':
        return faCircleLeft
      case 'search':
        return faMagnifyingGlass
      case 'question':
        return faQuestion
      case 'add':
        return faPlus
      case 'new':
        return faNewspaper
      case 'undelete':
        return faTrashArrowUp
      case 'close':
        return faCircleXmark
      default:
        return faQuestion; // Puedes establecer un ícono predeterminado aquí si es necesario
    }
  }
}

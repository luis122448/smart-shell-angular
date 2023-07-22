import { Component, Input } from '@angular/core';
import { faSpinner,faFloppyDisk,faCalculator,faCircleLeft,faBroomBall,faCircleXmark,faNewspaper,
faMagnifyingGlass,faQuestion,faTrashCan,faPenToSquare, IconDefinition, faPlus, faTrashArrowUp, faRightToBracket, faFileInvoice, faUpload, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Colors, COLORS } from '../../model/color.model';
import { ButtonOption } from '../../model/button-option.model';

@Component({
  selector: 'app-button-standard',
  templateUrl: './button-standard.component.html',
  styleUrls: ['./button-standard.component.scss']
})
export class ButtonStandardComponent {
  @Input() disabledBtn = false;
  @Input() loadingBtn = false;
  @Input() optionBtn: ButtonOption = ''
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

  getIcon(optionBtn: string): IconDefinition {
    switch (optionBtn) {
      case 'import':
        return faUpload
      case 'export':
        return faDownload
      case 'register':
        return faFileInvoice
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
      case 'go':
        return faRightToBracket
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

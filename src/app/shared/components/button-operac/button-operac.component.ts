import { Component,Input, OnInit } from '@angular/core';
import { faSpinner,faFloppyDisk,faCalculator,faCircleLeft,faBroomBall,faCircleXmark,faPlus,faNewspaper,faTrashArrowUp,
  faMagnifyingGlass,faQuestion,faTrashCan,faPenToSquare, IconDefinition, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Colors, COLORS, COLORSOPERAC } from '../../model/color.model';
import { ButtonOption } from '../../model/button-option.model';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button-operac',
  templateUrl: './button-operac.component.html',
  styleUrls: ['./button-operac.component.scss']
})
export class ButtonOperacComponent implements OnInit{
  @Input() optionBtn: ButtonOption = ''
  @Input() colorBtn: Colors = 'sky';
  @Input() disabled = false;
  @Input() sizeBtn: string = '2xs';
  sizeIconProp: SizeProp | undefined = undefined;
  validSizes: SizeProp[] = ['2xs','xs','sm', 'lg', 'xl', '2xl'];

  mapColors = COLORSOPERAC;

  constructor() {
    this.sizeIconProp = this.convertToSizeProp(this.sizeBtn);
  }
  ngOnInit(): void {
    this.sizeIconProp = this.convertToSizeProp(this.sizeBtn);
  }

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
      case 'download':
        return faDownload
      default:
        return faQuestion; // Puedes establecer un ícono predeterminado aquí si es necesario
    }
  }

  convertToSizeProp(sizeStr: string): SizeProp | undefined {
    if (this.validSizes.includes(sizeStr as SizeProp)) {
      return sizeStr as SizeProp; // Conversión segura porque sizeStr coincide con los valores válidos
    } else {
      console.error(`El tamaño ${sizeStr} no es válido`);
      return undefined; // Si la cadena no coincide con ningún valor válido, se devuelve undefined
    }
  }
}

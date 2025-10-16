import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

interface StackTechIcon {
  id: number;
  tag: string;
  url: string;
}

const stackTechsSize : Record<number, string> = {
  4: 'h-4 w-4',
  6: 'h-6 w-6',
  8: 'h-8 w-8',
  10: 'h-10 w-10',
  12: 'h-12 w-12',
  16: 'h-16 w-16',
  20: 'h-20 w-20',
  24: 'h-24 w-24',
  32: 'h-32 w-32',
  40: 'h-40 w-40',
  48: 'h-48 w-48',
  56: 'h-56 w-56',
  64: 'h-64 w-64',
}

@Component({
  selector: 'app-stack-tech',
  templateUrl: './stack-tech.component.html',
  styleUrls: ['./stack-tech.component.scss']
})
export class StackTechComponent implements OnChanges{

  @Input() stackTechs: string[] = [];
  @Input() size: number = 8;
  stackTechIcons: StackTechIcon[] = [];

  constructor() {
    this.stackTechs.map((tech, index) => {
      this.stackTechIcons.push({
        id: index,
        tag: tech,
        url: `../../../../../../assets/svg/${tech}-icon.svg`
      })
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stackTechs']) {
      this.stackTechIcons = this.stackTechs.map((tech, index) => {
        return {
          id: index,
          tag: tech,
          url: `../../../../../../assets/svg/${tech}-icon.svg`
        }
      })
    }
  }
  get sizeTag() {
    return stackTechsSize[this.size];
  }

  get sizeIcon() {
    return stackTechsSize[this.size-2];
  }

}

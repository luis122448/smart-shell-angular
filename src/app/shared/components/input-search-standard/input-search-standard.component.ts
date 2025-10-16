import { Component, Input } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-search-standard',
  templateUrl: './input-search-standard.component.html',
  styleUrls: ['./input-search-standard.component.scss']
})
export class InputSearchStandardComponent {

  input =  new FormControl('')
  @Input() formInp = this.input
  faMagnifyingGlass = faMagnifyingGlass
}

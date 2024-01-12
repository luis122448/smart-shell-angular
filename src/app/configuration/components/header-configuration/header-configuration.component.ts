import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-configuration',
  templateUrl: './header-configuration.component.html',
  styleUrls: ['./header-configuration.component.scss']
})
export class HeaderConfigurationComponent {

  @Input() title: string = ''
  @Output() changeViewOnly = new EventEmitter<'search' | 'crud'>();
  @Output() changeSave = new EventEmitter<boolean>(false);

  onLeave(){
    this.changeViewOnly.emit('search')
  }

  onSave() {
    this.changeSave.emit(true);
    // Después de un cierto tiempo, emite el valor false para restablecer
    setTimeout(() => {
      this.changeSave.emit(false);
    }, 1000); // Aquí puedes ajustar el tiempo en milisegundos
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  stackTechs: string[] = [
    "angular",
    "springio",
    "postgresql",
    "mongodb",
    "redis",
    "docker",
  ]

}

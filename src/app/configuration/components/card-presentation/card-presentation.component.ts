import { Component } from '@angular/core';
import { faGithubSquare, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-card-presentation',
  templateUrl: './card-presentation.component.html',
  styleUrls: ['./card-presentation.component.scss']
})
export class CardPresentationComponent {

  faGithubSquare = faGithubSquare;
  faLinkedin = faLinkedin;
  faTelegram = faTelegram;

  constructor() { }

}

import { Component } from '@angular/core';
import { faGithub, faLinkedin, faWhatsapp, faWhatsappSquare, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faCode, faGlobe, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  faGitHub = faGithub;
  faLinkedin = faLinkedin;
  faCode = faCode;
  faWhatsapp = faWhatsapp;
  faGlobe = faGlobe;
  faWhatsappSquare = faWhatsappSquare;
  faTelegram = faTelegram;
  faFolderOpen = faFolderOpen;

}

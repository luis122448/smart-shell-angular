import { Component, OnInit } from '@angular/core';
import {
  faXmark,
  faPenToSquare,
  faChartLine,
  faFileInvoice,
  faShop,
  faGears,
  faUserTag,
  faMagnifyingGlass,
  faFilm,
} from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';
import { User } from '@billing-models/user.model';
import { IMAGENOUPLOAD } from '@billing-utils/constants';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { UserService } from '@billing-services/user.service';

@Component({
  selector: 'app-siderbar-left',
  templateUrl: './siderbar-left.component.html',
  styleUrls: ['./siderbar-left.component.scss'],
})
export class SiderbarLeftComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  faGithubSquare = faGithubSquare;
  faLinkedin = faLinkedin;
  openSidebar = false;
  baseUrl: string;
  user: User | undefined | null = null;
  imageArticleURL = IMAGENOUPLOAD;
  stackTechs: string[] = ['angular', 'springio'];
  stackTechsDisplay: string[] = ['postgresql', 'mongodb', 'redis'];

  menuSidebar = [
    {
      rotulo: 'Tutorial',
      id: '',
      link: 'billing/dashboard',
      icon: faFilm,
      subMenu: [],
      open: false,
    },
    {
      rotulo: 'Billing',
      id: '',
      link: 'billing/invoice',
      icon: faShop,
      subMenu: [],
      open: false,
    },
    {
      rotulo: 'Configuration',
      id: '',
      link: 'configuration/principal',
      icon: faGears,
      subMenu: [
        {
          rotulo: 'Company',
          id: '',
          link: 'configuration/principal',
          icon: faBuilding,
        },
        {
          rotulo: 'Serie / Document',
          id: '',
          link: 'configuration/serie',
          icon: faFileInvoice,
        },
      ],
      open: false,
    },
    {
      rotulo: 'Credits',
      id: '',
      link: 'configuration/credits',
      icon: faUserTag,
      subMenu: [],
      open: false,
    },
  ];

  constructor(
    private router: Router,
    private location: Location,
    private defaultValuesService: DefaultValuesService,
    private userService: UserService
  ) {
    this.baseUrl = this.location.prepareExternalUrl('/');
    this.user = this.defaultValuesService.getLocalStorageValue('user')[0];
    if (this.user?.image) {
      this.imageArticleURL = `data:image/webp;base64,${this.user?.image}`;
    }
  }
  ngOnInit(): void {
    if (!this.user) {
      this.userService.getProfile().subscribe({
        next: (data) => {
          this.user = data.object;
          if (this.user?.image) {
            this.imageArticleURL = `data:image/webp;base64,${this.user?.image}`;
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  toRedirec(path: string) {
    const redirectUrl = `${this.baseUrl}/${path}`; // Construir la URL de redirección
    this.router.navigateByUrl(redirectUrl); // Redirigir a la URL especificada
  }

  onSearch() {}
}

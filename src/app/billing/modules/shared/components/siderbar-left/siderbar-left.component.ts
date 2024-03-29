import { Component } from '@angular/core';
import { faXmark, faPenToSquare, faChartLine, faFileInvoice, faShop, faGears, faUserTag, faMagnifyingGlass, faFilm } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-siderbar-left',
  templateUrl: './siderbar-left.component.html',
  styleUrls: ['./siderbar-left.component.scss']
})
export class SiderbarLeftComponent {
  faMagnifyingGlass = faMagnifyingGlass
  faGithubSquare = faGithubSquare
  faLinkedin = faLinkedin
  openSidebar = false;
  baseUrl: string;
  stackTechs: string[] = [
    "angular",
    "springio"
  ]
  stackTechsDisplay: string[] = [
    "postgresql",
    "mongodb",
    "redis",
  ]

  menuSidebar = [
    {
      rotulo: "Tutorial",
      id: '',
      link: 'billing/dashboard',
      icon: faFilm,
      subMenu: [],
      open: false
    },
    {
      rotulo: "Billing",
      id: '',
      link: 'billing/invoice',
      icon: faShop,
      subMenu: [],
      open: false
    },
    {
      rotulo: "Configuration",
      id: '',
      link: 'configuration/principal',
      icon: faGears,
      subMenu: [
        {
          rotulo: 'Company',
          id: '',
          link: 'configuration/principal',
          icon: faBuilding
        },
        {
          rotulo: 'Serie / Document',
          id: '',
          link: 'configuration/serie',
          icon: faFileInvoice
        }
      ],
      open: false
    },
    {
      rotulo: "Credits",
      id: '',
      link: 'configuration/credits',
      icon: faUserTag,
      subMenu: [],
      open: false
    }
  ]

  constructor(
    private router:Router,
    private location:Location
  ){
    this.baseUrl = this.location.prepareExternalUrl('/')
  }

  toRedirec(path: string){
    const redirectUrl = `${this.baseUrl}/${path}`; // Construir la URL de redirección
    this.router.navigateByUrl(redirectUrl); // Redirigir a la URL especificada
  }

  onSearch(){

  }

}

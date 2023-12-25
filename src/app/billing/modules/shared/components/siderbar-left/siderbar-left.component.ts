import { Component } from '@angular/core';
import { faXmark, faPenToSquare, faChartLine, faFileInvoice, faShop, faGears, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-siderbar-left',
  templateUrl: './siderbar-left.component.html',
  styleUrls: ['./siderbar-left.component.scss']
})
export class SiderbarLeftComponent {
  faGithubSquare = faGithubSquare
  faLinkedin = faLinkedin
  openSidebar = true;
  baseUrl: string;
  // menuSidebar = [
  //   {
  //     rotulo: "DashBoard",
  //     id: '',
  //     link: 'facturacion/dashboard',
  //     icon: faChartLine,
  //     subMenu: [],
  //     open: false
  //   },
  //   {
  //     rotulo: "Billing",
  //     id: '',
  //     link: '',
  //     icon: faShop,
  //     subMenu: [
  //       {
  //         rotulo: 'Invoice',
  //         id: '',
  //         link: 'facturacion/billing',
  //         icon: faFileInvoice
  //       },
  //       {
  //         rotulo: 'Note Credit / Debit',
  //         id: '',
  //         link: '',
  //         icon: null
  //       }
  //     ],
  //     open: false
  //   },
  //   {
  //     rotulo: "Configuration",
  //     id: '',
  //     link: 'configuration/principal',
  //     icon: faGears,
  //     subMenu: [
  //       {
  //         rotulo: 'Company',
  //         id: '',
  //         link: 'configuration/principal',
  //         icon: null
  //       },
  //       {
  //         rotulo: 'Serie / Document',
  //         id: '',
  //         link: '',
  //         icon: null
  //       }
  //     ],
  //     open: false
  //   }
  // ]

  menuSidebar = [
    {
      rotulo: "DashBoard",
      id: '',
      link: 'billing/dashboard',
      icon: faChartLine,
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
      subMenu: [],
      open: false
    },
    {
      rotulo: "Configuration2",
      id: '',
      link: 'configuration/principal',
      icon: faGears,
      subMenu: [
        {
          rotulo: 'Company',
          id: '',
          link: 'configuration/principal',
          icon: null
        },
        {
          rotulo: 'Serie / Document',
          id: '',
          link: '',
          icon: null
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

}

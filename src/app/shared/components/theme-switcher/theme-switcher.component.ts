import { Component, OnInit, HostListener, Renderer2, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DOCUMENT, NgClass, CommonModule } from '@angular/common';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

import { DefaultValuesService } from 'src/app/auth/services/default-values.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnChanges{

  @Input() openSidebar: boolean = false;
  faSun = faSun
  faMoon = faMoon
  isDark = true;
  isOpenSidebar = false;
  renderer = inject(Renderer2);
  document = inject(DOCUMENT);

  constructor(
    private defaultValuesService: DefaultValuesService
  ){
    this.renderer.addClass(this.document.body.parentElement, 'dark');
    this.isDark = this.defaultValuesService.getCookie('dark') === 'true' ? true : false;
    this.onChange(false)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['openSidebar']){
      this.isOpenSidebar = changes['openSidebar'].currentValue;
    }
  }

  onChange(change: boolean){
    if(change){
      this.isDark = !this.isDark;
      this.defaultValuesService.setCookie('dark',this.isDark.toString())
    }

    if (this.isDark) {
      this.renderer.addClass(this.document.body.parentElement, 'dark');
    } else {
      this.renderer.removeClass(this.document.body.parentElement, 'dark');
    }
  }

  // ... some other code
  // switchTheme(theme?: string) {
  //   if (theme) {
  //     this.themeSwitcher = theme === 'dark' ? true : false;
  //   } else {
  //     this.themeSwitcher = !this.themeSwitcher;
  //   }

  //   if (this.themeSwitcher) {
  //     this.renderer.addClass(this.document.body.parentElement, 'dark');
  //   } else {
  //     this.renderer.removeClass(this.document.body.parentElement, 'dark');
  //   }

  // }
}

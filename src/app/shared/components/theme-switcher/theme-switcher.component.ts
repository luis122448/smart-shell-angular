import { Component, OnInit, HostListener, Renderer2, inject } from '@angular/core';
import { DOCUMENT, NgClass, CommonModule } from '@angular/common';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent {

  faSun = faSun
  faMoon = faMoon
  themeSwitcher = false;
  renderer = inject(Renderer2);
  document = inject(DOCUMENT);

  constructor(){
    this.renderer.addClass(this.document.body.parentElement, 'dark');
  }

// Theme switcher component code snippet
  @HostListener('change', ['$event']) onChange(event: Event) {
    if((event?.target as HTMLInputElement)?.id === 'themeSwitcher') {
      // this.switchTheme((event?.target as HTMLInputElement)?.checked ? 'dark' : 'light');
      this.switchTheme((event?.target as HTMLInputElement)?.checked ? 'dark' : 'light');
    }
  }

  // ... some other code

  switchTheme(theme?: string) {
    if (theme) {
      // this.themeSwitcher = theme === 'dark' ? true : false;
      this.themeSwitcher = theme === 'dark' ? true : false;
    } else {
      this.themeSwitcher = !this.themeSwitcher;
    }

    if (this.themeSwitcher) {
      this.renderer.addClass(this.document.body.parentElement, 'dark');
    } else {
      this.renderer.removeClass(this.document.body.parentElement, 'dark');
    }

  }
}

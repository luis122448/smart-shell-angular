import { Component} from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'SmartShell';

  // constructor(private translateService: TranslateService) {
  //   this.translateService.setDefaultLang('en');
  //   this.translateService.use('en');
  //
  //   const browserLang = this.translateService.getBrowserLang();
  //   if (browserLang) {
  //     this.translateService.use(browserLang.match(/en|es/) ? browserLang : 'en');
  //   }
  // }
//
}

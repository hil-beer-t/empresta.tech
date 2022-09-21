import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  showAnchors: boolean = false;

  constructor(public auth: AuthService, translate: TranslateService) {
    translate.addLangs(['pt']);

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('pt');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('pt');
  }

  ngOnInit(): void {
    this.auth.showNavAnchors.subscribe(
      show => this.showAnchors = show
    )
  }
}

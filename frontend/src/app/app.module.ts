import { LoanGuard } from './private/modules/loan/guards/loan.guard';
import { AuthService } from './core/auth/auth.service';
import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { darkTheme } from './core/theme/dark-theme';
import { lightTheme } from './core/theme/light-theme';
import { ThemeModule } from './core/theme/theme.module';
import { PrivateModule } from './private/private.module';
import { PublicModule } from './public/public.module';

import localePt from "@angular/common/locales/pt";
import { AuthGuard } from './core/guards/auth.guard';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export function getToken(): string {
  return localStorage.getItem('access_token') as string;
}

registerLocaleData(localePt)
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PrivateModule,
    PublicModule,
    HttpClientModule,
    ThemeModule.forRoot({
      themes: [darkTheme, lightTheme],
      active: 'dark'
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'pt',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    }),
    AppRoutingModule,

  ],
  providers: [
    AuthService,
    AuthGuard,
    LoanGuard,
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

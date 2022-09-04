import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { darkTheme } from './core/theme/dark-theme';
import { lightTheme } from './core/theme/light-theme';
import { ThemeModule } from './core/theme/theme.module';
import { PrivateModule } from './private/private.module';
import { PublicModule } from './public/public.module';

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
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

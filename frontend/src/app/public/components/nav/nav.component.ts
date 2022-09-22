import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ThemeService } from 'src/app/core/theme/theme.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  showAnchors: boolean = false

  constructor(public modal: ModalService, public themeService: ThemeService, public auth: AuthService) {

  }

  ngOnInit(): void {

    console.log(this.showAnchors + ' nav')
    this.auth.showNavAnchors.subscribe(
      show => this.showAnchors = show
    )
  }

  openModal($event: Event) {
    $event.preventDefault()
    this.modal.toggleModal('auth')
  }

  toggleTheme($event: Event) {
    const active = this.themeService.getActiveTheme();
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }

}

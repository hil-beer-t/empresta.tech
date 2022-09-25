import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public modal: ModalService) { }

  ngOnInit(): void {
  }

  openModal($event: Event) {
    $event.preventDefault()
    this.modal.toggleModal('auth')
  }

}

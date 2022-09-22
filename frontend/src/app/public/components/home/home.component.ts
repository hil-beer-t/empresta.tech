import { LoanService } from 'src/app/core/services/loan.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public modal: ModalService) { }

  ngOnInit(): void {

  }

  openModal($event: Event) {
    $event.preventDefault()
    this.modal.toggleModal('auth')
  }

}

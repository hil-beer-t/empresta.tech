import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/public/services/modal.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  haveLoan = false;
  haveLoans = false;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  openModal($event: Event){
    $event.preventDefault()

    this.modalService.toggleModal('createLoan')
  }

}

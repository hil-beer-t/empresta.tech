import { Component, OnInit } from '@angular/core';
import IAddress from 'src/app/core/models/address.model';
import IUser from 'src/app/core/models/user.model';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {

  constructor(public modal: ModalService) { }

  ngOnDestroy(): void {
    this.modal.unregister('auth')
  }

  ngOnInit(): void {
    this.modal.register('auth')
  }

}

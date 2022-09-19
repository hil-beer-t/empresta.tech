import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoanService } from 'src/app/core/services/loan.service';
import { ModalService } from 'src/app/public/services/modal.service';
import { TokenService } from 'src/app/core/services/token.service';
import ILoan from 'src/app/core/models/loan.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit, OnDestroy, OnChanges {

  haveLoan: boolean = true;
  haveLoans: boolean = false;
  loans: ILoan[] = []

  readonly subscriptions = new Subscription()

  constructor(private modalService: ModalService, private loanService: LoanService, private token: TokenService) { }
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  ngOnInit(): void {
    this.listLoans()
  }

  openModal($event: Event) {
    $event.preventDefault()

    this.modalService.toggleModal('createLoan')
  }

  private listLoans(): void {
    const subscription = this.loanService.getLoanByEmail(this.token.getUserEmail()).subscribe((items) => {
      const data = items.data
      this.loans = data
      console.log(this.loans)
      this.haveLoan = this.loans.length >= 1 ? true : false;
      this.haveLoans = this.loans.length > 1 ? true : false;
      console.log(this.haveLoan)
      console.log(this.haveLoans)
    })

    this.subscriptions.add(subscription)
  }

}

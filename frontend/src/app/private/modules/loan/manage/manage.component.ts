import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoanService } from 'src/app/core/services/loan.service';
import { ModalService } from 'src/app/public/services/modal.service';
import ILoan from 'src/app/core/models/loan.model';
import { TranslateService } from '@ngx-translate/core';
import IStatus from 'src/app/core/models/status.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit, OnDestroy {

  haveLoan: boolean = true
  haveLoans: boolean = false
  loans: ILoan[] = []

  readonly subscriptions = new Subscription()

  constructor(public translate: TranslateService, private modalService: ModalService, private loanService: LoanService, private user: UserService, private router: Router) {
    this.translate.use('pt')
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
    const subscription = this.loanService.getLoanByEmail(this.user.getUserEmail()).subscribe((items) => {
      const data = items.data
      this.loans = data
      this.haveLoan = this.loans.length == 1 ? true : false;
      this.haveLoans = this.loans.length > 1 ? true : false;
    })

    this.subscriptions.add(subscription)
  }

  loanDetails($event: Event, loanCod: string) {
    $event.preventDefault()
    this.router.navigate([`/loan-detail/${loanCod}`]);
  }


  redirectToAbout($event: Event) {
    $event.preventDefault()
    this.router.navigate([`/about`])
  }

}

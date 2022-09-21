import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import ILoan from 'src/app/core/models/loan.model';
import { LoanService } from 'src/app/core/services/loan.service';

@Component({
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit, OnDestroy {

  loanCod = ''
  loan: ILoan = {}

  readonly subscriptions = new Subscription()

  constructor(public route: ActivatedRoute, private loanService: LoanService) {
    this.loanCod = this.route.snapshot.paramMap.get('cod') ?? '';
  }

  ngOnInit(): void {
    const subscription = this.loanService.getLoanByCod(this.loanCod).subscribe({
      next: (item) => {

        this.loan = item.data
        this.subscriptions.add(subscription)
      },
      error: (err) => {
        console.log(err)
        this.subscriptions.add(subscription)
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()

  }

}

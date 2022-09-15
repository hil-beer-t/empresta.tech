import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {

  loanCod = ''

  constructor(public route: ActivatedRoute,) {
    this.loanCod = this.route.snapshot.paramMap.get('cod') ?? '';
  }

  ngOnInit(): void {
  }

}

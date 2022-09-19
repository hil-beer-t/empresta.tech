import { LoanService } from 'src/app/core/services/loan.service';
import { TokenService } from './../../../core/services/token.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loan: LoanService) { }

  ngOnInit(): void {

  }

}

import { UserService } from 'src/app/core/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IUser from 'src/app/core/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit, OnDestroy {

  userEmail: string;
  user: IUser = {
    cpf: '',
    phoneNumber: '',
    income: 0,
    name: '',
    email: ''
  }

  readonly subscriptions = new Subscription()


  constructor(public route: ActivatedRoute, private userService: UserService) {
    this.userEmail = this.userService.getUserEmail()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()

  }

  ngOnInit(): void {
    const subscription = this.userService.getUserByEmail(this.userEmail).subscribe({
      next: (item) => {

        this.user = item.data
        this.subscriptions.add(subscription)
      },
      error: (err) => {
        console.log(err)
        this.subscriptions.add(subscription)
      }
    })
  }

}

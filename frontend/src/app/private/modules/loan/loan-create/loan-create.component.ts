import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import ILoan from 'src/app/core/models/loan.model';
import { LoanService } from 'src/app/core/services/loan.service';
import { ModalService } from 'src/app/public/services/modal.service';

@Component({
  selector: 'app-loan-create',
  templateUrl: './loan-create.component.html',
  styleUrls: ['./loan-create.component.css']
})
export class LoanCreateComponent implements OnInit, OnInit, OnDestroy {

  maxDate: string;
  minDate: string;

  // colors
  red = 'rgb(248 113 113)'
  green = 'rgb(74 222 128)'
  blue = 'rgb(34 211 238)'

  // deny button while submitting
  inSubmission = false

  // --- alert properties ---
  showAlert = false
  alertMsg = 'Please wait! Updating clip'
  alertColor = this.blue
  // --- alert properties ---

  constructor(private modal: ModalService, private loan: LoanService) {

    this.maxDate = maxDate()
    this.minDate = minDate()

  }

  value = new FormControl('' as string, {
    validators: [Validators.required,
    Validators.min(0),
    Validators.max(1000000)],
    nonNullable: true,
  });

  intervals = new FormControl('', {
    validators: [Validators.required, Validators.min(0),
    Validators.max(72)],
    nonNullable: true,
  });

  initialDate = new FormControl('' as string, {
    validators: [Validators.required],
    nonNullable: true,
  });

  loanForm = new FormGroup({
    value: this.value,
    intervals: this.intervals,
    initialDate: this.initialDate
  });


  ngOnDestroy(): void {
    this.modal.unregister('createLoan')
  }

  ngOnInit(): void {
    this.modal.register('createLoan')
  }

  submit() {
    const str = this.loanForm.value.initialDate
    const date = new Date(str ?? '').toLocaleString('pt-br', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })

    this.showAlert = true;
    this.alertColor = this.blue;
    this.alertMsg = 'Por favor, aguarde! Estamos enviando seu pedido.';
    this.inSubmission = true;

    const subscription = this.loan.createLoan(this.loanForm.value,
      '2').subscribe({
        next: (item) => {
          this.alertMsg = 'Enviado com sucesso!'
          this.alertColor = this.green

          const token = JSON.parse(JSON.stringify(item)).access_token
          localStorage.setItem('access_token', token)
          console.log(localStorage.getItem('access_token'))
        },
        error: (err) => {
          this.alertMsg = 'Você já possui um empréstimo em andamento.'
          this.alertColor = this.red

          this.inSubmission = false
          console.log(err)
        }
      })
  }
}

function maxDate() {
  //Display Only Date till today //
  var dtToday = new Date();
  var month = dtToday.getMonth() + 4 + '';     // getMonth() is zero-based
  var day = dtToday.getDate() + '';
  var year = dtToday.getFullYear();
  if (parseInt(month) < 10)
    month = '0' + month.toString();
  if (parseInt(day) < 10)
    day = '0' + day.toString();

  const maxDate = year + '-' + month + '-' + day;

  return maxDate
}

function minDate() {
  //Display Only Date till today //
  var dtToday = new Date();
  var month = dtToday.getMonth() + 1 + '';     // getMonth() is zero-based
  var day = dtToday.getDate() + '';
  var year = dtToday.getFullYear();
  if (parseInt(month) < 10)
    month = '0' + month.toString();
  if (parseInt(day) < 10)
    day = '0' + day.toString();

  const minDate = year + '-' + month + '-' + day;

  return minDate
}


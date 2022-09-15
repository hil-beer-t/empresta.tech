import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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


  value = new FormControl('', {
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

  initialDate = new FormControl('', {
    validators: [Validators.required],
    nonNullable: true,
  });

  loanForm = new FormGroup({
    value: this.value,
    intervals: this.intervals,
    initialDate: this.initialDate
  });

  constructor(private modal: ModalService) {
    this.maxDate = maxDate()
    this.minDate = minDate()
  }

  ngOnDestroy(): void {
      this.modal.unregister('createLoan')
  }

  ngOnInit(): void {
      this.modal.register('createLoan')
  }

  async submit(){
    const str = this.loanForm.value.initialDate
    const date = new Date(str ?? '').toLocaleString('pt-br',{
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })

    // this.showAlert = true;
    // this.alertColor = this.blue;
    // this.alertMsg = 'Please wait! Your clip is being updated.';
    // this.inSubmission = true;

    // try{
    //   await this.clipService.updateClip(this.clipId.value ?? 'Video', this.title.value)
    // }
    // catch(e) {
    //   this.inSubmission = false
    //   this.alertColor = this.red
    //   this.alertMsg = 'Something went wrong. Try again later.'
    //   return
    // }

    // this.activeClip.title = this.title.value
    // this.update.emit(this.activeClip)

    // this.inSubmission = false
    // this.alertColor = this.green;
    // this.alertMsg = 'Success';
    console.log(this.loanForm.value)
    console.log(date)
    this.modal.toggleModal('createLoan')

  }
}

function maxDate() {
   //Display Only Date till today //
   var dtToday = new Date();
   var month = dtToday.getMonth() + 4 + '';     // getMonth() is zero-based
   var day = dtToday.getDate() + '';
   var year = dtToday.getFullYear();
   if(parseInt(month) < 10)
       month = '0' + month.toString();
   if(parseInt(day) < 10)
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
  if(parseInt(month) < 10)
      month = '0' + month.toString();
  if(parseInt(day) < 10)
      day = '0' + day.toString();

  const minDate = year + '-' + month + '-' + day;

  return minDate
}


import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css']
})
export class NumberInputComponent implements OnInit {

  @Input() control: FormControl = new FormControl
  @Input() placeholder = ''
  @Input() prefix = ''

  constructor() { }

  ngOnInit(): void {
  }

}

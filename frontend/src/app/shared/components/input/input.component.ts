import { UntypedFormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() control: UntypedFormControl = new UntypedFormControl
  @Input() type = 'text'
  @Input() placeholder = ''
  @Input() format = ''
  @Input() min = ''
  @Input() max = ''

  constructor() { }

  ngOnInit(): void {
  }

}

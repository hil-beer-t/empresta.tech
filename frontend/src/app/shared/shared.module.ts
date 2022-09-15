import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { InputComponent } from './components/input/input.component';
import { TabComponent } from './components/tab/tab.component';
import { TabsContainerComponent } from './components/tabs-container/tabs-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { NgxMaskModule } from 'ngx-mask';
import { NumberInputComponent } from './components/number-input/number-input.component';

@NgModule({
  declarations: [
    ModalComponent,
    TabsContainerComponent,
    TabComponent,
    InputComponent,
    AlertComponent,
    NumberInputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // prevent duplication
    NgxMaskModule.forRoot()
  ],
  exports: [
    ModalComponent,
    TabsContainerComponent,
    TabComponent,
    InputComponent,
    AlertComponent,
    NumberInputComponent,
  ]
})
export class SharedModule { }

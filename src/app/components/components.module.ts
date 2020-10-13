import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContainerComponent } from './main-container/main-container.component';

@NgModule({
  declarations: [
    MainContainerComponent
  ],
  exports: [
    MainContainerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }

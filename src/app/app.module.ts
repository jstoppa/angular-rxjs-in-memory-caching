import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ContainerComponent } from './container.component';
import { PresentationlComponent } from './presentational.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule],
  declarations: [ ContainerComponent, PresentationlComponent],
  bootstrap:    [ ContainerComponent ]
})
export class AppModule { }

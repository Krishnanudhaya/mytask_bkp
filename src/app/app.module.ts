import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { DynamicFormCreationComponent } from './dynamic-form-creation/dynamic-form-creation.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomDatePipe } from './CustomDatePipe';
@NgModule({
  declarations: [
    AppComponent,
     DynamicFormCreationComponent,
    CustomDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

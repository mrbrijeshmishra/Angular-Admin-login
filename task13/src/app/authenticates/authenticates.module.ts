import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatesRoutingModule } from './authenticates-routing.module';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpsignupComponent } from './otpsignup/otpsignup.component';


@NgModule({
  declarations: [
    FormComponent,
    OtpsignupComponent
  ],
  imports: [
    CommonModule,
    AuthenticatesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthenticatesModule { }

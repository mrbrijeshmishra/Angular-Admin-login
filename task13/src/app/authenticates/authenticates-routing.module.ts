import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { OtpsignupComponent } from './otpsignup/otpsignup.component';

const routes: Routes = [
  {
    path:"",
    component:FormComponent
  },
  {
    path:"otpsignup",
    component:OtpsignupComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatesRoutingModule { }

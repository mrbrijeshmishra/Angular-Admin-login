import { Component } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { matchpassword } from './matchpasswaord.validator';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable, forkJoin } from 'rxjs';
import { ApiMethod, AuthEndPoints } from 'src/app/constant/api-constant';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  title = "ONGC Dummy";
  signUpForm: FormGroup;
  Category: any;
  categoryReceived: any;
  subCategory: any;
  subUser: any;
  subCategoryReceived: any;
  showPassword: boolean;
  jsondata: any = {
    catid: null
  };
  tokenNo:any;
  newmember:any;

  constructor(private userService: HttpService,
    private recaptchaV3Service: ReCaptchaV3Service , private router:Router) {
    this.signUpForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      mobileno: new FormControl('', [Validators.required,Validators.pattern("[6-9]{1}[0-9]{9}")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      orgname: new FormControl('', [Validators.required]),
      user_category_id: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.min(10)]),
      password_confirmation: new FormControl('', [Validators.required]),
      user_subcategory_id: new FormControl(''),
    },
      {
        validators: matchpassword
      }
    );

    this.showPassword = false;

    // Api fetching of member
    this.userService.requestCall(AuthEndPoints.REGISTER_USER, ApiMethod.POST).subscribe(data => {
      this.Category = data;
      // console.log(this.Category);
      this.categoryReceived = this.Category.data;
      // console.log(this.categoryReceived);
    });
    
    this.requestDataFromMultipleSources().subscribe((responseList) => {
      console.log('responseList')
      console.log(responseList[0])
      this.tokenNo=responseList[0]
    });
  }


  public requestDataFromMultipleSources(): Observable<any[]> {
    let response1 = this.recaptchaV3Service.execute("importantAction");
    return forkJoin([response1])
  }


  signUp() {
    if (this.signUpForm.valid) {
      let filterData = { ...this.signUpForm.value, tokenNo:this.tokenNo };
      console.log(filterData);

      this.userService.requestCall(AuthEndPoints.postData, ApiMethod.POST, filterData)
        .subscribe((response: any) => {
          console.log("Done");
          
          // Extract relevant data from the response
          const { description, reference, otp_expiry_in_sec } = response;
          sessionStorage.setItem('description',description);
          sessionStorage.setItem('reference',reference);
          sessionStorage.setItem('otp_expiry_in_sec',otp_expiry_in_sec);

          // Redirect with response data as query parameters
          this.router.navigate(['otpsignup'])

          // Reset form and toggle password visibility
          this.signUpForm.reset();
          this.showPassword = false;
        });
    } else {
      alert("Form Invalid");
    }
  }



  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  clickMethod(id: any) {
    this.jsondata.catid = id;
    this.subUser = id;
    console.log(this.subUser)
    if (this.jsondata.catid === 3) {
      this.userService.requestCall(AuthEndPoints.SubUserCategory, ApiMethod.POST, this.jsondata)
        .subscribe((result: any) => this.subCategoryReceived = result?.data)
    }
  }

  get first_name() {
    return this.signUpForm.get('first_name')
  }
  get last_name() {
    return this.signUpForm.get('last_name')
  }
  get mobileno() {
    return this.signUpForm.get('mobileno')
  }
  get email() {
    return this.signUpForm.get('email')
  }
  get orgname() {
    return this.signUpForm.get('orgname')
  }
  get show() {
    return this.signUpForm.get('show')
  }
  get password() {
    return this.signUpForm.get('password')
  }
  get password_confirmation() {
    return this.signUpForm.get('password_confirmation')
  }
}




import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { ApiMethod, AuthEndPoints } from 'src/app/constant/api-constant';

@Component({
  selector: 'app-otpsignup',
  templateUrl: './otpsignup.component.html',
  styleUrls: ['./otpsignup.component.scss']
})
export class OtpsignupComponent implements OnInit {
  otpFields: FormGroup;
  emailotp: any;
  smsotp: any;
  description?: string | any;
  refid?: string | any;
  otpExpiry?: number | any;

  constructor(private userService: HttpService) {
    this.otpFields = new FormGroup({
      otp1: new FormControl("", [Validators.required]),
      otp2: new FormControl("", [Validators.required]),
      otp3: new FormControl("", [Validators.required]),
      otp4: new FormControl("", [Validators.required]),
      otp5: new FormControl("", [Validators.required]),
      otp6: new FormControl("", [Validators.required]),
      otp7: new FormControl("", [Validators.required]),
      otp8: new FormControl("", [Validators.required]),
      otp9: new FormControl("", [Validators.required]),
      otp10: new FormControl("", [Validators.required]),
      otp11: new FormControl("", [Validators.required]),
      otp12: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    // Fetching data from route parameters
      this.description = sessionStorage.getItem('description');
      this.refid = sessionStorage.getItem('reference');
      this.otpExpiry = sessionStorage.getItem('otp_expiry_in_sec'); // Convert to number if needed

      // You can now use this data in your component
      console.log('Description:', this.description);
      console.log('Reference:', this.refid);
      console.log('OTP Expiry (seconds):', this.otpExpiry);
  }

  otpSubmit() {
    if (this.otpFields.valid) {
      console.log("Very Nice");
      console.log(this.otpFields.value);

      // const emailo = this.otpFields.value;
      this.emailotp = `${this.otpFields.value.otp1}${this.otpFields.value.otp2}${this.otpFields.value.otp3}${this.otpFields.value.otp4}${this.otpFields.value.otp5}${this.otpFields.value.otp6}`;

      // this.emailotp = emailo.otp1 + emailo.otp2 + emailo.otp3 + emailo.otp4 + emailo.otp5 + emailo.otp6

      this.smsotp = `${this.otpFields.value.otp7}${this.otpFields.value.otp8}${this.otpFields.value.otp9}${this.otpFields.value.otp10}${this.otpFields.value.otp11}${this.otpFields.value.otp12}`;
      console.log(this.emailotp);
      console.log(this.smsotp);

      const otpData = { emailotp: this.emailotp, smsotp: this.smsotp, refid: this.refid}
      console.log(otpData)

      this.userService.requestCall(AuthEndPoints.otpVerify, ApiMethod.POST, otpData)
        .subscribe(( ) => {
          
        })
      this.otpFields.reset();
    }
  }
}

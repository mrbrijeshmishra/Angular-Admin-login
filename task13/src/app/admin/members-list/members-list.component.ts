import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiMethod, AuthEndPoints } from 'src/app/constant/api-constant';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit {

  userData: any;
  receivedData: any;
  pagination: any;
  Category: any;
  categoryReceived: any;
  subCategoryReceived: any;
  total: any;
  subCategory: any;
  subcatid: number = 1;
  jsondata: any = {
    catid: null
  };
  searchData = {
    from_date: "",
    kyc_status: "",
    pagenumber: 1,
    recordperpage: "10",
    search: "",
    sub_user_type: "",
    subscription_id: "",
    to_date: "",
    user_type: ""
  }
  subCatid: any;
  // filterdata: FormGroup;
  from_date: string = "";
  to_date: string = "";
  kyc_status: string = "";
  user_type: string = "";
  sub_user_type: string = "";
  subscription_plan: string = "";
  searchValue: string = "";

  constructor(private userService: HttpService) {
    // this.filterdata = new FormGroup({
    //   from_date: new FormControl(""),
    //   to_date: new FormControl(""),
    //   kyc_status: new FormControl(""),
    //   user_type: new FormControl(""),
    //   sub_user_type: new FormControl(""),
    //   subscription_plan: new FormControl(""),
    // });

  }

  ngOnInit(): void {
    this.firstData();
    this.userService.requestCall(AuthEndPoints.REGISTER_USER, ApiMethod.POST).subscribe(data => {
      this.Category = data;
      this.categoryReceived = this.Category.data;
    });
  }

  firstData(): void {
    this.userService.requestCall(AuthEndPoints.getUser, ApiMethod.POST)
      .subscribe((data) => {
        this.userData = data;
        // console.log(this.userData);
        this.pagination = this.userData.pagination;
        this.total = this.pagination.total;
        // this.pages = this.pagination.pages;
        // console.log(this.pagination);
        this.receivedData = this.userData.data;
        // console.log(this.receivedData);
        // console.log(this.pages, this.total);
      });
  }

  subUser(cattype: any) {
    const numericValue = parseInt(cattype, 10)
    this.subCatid = numericValue;
    this.jsondata.catid = 3;
    // console.log(typeof(numericValue));
    if (this.subCatid === 3) {
      this.userService.requestCall(AuthEndPoints.SubUserCategory, ApiMethod.POST, this.jsondata)
        .subscribe((result: any) => this.subCategoryReceived = result?.data)
    }
  }

  onSearch(){
    // console.log(this.searchValue);
    this.searchData.search = this.searchValue;
    // console.log(this.searchData)
    this.userService.requestCall(AuthEndPoints.getUser, ApiMethod.POST, this.searchData)
      .subscribe((data) => {
        this.userData = data;
        // console.log(data)
        this.pagination = this.userData.pagination;
        this.total = this.pagination.total;
        // this.pages = this.pagination.pages;
        console.log(this.pagination);
        this.receivedData = this.userData.data;
        // console.log(this.receivedData);
        // console.log(this.pages, this.total);
      });
  }


  pageSize(value: any) {
    this.searchData.recordperpage = value;
    this.searchData.pagenumber = 1;
    this.userService.requestCall(AuthEndPoints.getUser, ApiMethod.POST, this.searchData)
      .subscribe((data) => {
        this.userData = data;
        this.receivedData = this.userData.data;
      });
  }


  pageChange(pageNumber: number): void {
    this.searchData.pagenumber = pageNumber;
    this.userService.requestCall(AuthEndPoints.getUser, ApiMethod.POST, this.searchData)
      .subscribe((data) => {
        this.userData = data;
        this.receivedData = this.userData.data;
        console.log(data);
      });
  }

  filterRecord() {
    this.searchData.from_date = this.from_date;
    this.searchData.to_date = this.to_date;
    this.searchData.kyc_status = this.kyc_status;
    this.searchData.user_type = this.user_type;
    this.searchData.sub_user_type = this.sub_user_type;
    this.searchData.subscription_id = this.subscription_plan;
    // console.log(this.from_date, this.to_date, this.kyc_status, this.user_type, this.sub_user_type, this.subscription_plan);
    // console.log("Button clicked")
    this.userService.requestCall(AuthEndPoints.getUser, ApiMethod.POST, this.searchData)
      .subscribe((data) => {
        this.userData = data;
        // console.log(data)
        this.pagination = this.userData.pagination;
        this.total = this.pagination.total;
        // this.pages = this.pagination.pages;
        console.log(this.pagination);
        this.receivedData = this.userData.data;
        // console.log(this.receivedData);
        // console.log(this.pages, this.total);
      });
  }

  resetPage() {
    window.location.reload();
}

}

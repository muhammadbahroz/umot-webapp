import { SearchService } from './../../../services/search.service';
import { UserInfo } from './../../../classes/user-info';
import { User } from './../../../interface/user';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-enter-details',
  templateUrl: './enter-details.component.html',
  styleUrls: ['./enter-details.component.scss'],
})
export class EnterDetailsComponent {

  searchValue: string;
  check:boolean = false;
  emailPassword: any;
  user: User = new UserInfo();
  constructor(private router: Router,
    private route: ActivatedRoute,
    private SearchService: SearchService,
    private datePipe: DatePipe) {
    this.func();
    // console.log("username: ", this.user.email);
    // console.log("password: ", this.user.password);
  }

  func()
  {
    console.log("Received Json", this.route.params.subscribe(async (params: any) => {this.emailPassword = await params;}));
  }


  signupForm: FormGroup = new FormGroup({
    fullname: new FormControl('', [
      Validators.required
    ]),
    gender: new FormControl('', [
      Validators.required
    ]),
    dob: new FormControl('', [
      Validators.required
    ]),
    numberOfChildren: new FormControl('', [
      Validators.required
    ]),
    country: new FormControl('', [
      Validators.required
    ]),
    postcode: new FormControl('', [
      Validators.required
    ])
    
  });

  information: boolean = false;
  
  informationUpdate()
  {
    if(this.information != false){
      this.information = false;
      // console.log("when false ",this.information);
    }
    else{
      this.information = true;
      // console.log("on click",this.information);
    }
  }

  onClick()
  {
    console.log("hello there");
    this.router.navigate(['home']);
  }


  async onSubmit() {
    this.user.email = this.emailPassword.email;
    this.user.password = this.emailPassword.password;
    this.user.gender = this.signupForm.get("gender").value;
    this.user.username = this.signupForm.get("fullname").value;
    this.user.dob = this.datePipe.transform(this.signupForm.get("dob").value, 'yyyy-MM-dd');
    this.user.dp_url = "null";
    this.user.postcode = this.signupForm.get("postcode").value;
    this.user.num_of_children = parseInt( this.signupForm.get("numberOfChildren").value);
    this.user.country = this.signupForm.get("country").value;
    this.user.platform_config = "Netflix";
    this.user.medium_config = "mobile";

    // console.log("gender",this.signupForm.get("gender").value);
    // console.log("fullname",this.signupForm.get("fullname").value);
    // console.log("dob",this.signupForm.get("dob").value);
    // console.log("postcode",this.signupForm.get("postcode").value);
    // console.log("numberOfChildren",this.signupForm.get("numberOfChildren").value);
    // console.log("country",this.signupForm.get("country").value);
    // console.log("complete json",this.signupForm.value);

    // console.log("emailPassword",this.emailPassword);
    console.log("complete user json: ", this.user);

    console.log(this.SearchService.createNewUser(this.user).subscribe((result: any) => {
      console.log( "result from upload: ",result)
      ;}
      ));

    this.router.navigate(['signup/question-page']);
  }
}

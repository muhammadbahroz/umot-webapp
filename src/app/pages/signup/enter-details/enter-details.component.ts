import { UserUpdate } from './../../../classes/user-update';
import { MediumConfig } from './../../../classes/medium-config';
import { MediumConfigInterface } from './../../../interface/medium-config-interface';
import { PlatformConfig } from './../../../classes/platform-config';
import { PlatformConfigInterface } from './../../../interface/platform-config-interface';
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
  // user: User = new UserInfo();
  user: UserUpdate;
  platform_config: PlatformConfigInterface = new PlatformConfig();
  medium_config: MediumConfigInterface = new MediumConfig();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private SearchService: SearchService,
    private datePipe: DatePipe) {
    // this.func();
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

  platformSelection(key: number){
    if (key === 1) {
      this.platform_config.hbo = true;
      console.log(JSON.stringify(this.platform_config));
    }else if (key === 2) {
      this.platform_config.netflix = true;
      console.log(JSON.stringify(this.platform_config));
    }else if (key === 3) {
      this.platform_config.amazonPrimeVideo = true;
      console.log(JSON.stringify(this.platform_config));
    }else if (key === 4) {
      this.platform_config.appleTV = true;
      console.log(JSON.stringify(this.platform_config));
    }else if (key === 5) {
      this.platform_config.movieStarPlus = true;
      console.log(JSON.stringify(this.platform_config));
    }else if (key === 6) {
      this.platform_config.disneyPlus = true;
      console.log(JSON.stringify(this.platform_config));
    }else if (key === 7) {
      this.platform_config.filmIn = true;
      console.log(JSON.stringify(this.platform_config));
    }else if (key === 8) {
      this.platform_config.googlePlay = true;
      console.log(JSON.stringify(this.platform_config));
    }
  }

  mediumSelection(key: number){
    if (key === 1) {
      this.medium_config.desktop = true;
      console.log(JSON.stringify(this.medium_config));
    }else if (key === 2) {
      this.medium_config.tablet = true;
      console.log(JSON.stringify(this.medium_config));
    }else if (key === 3) {
      this.medium_config.mobile = true;
      console.log(JSON.stringify(this.medium_config));
    }else if (key === 4) {
      this.medium_config.chromecast = true;
      console.log(JSON.stringify(this.medium_config));
    }else if (key === 5) {
      this.medium_config.projector = true;
      console.log(JSON.stringify(this.medium_config));
    }else if (key === 6) {
      this.medium_config.smartTV = true;
      console.log(JSON.stringify(this.medium_config));
    }else if (key === 7) {
      this.medium_config.firetv = true;
      console.log(JSON.stringify(this.medium_config));
    }
  }

  async onSubmit() {
    this.user = new UserUpdate(
      this.signupForm.get("fullname").value,
      this.signupForm.get("gender").value,
      this.datePipe.transform(this.signupForm.get("dob").value, 'yyyy-MM-dd'),
      parseInt( this.signupForm.get("numberOfChildren").value),
      this.signupForm.get("country").value,
      this.signupForm.get("postcode").value,
      "/assets/actors/person.png",
      JSON.stringify(this.platform_config),
      JSON.stringify(this.medium_config)
      );

    // console.log("gender",this.signupForm.get("gender").value);
    // console.log("fullname",this.signupForm.get("fullname").value);
    // console.log("dob",this.signupForm.get("dob").value);
    // console.log("postcode",this.signupForm.get("postcode").value);
    // console.log("numberOfChildren",this.signupForm.get("numberOfChildren").value);
    // console.log("country",this.signupForm.get("country").value);
    // console.log("complete json",this.signupForm.value);

    // console.log("emailPassword",this.emailPassword);
    console.log("complete user json: ", this.user);

    // THIS IS THE PART THAT CALLS USER-UPDATE API
    console.log(this.SearchService.updateUser(this.user).subscribe((result: any) => {
      console.log( "result from upload: ",result);
      this.router.navigate(['signup/question-page']);
    }));
  }
}

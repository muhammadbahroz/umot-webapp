import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchService } from './../../../services/search.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  loginFailure: boolean = false;
  tryAgain: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor(private SearchService: SearchService,private router: Router) { }

  ngOnInit() {}

  check(){
    console.log("test");
    this.loginFailure = false;
    this.tryAgain = false;
  }
  async onSubmit() {
    console.log(this.SearchService.login(this.loginForm.value).subscribe((result: any) => {
      console.log( "result from upload: ",result )
      ;if(this.loginFailure === false && this.tryAgain=== false){
        
        this.router.navigate(['signup/question-page']);
        // this.router.navigate(['/error']);
        localStorage.setItem("key",JSON.stringify(result)); // this saves the bearer token into local storage
      };},(error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          this.tryAgain = true;
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          this.loginFailure = true;
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }}
      ));
      // console.log(this.loginForm.value);
  }
}

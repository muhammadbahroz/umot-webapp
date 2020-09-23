import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchService } from './../../services/search.service';
import { UserInfo } from './../../classes/user-info';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
  });

  constructor(private router: Router,
    private SearchService: SearchService) { }

  ngOnInit() {
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  check() {
    this.userExists = false;
    this.tryAgain = false;
  }

  userExists: boolean = false;
  tryAgain: boolean = false;
  user: UserInfo; // This stores the current user email and password only, just to check whether the user already exists or not
  async onSubmit() {
    if (this.signupForm.get('email').value && this.signupForm.get('password').value) {
      this.user = new UserInfo()
      this.user.email = this.signupForm.get('email').value;
      this.user.password = this.signupForm.get('password').value;
      console.log("complete user json: ", this.user);
      // THIS IS THE PART THAT CALLS SIGNUP API
      console.log(this.SearchService.createNewUser(this.user).subscribe((result: any) => {
        console.log("result from upload: ", result);
        localStorage.setItem("key", JSON.stringify(result)); // this saves the bearer token into local storage
        this.router.navigate(['signup/enter-details']);
      }, async (error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          this.tryAgain = true;
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          if (error.error.message.startsWith("User already exists.")) {
            this.userExists = true;
            await this.delay(900);
            this.router.navigate(['/login/signin']);
          }
          else {
            this.tryAgain = true;
            console.error('An error occurred:', error.error.message);
          }
          console.error(
            `${error.error.message}, \n` +
            `Backend returned code ${error.status}`);
        }
      }));
    }
  }
}

import { SearchService } from './../../../services/search.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

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

  constructor(private SearchService: SearchService) { }

  ngOnInit() {}

  async onSubmit() {
    console.log(this.SearchService.login(this.loginForm.value).subscribe((result: any) => {
      console.log( "result from upload: ",result)
      ;}
      ));

      console.log(this.loginForm.value);
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  searchValue: string;

  constructor(private router: Router) {}

  goToSearch(){
    this.router.navigate(['home/menu-search', this.searchValue]);
  }

  // onClick()
  // {
  //   console.log("hello there");
  //   this.router.navigate(['home']);
  // }
}

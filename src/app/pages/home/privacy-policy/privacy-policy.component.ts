import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {
  searchValue: string;

  constructor(private router: Router) {}

  goToSearch(){
    this.router.navigate(['home/menu-search', this.searchValue]);
  }

  ngOnInit() {}

}

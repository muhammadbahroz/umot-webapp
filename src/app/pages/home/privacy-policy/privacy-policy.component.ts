import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private router: Router) {}

  search(search: string){
    this.router.navigate(['home/menu-search', search]);
  }
  ngOnInit() {}

}

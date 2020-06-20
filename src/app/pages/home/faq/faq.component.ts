import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  searchValue: string;

  constructor(private router: Router) {}

  goToSearch(){
    this.router.navigate(['home/menu-search', this.searchValue]);
  }


  ngOnInit() {}

}

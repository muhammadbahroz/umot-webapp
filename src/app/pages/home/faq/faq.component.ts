import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {

  constructor(private router: Router) {}

  search(search: string){
    this.router.navigate(['home/menu-search', search]);
  }

  ngOnInit() {}

}

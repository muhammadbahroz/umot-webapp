import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {

  searchValue: string;

  constructor(private router: Router) {}

  goToSearch(){
    this.router.navigate(['home/menu-search', this.searchValue]);
  }

  ngOnInit() {}

}

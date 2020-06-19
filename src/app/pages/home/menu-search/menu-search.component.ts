import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-menu-search',
  templateUrl: './menu-search.component.html',
  styleUrls: ['./menu-search.component.scss'],
})
export class MenuSearchComponent implements OnInit {

  constructor(private searchService: SearchService) { }
  movies: any;
  ngOnInit() {
    this.search('hello');
  }

  search(input: string){
    this.searchService.sendGETRequestWithParameters(input).subscribe((result: any) => {
      this.movies = JSON.parse(result.data);
      this.movies.forEach(movie => {
        movie.img = 'https://image.tmdb.org/t/p/w500' + movie.img;
      });
      console.log(this.movies);
    });
  }

}
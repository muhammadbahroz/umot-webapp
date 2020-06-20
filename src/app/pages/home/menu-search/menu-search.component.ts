import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-search',
  templateUrl: './menu-search.component.html',
  styleUrls: ['./menu-search.component.scss'],
})
export class MenuSearchComponent implements OnInit {
  searchValue: string;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute) {
      this.searchValue = this.route.snapshot.paramMap.get('search');
    }

  movies: any;
  ngOnInit() {
    this.search();
  }

  search(){
    this.searchService.sendGETRequestWithParameters(this.searchValue).subscribe((result: any) => {
      this.movies = JSON.parse(result.data);
      this.movies = this.movies.slice(0, 10);
      this.movies.forEach(movie => {
        const PROVIDERS_CHECK = [false, false, false, false];
        movie.img = 'https://image.tmdb.org/t/p/w500' + movie.img;
        movie.providers.forEach(provider => {
          if (provider.provider_name === 'HBO Now' || provider.provider_name === 'HBO Go'){
            PROVIDERS_CHECK[0] = true;
          }
          if (provider.provider_name === 'Netflix' || provider.provider_name === 'Netflix Kids'){
            PROVIDERS_CHECK[1] = true;
          }
          if (provider.provider_name === 'Amazon Video' || provider.provider_name === 'Amazon Prime Video'){
            PROVIDERS_CHECK[2] = true;
          }
          if (provider.provider_name === 'Apple iTunes' || provider.provider_name === 'Apple TV Plus'){
            PROVIDERS_CHECK[3] = true;
          }
        });
        movie.providers = PROVIDERS_CHECK;
      });
      console.log(this.movies);

    });
  }

}

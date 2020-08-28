import { SearchService } from './../../../services/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-premium-recommendation-page',
  templateUrl: './premium-recommendation-page.component.html',
  styleUrls: ['./premium-recommendation-page.component.scss'],
})
export class PremiumRecommendationPageComponent implements OnInit {

  searchValue: string;
  movieID: string;
  check:boolean = false;
  listOfRecommendations = [];
  constructor(private router: Router , private searchService: SearchService, private route: ActivatedRoute) {
      this.movieID = this.route.snapshot.paramMap.get('id');
      this.movieClick();
      this.listOfRecommendations = JSON.parse( localStorage.getItem('listOfRecommendation'))
      console.log("listOfRecommendation: ", this.listOfRecommendations);
      console.log("fiest recommendation: ", this.listOfRecommendations[0]);
    }

  goToSearch(){
    this.router.navigate(['premium/premium-menu-search', this.searchValue]);
  }

  ngOnInit() {
  }


  movies: any;

  search(){
    if (this.searchValue != "") {
      this.searchService.search(this.searchValue).subscribe((result: any) => {
        this.movies = JSON.parse(result.data);
        this.movies = this.movies.slice(0, 2);
        this.movies.forEach(movie => {
          movie.img = 'https://image.tmdb.org/t/p/w500' + movie.img;
        });
        if(this.searchValue !=  "")
        {
          this.check=true;
        }
        else{
          this.check=false;
        }
  
        // console.log(this.movies);  
      });
    }else{
      this.check = false;
    }
    
  }

  openMovieClicked(movieID: string){

    this.router.navigate(['premium/premium-movie', movieID]);

    // this.searchService.movie(movieID).subscribe((result: any) => {
    //   this.movieDetail = JSON.parse(result.data);
    //   // this.movies = this.movies.slice(0, 10);
    //   console.log(this.movieDetail);
    // });
  }

  movieDetail: any = null;
  providersArray: string[] = [];
  movieClick(){
    this.searchService.movie(this.movieID).subscribe((result: any) => {
      this.movieDetail = JSON.parse(result.data);
      // this.movieDetail = this.movieDetail.slice(0, 10);
      this.movieDetail.background_img = 'https://image.tmdb.org/t/p/w1280' + this.movieDetail.background_img;
      console.log("runtime: " + this.movieDetail.runtime);
      console.log("release date: " + this.movieDetail.release_date);
      console.log("background image: " + this.movieDetail.background_img);
      this.movieDetail.poster_img = 'https://image.tmdb.org/t/p/w500' + this.movieDetail.poster_img; 
      console.log("poster: " + this.movieDetail.poster_img);
      console.log("title: " + this.movieDetail.title);
      this.movieDetail.credits.cast = this.movieDetail.credits.cast.slice(0,4);
      this.movieDetail.credits.cast.forEach(person => {
        console.log("Actor Name: "+person.name);
        person.profile_path = 'https://image.tmdb.org/t/p/w500' + person.profile_path;
        console.log(person.profile_path);
      });
      
      const PROVIDERS_SET: Set<string> = new Set;
      this.movieDetail.providers.forEach(provider => {
        PROVIDERS_SET.add(provider.img);
      });
      PROVIDERS_SET.forEach( img => {
        this.providersArray.push(img);
      })
      this.movieDetail.providers = this.providersArray;
      // console.log("first provider image",this.movieDetail.providers[0]);
      // const PROVIDERS_CHECK = [false, false, false, false];
      // this.movieDetail.providers.forEach(provider => {
      //   if (provider.provider_name === 'HBO Now' || provider.provider_name === 'HBO Go'){
      //     PROVIDERS_CHECK[0] = true;
      //   }
      //   if (provider.provider_name === 'Netflix' || provider.provider_name === 'Netflix Kids'){
      //     PROVIDERS_CHECK[1] = true;
      //   }
      //   if (provider.provider_name === 'Amazon Video' || provider.provider_name === 'Amazon Prime Video'){
      //     PROVIDERS_CHECK[2] = true;
      //   }
      //   if (provider.provider_name === 'Apple iTunes' || provider.provider_name === 'Apple TV Plus'){
      //     PROVIDERS_CHECK[3] = true;
      //   }
      // });
      // this.movieDetail.providers = PROVIDERS_CHECK;
      console.log(this.movieDetail.providers);
      console.log("Synopsis: " + this.movieDetail.synopsis);
      this.movieDetail.videos = this.movieDetail.videos.slice(0,1);
      console.log(this.movieDetail.videos);
      this.movieDetail.videos = "https://www.youtube.com/watch?v=" + this.movieDetail.videos[0].key;
      console.log(this.movieDetail.videos);
      console.log(this.movieDetail);
    });
  }
}

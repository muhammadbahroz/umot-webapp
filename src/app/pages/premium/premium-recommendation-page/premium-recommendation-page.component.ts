import { Observable } from 'rxjs';
import { MovieInterface } from './../../../interface/movie-interface';
import { SearchService } from './../../../services/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/classes/movie';

@Component({
  selector: 'app-premium-recommendation-page',
  templateUrl: './premium-recommendation-page.component.html',
  styleUrls: ['./premium-recommendation-page.component.scss'],
})
export class PremiumRecommendationPageComponent implements OnInit {

  searchValue: string;
  movieID: string;
  check: boolean = false;
  listOfRecommendations = [];
  constructor(private router: Router, private searchService: SearchService, private route: ActivatedRoute) {
    this.movieID = this.route.snapshot.paramMap.get('id');
    this.movieClick();
    this.listOfRecommendations = JSON.parse(localStorage.getItem('listOfRecommendation'))
    // console.log("listOfRecommendation: ", this.listOfRecommendations);
    // console.log("fiest recommendation: ", this.listOfRecommendations[0]);

    // console.log("Entered getRecommendedMovieDetails with movieID: " + this.listOfRecommendations[1] + " with index: " + 0)
    this.getRecommendedMovieDetails(this.listOfRecommendations[this.listOfRecommendations.length - 1], 0);
    // console.log("Entered getRecommendedMovieDetails with movieID: " + this.listOfRecommendations[2] + " with index: " + 1)
    this.getRecommendedMovieDetails(this.listOfRecommendations[this.listOfRecommendations.length - 2], 1);
    // console.log("Entered getRecommendedMovieDetails with movieID: " + this.listOfRecommendations[3] + " with index: " + 2)
    this.getRecommendedMovieDetails(this.listOfRecommendations[this.listOfRecommendations.length - 3], 2);
  }


  recommendedMovieDetail: Movie[] = [];
  /**
   * this function get the given recommended movie details and save it's details
   * in an array called recommendedMovieDetail
   * @param movieID string, movie id of the movie to look for 
   * @param id number, position of the movie in the reommended list
   */
  async getRecommendedMovieDetails(movieID: string, id: number) {
    // console.log("get recommendtion started");
    this.searchService.movie(movieID).then(async (movie: Observable<MovieInterface>) => {
      movie.subscribe((m: any) => {
        // console.log("movie JSON got: ", m);
        console.log("data JSON", JSON.parse(m.data));
        this.recommendedMovieDetail.push(new Movie(m.statusCode, JSON.parse(m.data), m.message, m.success, movieID));
        console.log("movieID: ", movieID);
        console.log("movie Number: ", id);
        console.log("Movie Detail ", this.recommendedMovieDetail[id]);
      });
    });
    console.log("all movies details list: ", this.recommendedMovieDetail);
  }


  // recommendedMovieDetail: any = [];
  // recommendedProvidersArray: string[] = [];
  // /**
  //  * this function get the given recommended movie details and save it's details
  //  * in an array called recommendedMovieDetail
  //  * @param movieID string, movie id of the movie to look for 
  //  * @param id number, position of the movie in the reommended list
  //  */
  // async getRecommendedMovieDetails(movieID: string, id: number) {
  //   // console.log("get recommendtion started");
  //   this.searchService.movie(movieID).then(async (result: any) => {
  //     const test: any = await result;
  //     test.subscribe((u: any) => {
  //       console.log("ID OF MOVIE BEING LOOKED ON: " + movieID);
  //       console.log("NUMBER OF MOVIE BEING LOOKED ON: " + id);
  //       console.log("GOT RESULT: " + u);
  //       console.log("GOT RESULT.DATA AFTER PARSING: " + JSON.parse(u.data));
  //       this.recommendedMovieDetail.push(JSON.parse(u.data));
  //       console.log("recommended movie details Array: ", this.recommendedMovieDetail);
  //       // this.movieDetail = this.movieDetail.slice(0, 10);

  //       if (this.recommendedMovieDetail[id].background_img != null) {
  //         this.recommendedMovieDetail[id].background_img = 'https://image.tmdb.org/t/p/w1280' +
  //           this.recommendedMovieDetail[id].background_img;
  //         console.log("background image: " + this.recommendedMovieDetail[id].background_img);
  //       }

  //       // console.log("runtime: " + this.recommendedMovieDetail[id].runtime);
  //       // console.log("release date: " + this.recommendedMovieDetail[id].release_date);

  //       this.recommendedMovieDetail[id].poster_img = 'https://image.tmdb.org/t/p/w500' +
  //         this.recommendedMovieDetail[id].poster_img;

  //       console.log("poster: " + this.recommendedMovieDetail[id].poster_img);
  //       console.log("title: " + this.recommendedMovieDetail[id].title);

  //       // this.recommendedMovieDetail[id].credits.cast = this.recommendedMovieDetail[id].credits.cast.slice(0, 4);
  //       // this.recommendedMovieDetail[id].credits.cast.forEach(person => {
  //       //   console.log("Actor Name: " + person.name);
  //       //   person.profile_path = 'https://image.tmdb.org/t/p/w500' + person.profile_path;
  //       //   console.log("Person Profile img path: " + person.profile_path);
  //       // });

  // const PROVIDERS_SET: Set<string> = new Set;
  // this.recommendedMovieDetail[id].providers.forEach(provider => {
  //   PROVIDERS_SET.add(provider.img);
  // });
  // PROVIDERS_SET.forEach(img => {
  //   this.recommendedProvidersArray.push(img);
  // })
  // this.recommendedMovieDetail[id].providers = this.recommendedProvidersArray;
  //       // console.log("first provider image",this.movieDetail.providers[0]);
  //       // const PROVIDERS_CHECK = [false, false, false, false];
  //       // this.movieDetail.providers.forEach(provider => {
  //       //   if (provider.provider_name === 'HBO Now' || provider.provider_name === 'HBO Go'){
  //       //     PROVIDERS_CHECK[0] = true;
  //       //   }
  //       //   if (provider.provider_name === 'Netflix' || provider.provider_name === 'Netflix Kids'){
  //       //     PROVIDERS_CHECK[1] = true;
  //       //   }
  //       //   if (provider.provider_name === 'Amazon Video' || provider.provider_name === 'Amazon Prime Video'){
  //       //     PROVIDERS_CHECK[2] = true;
  //       //   }
  //       //   if (provider.provider_name === 'Apple iTunes' || provider.provider_name === 'Apple TV Plus'){
  //       //     PROVIDERS_CHECK[3] = true;
  //       //   }
  //       // });
  //       // this.movieDetail.providers = PROVIDERS_CHECK;

  //       console.log("PROVIDERS: " + this.recommendedMovieDetail[id].providers);
  //       // console.log("Synopsis: " + this.recommendedMovieDetail[id].synopsis);
  //       // this.recommendedMovieDetail[id].videos = this.recommendedMovieDetail[id].videos.slice(0, 1);
  //       // console.log(this.recommendedMovieDetail[id].videos);

  //       // console.log(this.recommendedMovieDetail[id].videos);
  //       console.log("COMPLETE PREPAIRED JSON: " + this.recommendedMovieDetail[id]);
  //     });
  //   });
  // }

  goToSearch() {
    this.router.navigate(['premium/premium-menu-search', this.searchValue]);
  }

  ngOnInit() {
  }


  movies: any;

  search() {
    if (this.searchValue != "") {
      this.searchService.search(this.searchValue).subscribe((result: any) => {
        this.movies = JSON.parse(result.data);
        this.movies = this.movies.slice(0, 2);
        this.movies.forEach(movie => {
          movie.img = 'https://image.tmdb.org/t/p/w500' + movie.img;
        });
        if (this.searchValue != "") {
          this.check = true;
        }
        else {
          this.check = false;
        }

        // console.log(this.movies);  
      });
    } else {
      this.check = false;
    }

  }

  /**
   * This function opens the movie that have been clicked for view Details
   * @param movieID This is the Id of the movie that have been cicked to open for view details
   */
  openMovieClicked(movieID: string) {
    this.router.navigate(['home/movie', movieID]);
  }

  movieDetail: Movie;
  providersArray: string[] = [];
  movieClick() {
    // console.log("get recommendtion started");
    this.searchService.movie(this.movieID).then(async (movie: Observable<MovieInterface>) => {
      movie.subscribe((m: any) => {
        // console.log("movie JSON got: ", m);
        // console.log("data JSON for first movie: ", JSON.parse(m.data));
        this.movieDetail = new Movie(m.statusCode, JSON.parse(m.data), m.message, m.success, this.movieID);
        // console.log("movieID of first movie: ", this.movieID);
        console.log("Movie Detail of first movie ", this.movieDetail);
      });
    });
    //////////////////  OLD CODE
    // this.searchService.movie(this.movieID).then((result: any) => {
    //   result.subscribe(u => {
    //     // console.log("got something: ", JSON.parse(JSON.stringify(u)));
    //     this.movieDetail = JSON.parse(u.data);
    //     // this.movieDetail = this.movieDetail.slice(0, 10);
    //     this.movieDetail.background_img = 'https://image.tmdb.org/t/p/w1280' + this.movieDetail.background_img;
    //     // console.log("runtime: " + this.movieDetail.runtime);
    //     // console.log("release date: " + this.movieDetail.release_date);
    //     // console.log("background image: " + this.movieDetail.background_img);
    //     this.movieDetail.poster_img = 'https://image.tmdb.org/t/p/w500' + this.movieDetail.poster_img;
    //     // console.log("poster: " + this.movieDetail.poster_img);
    //     // console.log("title: " + this.movieDetail.title);
    //     // this.movieDetail.credits.cast = this.movieDetail.credits.cast.slice(0, 4);
    //     // this.movieDetail.credits.cast.forEach(person => {
    //     //   console.log("Actor Name: " + person.name);
    //     //   person.profile_path = 'https://image.tmdb.org/t/p/w500' + person.profile_path;
    //     //   console.log(person.profile_path);
    //     // });

    //     const PROVIDERS_SET: Set<string> = new Set;
    //     this.movieDetail.providers.forEach(provider => {
    //       PROVIDERS_SET.add(provider.img);
    //     });
    //     PROVIDERS_SET.forEach(img => {
    //       this.providersArray.push(img);
    //     })
    //     this.movieDetail.providers = this.providersArray;
    //     // console.log("first provider image",this.movieDetail.providers[0]);
    //     // const PROVIDERS_CHECK = [false, false, false, false];
    //     // this.movieDetail.providers.forEach(provider => {
    //     //   if (provider.provider_name === 'HBO Now' || provider.provider_name === 'HBO Go'){
    //     //     PROVIDERS_CHECK[0] = true;
    //     //   }
    //     //   if (provider.provider_name === 'Netflix' || provider.provider_name === 'Netflix Kids'){
    //     //     PROVIDERS_CHECK[1] = true;
    //     //   }
    //     //   if (provider.provider_name === 'Amazon Video' || provider.provider_name === 'Amazon Prime Video'){
    //     //     PROVIDERS_CHECK[2] = true;
    //     //   }
    //     //   if (provider.provider_name === 'Apple iTunes' || provider.provider_name === 'Apple TV Plus'){
    //     //     PROVIDERS_CHECK[3] = true;
    //     //   }
    //     // });
    //     // this.movieDetail.providers = PROVIDERS_CHECK;

    //     // console.log(this.movieDetail.providers);
    //     // console.log("Synopsis: " + this.movieDetail.synopsis);
    //     // this.movieDetail.videos = this.movieDetail.videos.slice(0, 1);
    //     // console.log(this.movieDetail.videos);
    //     // this.movieDetail.videos = "https://www.youtube.com/watch?v=" + this.movieDetail.videos[0].key;
    //     // console.log(this.movieDetail.videos);
    //     // console.log(this.movieDetail);
    //     console.log("MOVIE CLICK ENDED");
    //   });
    // });
  }



  addToWishList(movieID: string) {
    // console.log(JSON.stringify({"movie_id": 481992}));

    console.log("returned ", this.searchService.addToWishList({ "movie_id": parseInt(movieID) }).subscribe((result: any) => { console.log("wish list post return: ", result) }));
  }

  markWatched(movieID: string) {
    // console.log(JSON.stringify({"movie_id": 481992}));

    console.log("returned ", this.searchService.markWatched({ "movie_id": parseInt(movieID) }).subscribe((result: any) => { console.log("wish list post return: ", result) }));
  }
}

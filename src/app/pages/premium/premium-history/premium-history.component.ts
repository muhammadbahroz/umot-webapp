import { SearchService } from './../../../services/search.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-premium-history',
  templateUrl: './premium-history.component.html',
  styleUrls: ['./premium-history.component.scss'],
})
export class PremiumHistoryComponent implements OnInit {

  searchValue: string;
  check:boolean = false;
  first: boolean = false;
  second: boolean = false;
  third: boolean = false;
  watchedHistory: any = [];

  constructor(private router: Router,private SearchService: SearchService) {
    console.log(SearchService.getWatchedHistory().subscribe((result: any)=>{
      this.watchedHistory = result.data;
      console.log(this.watchedHistory[0]);
    }));
  }

  onDelete(number: number){
    if (number ===  1) {
      if (this.first === true) {
        this.first = false;
      } else {
        this.first = true;
      }
    } else if (number ===  2)  {
      if (this.second === true) {
        this.second = false;
      } else {
        this.second = true;
      }
    } else {
      if (this.third === true) {
        this.third = false;
      } else {
        this.third = true;
      }
    }
  }
  

  goToSearch(){
    this.router.navigate(['premium/premium-menu-search', this.searchValue]);
  }

  movies: any;

  search(){
    if(this.searchValue != ""){
      this.SearchService.search(this.searchValue).subscribe((result: any) => {
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
      this.check=false;
    }

    // console.log("search value "+this.searchValue);
    // if(this.searchValue === "")
    // {
    //   this.check=false;
    //   console.log("went through this");
    // }
  }

  movieClick(movieID: string){

    this.router.navigate(['premium/premium-movie', movieID]);

    // this.searchService.movie(movieID).subscribe((result: any) => {
    //   this.movieDetail = JSON.parse(result.data);
    //   // this.movies = this.movies.slice(0, 10);
    //   console.log(this.movieDetail);
    // });
  }
  
  // onClick()
  // {
  //   console.log("hello there");
  //   this.router.navigate(['home']);
  // }

  ngOnInit() {
  }

}
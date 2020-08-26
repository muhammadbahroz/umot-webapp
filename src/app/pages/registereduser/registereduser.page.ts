import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registereduser',
  templateUrl: './registereduser.page.html',
  styleUrls: ['./registereduser.page.scss'],
})
export class RegistereduserPage implements OnInit {

  searchValue: string;
  check:boolean = false;
  constructor(private router: Router,private SearchService: SearchService) {}

  goToSearch(){
    this.router.navigate(['home/menu-search', this.searchValue]);
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

    this.router.navigate(['home/movie', movieID]);

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

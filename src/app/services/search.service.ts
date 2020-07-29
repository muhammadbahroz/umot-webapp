import { User } from './../interface/user';
import { QuestionResponse } from './../interface/question-response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Login } from '../interface/login';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  // API path
  base_path = 'http://18.222.13.116:5000/movie/';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };


  sendGETRequestWithParameters(query: string){
    let params = new HttpParams();
    params = params.append('query', query);
    return this.httpClient.get('http://18.222.13.116:5000/movie/search/all', {params});
  }

  search(query: string){
    let params = new HttpParams();
    params = params.append('query', query);
    return this.httpClient.get('http://18.222.13.116:5000/movie/search', {params});
  }

  movie(query: string){
    let val = 'http://18.222.13.116:5000/movie/';
    val = val + query;
    return this.httpClient.get(val);
  }

  getQuestion(){
    return this.httpClient.get('http://18.222.13.116:5000/movie/get_question');
  }

  postResponseForRecommendation(item): Observable<QuestionResponse> {
    return this.httpClient
      .post<QuestionResponse>('http://18.222.13.116:5000/movie/recommendation/submit_response', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  createNewUser(item): Observable<User> {
    return this.httpClient
      .post<User>('http://18.222.13.116:5000/user/', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  login(item): Observable<Login> {
    return this.httpClient
      .post<Login>('http://18.222.13.116:5000/auth/login', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}

import { UserUpdateInterface } from './../interface/user-update-interface';
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
  httpOptionsWithAuthorization: any;


  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `${error.error.message}, \n`+
        `Backend returned code ${error.status}, \n` +
        `body was: ${error.error.errors}, \n` +
        `url of resource retrieved: ${error.url}, \n` +
        `response headers: ${error.headers}, \n`+
        `error complete: ${error},\n`+
        `error name: ${error.name},\n`+
        `error type: ${error.type}\n`+
        `error ok: ${error.ok}\n`+
        `status text: ${error.statusText}`);
      for (let key in error.error.errors) {
        // console.error("key: ", key);
        console.error(`Key: ${key}: `,error.error.errors[key]);
      }
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened;');
  }

  /**
   * This is to get all realted movie to the given movie
   * @param query string
   */
  sendGETRequestWithParameters(query: string){
    let params = new HttpParams();
    params = params.append('query', query);
    return this.httpClient.get('http://18.222.13.116:5000/movie/search/all', {params});
  }

  /**
   * This is to search movies
   * @param query string
   */
  search(query: string){
    let params = new HttpParams();
    params = params.append('query', query);
    return this.httpClient.get('http://18.222.13.116:5000/movie/search', {params});
  }

  /**
   * This is to get all the Available Details for the given movie using MovieID
   * @param query string
   */
  async movie(query: string){
    let val = 'http://18.222.13.116:5000/movie/';
    val = val + query;
    return  this.httpClient.get(val);
  }

  /**
   * This will return the question for MOVIE RECOMMENDAION SYSTEM
   * from server.
   * @param locale to get questions in either ENGLISH 'en'
   * or SPANISH 'es'
   * the paramater locale will be appended at the end of the query with
   * the keyword 'locale'
   */
  getQuestion(){
    return this.httpClient.get('http://18.222.13.116:5000/movie/get_question');
  }

  /**
   * This is to get the recommendation from the server for the recently recorded response
   */
  getRecommendation(){
    this.httpOptionsWithAuthorization = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('key')).Authorization}`
      })
    }

    return this.httpClient.get('http://18.222.13.116:5000/movie/get_recommendation', this.httpOptionsWithAuthorization);
  }

  /**
   * This is to send the recorded response of questions to the server to get recommendation
   * @param item QuestionResponse, data-type
   */
  postResponseForRecommendation(item: QuestionResponse) {
    this.httpOptionsWithAuthorization = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('key')).Authorization}`
      })
    }


    return this.httpClient
      .post('http://18.222.13.116:5000/movie/recommendation/submit_response', JSON.stringify(item), this.httpOptionsWithAuthorization)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /**
   * This is to create new user 
   * @param item User, data-type
   */
  createNewUser(item): Observable<User> {
    return this.httpClient
      .post<User>('http://18.222.13.116:5000/user/', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2)
      );
  }

  /**
   * This is to update the user
   * @param item UserUpdateInterface,  data-type
   */
  updateUser(item: UserUpdateInterface) {
    this.httpOptionsWithAuthorization = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('key')).Authorization}`
      })
    }

    return this.httpClient
      .post('http://18.222.13.116:5000/user/update/', JSON.stringify(item), this.httpOptionsWithAuthorization)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * this is to login the user
   * @param item Login, data-type
   */
  login(item): Observable<Login> {
    return this.httpClient
      .post<Login>('http://18.222.13.116:5000/auth/login', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2))
  }


  /**
   * This is to add a movie to the wish-list of a premium user
   * @param item 
   */
  addToWishList(item) {
    this.httpOptionsWithAuthorization = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('key')).Authorization}`
      })
    }

    return this.httpClient
      .post('http://18.222.13.116:5000/wish_list/', JSON.stringify(item), this.httpOptionsWithAuthorization)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /**
   * this is to mark a movie watched for a user
   * @param item 
   */
  markWatched(item) {

    this.httpOptionsWithAuthorization = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('key')).Authorization}`
      })
    }

    return this.httpClient
      .post('http://18.222.13.116:5000/user_rating/mark_watched', JSON.stringify(item), this.httpOptionsWithAuthorization)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /**
   * this is to get the watched history of a user
   */
  getWatchedHistory(){
    this.httpOptionsWithAuthorization = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('key')).Authorization}`
      })
    }

    return this.httpClient.get('http://18.222.13.116:5000/user_rating/watched_history',this.httpOptionsWithAuthorization);
  }

  /**
   * this is to search actor/actress names
   * @param query string
   */
  getActorName(query: string){
    let params = new HttpParams();
    params = params.append('name', query);
    return this.httpClient.get('http://18.222.13.116:5000/movie/actor_search', {params});
  }

  /**
   * this is to search tags
   * @param query string
   */
  getTag(query: string){
    let params = new HttpParams();
    params = params.append('title', query);
    return this.httpClient.get('http://18.222.13.116:5000/movie/tag_search', {params});
  }
}
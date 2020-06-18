import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  sendGETRequestWithParameters(query: string){
    let params = new HttpParams();
    params = params.append('query', query);
    return this.httpClient.get('http://18.222.13.116:5000/movie/search', {params: params});
  }

}

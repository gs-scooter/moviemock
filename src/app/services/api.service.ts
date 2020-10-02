import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MovieModel } from '../models/movie.model';
import { MovieSummaryModel } from '../models/movie-summary.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_KEY = 'e13c6c34';

  private _baseUrl = 'http://www.omdbapi.com';

  constructor(private http: HttpClient) {}

  getMovieSummaryList(): Observable<MovieSummaryModel[]> {
    const params: HttpParams = new HttpParams()
      .set('s', 'Batman')
      .set('apiKey', this.API_KEY);
    return this.http.get<MovieSummaryModel[]>(`${this._baseUrl}`, { params });
  }

  getMovieDetails(movieId: string): Observable<MovieModel> {
    const params: HttpParams = new HttpParams()
      .set('i', movieId)
      .set('apiKey', this.API_KEY);

    return this.http.get<MovieModel>(`${this._baseUrl}`, { params });
  }
}

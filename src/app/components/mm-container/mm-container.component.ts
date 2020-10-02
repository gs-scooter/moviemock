import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

import { MovieModel } from '../../models/movie.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-mm-container',
  templateUrl: './mm-container.component.html',
  styleUrls: ['./mm-container.component.scss'],
})
export class MmContainerComponent implements OnInit, OnDestroy {
  decades = ['2010', '2000', '1990', '1980'];

  movieList: MovieModel[] = [];
  private _subscription: Subscription = new Subscription();

  constructor(private apiService: ApiService) {
    this._subscription.add(
      this.apiService.getMovieSummaryList().subscribe((results: any) => {
        results.Search.forEach((item) => {
          this.apiService
            .getMovieDetails(item.imdbID)
            .subscribe((movie) => this.movieList.push(movie));
        });
      })
    );
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

import { MovieModel } from '../../models/movie.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-mm-container',
  templateUrl: './mm-container.component.html',
  styleUrls: ['./mm-container.component.scss'],
})
export class MmContainerComponent implements OnInit, OnDestroy {
  @ViewChild(MatButtonToggleGroup) toggleGroup: MatButtonToggleGroup;

  decades = [2010, 2000, 1990, 1980];

  filteredList: MovieModel[] = [];
  private movieList: MovieModel[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const requests = [];
    this.subscription.add(
      this.apiService.getMovieSummaryList().subscribe((results: any) => {
        const sortedList = results.Search.sort(
          (a, b) => Number(b.Year) - Number(a.Year)
        );
        sortedList.forEach((item) => {
          requests.push(this.apiService.getMovieDetails(item.imdbID));
        });
        forkJoin(requests).subscribe((responses) => {
          responses.forEach((movie: MovieModel) => {
            movie.yearNumber = Number(movie.Year);
            this.movieList.push(movie);
          });
          this.filteredList = [...this.movieList];
        });
      })
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  launchImdb(imdbId: string): void {
    window.open(`https://www.imdb.com/title/${imdbId}`, '_blank');
  }

  filterDecade(decade: number): void {
    this.filteredList = this.movieList.filter(
      (movie) => movie.yearNumber >= decade && movie.yearNumber < decade + 10
    );
  }
}

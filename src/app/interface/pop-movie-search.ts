import { PopMovieResult } from './pop-movie-result';

export interface PopMovieSearch {
  page: number;
  results: PopMovieResult[];
  total_pages: number;
  total_results: number;
}

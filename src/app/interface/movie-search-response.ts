import { MovieSearchResult } from './movie-search-result';

export interface MovieSearchResponse {
  page: number;
  results: MovieSearchResult[];
  total_pages: number;
  total_results: number;
}

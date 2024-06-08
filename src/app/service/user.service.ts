import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http: HttpClient = inject(HttpClient);

  checkCurrentWeather() {
    this.http
      .get('https://data.weather.gov.hk/weatherAPI/opendata/weather.php', {
        params: {
          dataType: 'rhrread',
          lang: 'en',
        },
      })
      .subscribe({
        next: (data) => alert(`Current weather: ${Object.keys(data)}`),
        error: (err) => console.error('something is wrong: ' + err),
        complete: () => {
          console.log('finished fetching current weather');
        },
      });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  getUser(): Observable<User> {
    return this.http.get<User>('https://jsonplaceholder.typicode.com/users/1');
  }
}

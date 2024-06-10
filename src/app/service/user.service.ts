import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

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

  getUsers(): Observable<HttpResponse<User[]>> {
    let myHeaders: HttpHeaders = new HttpHeaders({
      myHeader: 'headervalue',
    });
    myHeaders = myHeaders.set('name', 'Ken');
    myHeaders = myHeaders.append('name', 'WU');
    return this.http.get<User[]>(`${this.apiUrl}/users`, {
      headers: myHeaders,
      observe: 'response',
    });
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/1`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { UserService } from './service/user.service';
import { Observable, Subscription } from 'rxjs';
import { DumbHttpRespone } from './interface/dumb-http-respone';
import { User } from './interface/user';
import { MovieService } from './service/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private userService: UserService = inject(UserService);
  private movieService: MovieService = inject(MovieService);

  title = 'Learn HTTP Observable';
  private user: User = {
    id: 6,
    name: 'Jsdfsfefr XXX',
    username: 'WU',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  };

  private dummySubscription: Subscription = new Subscription();

  private dummyObserva$ = new Observable<DumbHttpRespone>((sub) => {
    console.log('Inside sub');
    sub.next({ code: 200, data: 'this is data 1' });
    sub.next({ code: 200, data: 'this is data 2' });

    setTimeout(() => {
      sub.next({ code: 200, data: 'this is data 3' });
    }, 1000);

    setTimeout(() => {
      sub.error({ code: 500, msg: 'Error occurred' });
    }, 1300);

    setTimeout(() => {
      sub.complete();
    }, 2000);
    console.log('finished emitted');
  });

  ngOnInit(): void {
    this.onUpdateUser(this.user);
    this.onGetUsers();

    // this.onGetUser();

    // this.onCreateUser(this.user);

    this.movieService.displayPopularMovies().subscribe({
      next: (data: any) => console.table(data),
      error: (err: any) => console.error(err),
      complete: () => console.log('done fetch all popular movies'),
    });
  }

  onGetUsers(): void {
    const users$: Observable<User[]> = this.userService.getUsers();

    users$.subscribe({
      next: (res: User[]) => console.table(res),
      error: (err: any) => console.error(err),
      complete: () => console.log('Done getting all users!'),
    });
  }

  onGetUser(): void {
    const user$: Observable<User> = this.userService.getUser();

    user$.subscribe({
      next: (res: User) => console.log(res),
      error: (err: any) => console.error(err),
      complete: () => console.log('Done getting single user!'),
    });
  }

  onCreateUser(user: User): void {
    const user$: Observable<User> = this.userService.createUser(user);

    user$.subscribe({
      next: (res: User) => console.log(res),
      error: (err: any) => console.error(err),
      complete: () => console.log('Done creating single user!'),
    });
  }

  onUpdateUser(user: User): void {
    const user$: Observable<User> = this.userService.updateUser(user);

    user$.subscribe({
      next: (res: User) => console.log(res),
      error: (err: any) => console.error(err),
      complete: () => console.log('Done updating single user!'),
    });
  }
}

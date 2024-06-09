import { Component, OnInit, inject } from '@angular/core';
import { UserService } from './service/user.service';
import { Observable, Subscription } from 'rxjs';
import { DumbHttpRespone } from './interface/dumb-http-respone';
import { User } from './interface/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private userService: UserService = inject(UserService);

  title = 'Learn HTTP Observable';

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
    this.onGetUsers();

    this.onGetUser();
  }

  onGetUsers(): void {
    const users$: Observable<User[]> = this.userService.getUsers();

    users$.subscribe({
      next: (res: User[]) => console.log(res),
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
}

import { Component, OnInit, inject } from '@angular/core';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private userService: UserService = inject(UserService);

  title = 'Learn HTTP Observable';

  ngOnInit(): void {
    // this.userService.checkCurrentWeather();
  }
}

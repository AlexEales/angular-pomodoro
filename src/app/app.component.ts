import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  mode = 'pomodoro';

  switchToPomodoro(): void {
    this.mode = 'pomodoro';
  }

  switchToShortBreak(): void {
    this.mode = 'short';
  }

  switchToLongBreak(): void {
    this.mode = 'long';
  }

}

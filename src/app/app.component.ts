import { Component } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  mode = 'pomodoro';
  message: string;

  constructor(private modalService: NgbModal) { }

  /**
   * Switches the timer mode to pomodoro. (25 mins)
   */
  switchToPomodoro(): void {
    this.mode = 'pomodoro';
  }

  /**
   * Switches the timer mode to a short break. (5 mins)
   */
  switchToShortBreak(): void {
    this.mode = 'short';
  }

  /**
   * Switches the timer mode to a long break. (10 mins)
   */
  switchToLongBreak(): void {
    this.mode = 'long';
  }

  /**
   * Called on completion of the timer, passed the modal to be displayed.
   */
  onTimerComplete(content): void {
    // Check what mode we are in to display a appropriate message in the modal.
    switch (this.mode) {
      case 'pomodoro':
        this.message = 'Time to take a break!';
        break;
      case 'short':
        this.message = 'Time to get back to work!';
        break;
      case 'long':
        this.message = 'Time to get back to work!';
        break;
    }
    // Open the modal and then on close change the timer to the opposite mode. (Pomodoro -> Break etc.)
    this.modalService.open(content).result.then((result) => {
      if (this.mode === 'short' || this.mode === 'long') {
        this.mode = 'pomodoro';
      } else {
        this.mode = 'short';
      }
    });
  }

}

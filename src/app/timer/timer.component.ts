import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {

  running = false;
  value = [25, 0];
  subscription: Subscription;

  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  startTimer(): void {
    // Create Rxjs interval to call a update method every second.
    this.subscription = interval(1000).subscribe(x => this.updateTimer());
  }

  stopTimer(): void {
    // If we want to stop the timer then unsubscribe from the interval.
    this.subscription.unsubscribe();
  }

  resetTimer(): void {
    // Set the minutes and seconds back to their original values.
    this.stopTimer();
    this.value = [25, 0];
  }

  updateTimer(): void {
    // Check if the timer is comeplete.
    if (this.value[0] === 0 && this.value[1] === 0) {
      this.stopTimer();
      // Make a sound/send an alert.
    }
    // Otherwise update minutes and seconds.
    // TODO: This does not work as intended.
    if (this.value[0] !== 0 && this.value[1] === 0) {
      this.value[1] = 59;
      this.value[0] -= 1;
    } else if(this.value[1] !== 0) {
      this.value[1] -= 1;
    }
  }

}

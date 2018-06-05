import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {

  @Input() minutes: number;
  @Input() seconds: number;

  running = false;
  value = [25, 0];
  subscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    if (this.minutes) {
      this.value[0] = this.minutes;
    } else {
      this.minutes = 25;
    }
    if (this.seconds) {
      this.value[1] = this.seconds;
    } else {
      this.seconds = 0;
    }
  }

  ngOnDestroy(): void { }

  startTimer(): void {
    // Create Rxjs interval to call a update method every second.
    this.subscription = interval(1000).subscribe(x => this.updateTimer());
  }

  stopTimer(): void {
    // If we want to stop the timer then unsubscribe from the interval.
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  resetTimer(): void {
    // Set the minutes and seconds back to their original values.
    this.stopTimer();
    this.value = [this.minutes, this.seconds];
  }

  updateTimer(): void {
    // Check if the timer is comeplete.
    if (this.value[0] === 0 && this.value[1] === 0) {
      this.stopTimer();
      // Make a sound/send an alert.
    } else if (this.value[0] !== 0 && this.value[1] === 0) {
      this.value = [this.value[0] - 1, 59];
    } else if (this.value[1] !== 0) {
      this.value = [this.value[0], this.value[1] - 1];
    }
  }

}

import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {

  @Input() m: number;
  @Input() s: number;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onComplete: EventEmitter<any> = new EventEmitter();

  running = false;
  value = [25, 0];
  subscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    if (this.m) {
      this.value[0] = this.m;
    } else {
      this.m = 25;
    }
    if (this.s) {
      this.value[1] = this.s;
    } else {
      this.s = 0;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  startTimer(): void {
    // Check if the timer is comeplete and if so reset it before starting.
    if (this.value[0] === 0 && this.value[1] === 0) {
      this.resetTimer();
    }
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
    this.value = [this.m, this.s];
  }

  updateTimer(): void {
    // Check if the timer is comeplete and if so stop the timer and run onComplete().
    if (this.value[0] === 0 && this.value[1] === 0) {
      this.stopTimer();
      // Make a sound/send an alert.
      this.onComplete.emit();
    } else if (this.value[0] !== 0 && this.value[1] === 0) {
      this.value = [this.value[0] - 1, 59];
    } else if (this.value[1] !== 0) {
      this.value = [this.value[0], this.value[1] - 1];
    }
  }

}

import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  @Input()minutes: number=0;
  @Input()turn:boolean=false
  
  seconds: number=0;

  
  private intervalId: any;

  

 ngOnInit(): void {
   this.startCountdown()
 }

  startCountdown(): void {
    this.intervalId = setInterval(() => {
      if (this.minutes === 0 && this.seconds === 0) {
        this.stopCountdown();
      } else {
        if (this.seconds === 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          this.seconds--;
        }
      }
    }, 1000);
    
  }

  pauseCountdown(): void {
    clearInterval(this.intervalId);  
  }

  resumeCountdown(): void {
   
    this.startCountdown();
    
  }

  stopCountdown(): void {
    clearInterval(this.intervalId);
  }

  resetCountdown(): void {
    this.minutes = 5; // Initial countdown minutes
    this.seconds = 0; // Initial countdown seconds
    
  }

}

import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  counter = 250;
  constructor(private router: Router) {}

  ngOnInit() {
    this.timerForResent();
  }

  timerForResent() {
    let tick = 30;
    this.counter = 250;

    let time = timer(0, tick);

    time.subscribe((t) => {
      if (this.counter !== 0) {
        --this.counter;
      }
    });
  }
  verify_otp() {
    this.router.navigateByUrl('/sidebar', { replaceUrl: true });
  }
}

import { Component } from '@angular/core';
import { JoyrideService } from 'ngx-joyride';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  stepContent = ['Navigation Bar', 'Cooled Card'];
  constructor(private readonly joyrideService: JoyrideService) {}

  onClick() {
    this.joyrideService.startTour(
      {
        steps: [
          'firstStep@sidebar/tabs/tab1',
          'secondStep@sidebar/tabs/tab1',
          //'step3@sidebar/tabs/tab2',
        ],
      } // Your steps order
    );
  }
  ionViewDidEnter() {
    setTimeout(() => {
      this.onClick();
    }, 500);
    //this.onClick();
  }

  onDone() {
    this.joyrideService.closeTour();
  }
}

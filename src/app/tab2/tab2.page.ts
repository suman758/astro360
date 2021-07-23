import { Component } from '@angular/core';
import { JoyrideService } from 'ngx-joyride';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(private readonly joyrideService: JoyrideService) {}
  ionViewDidEnter() {
    this.joyrideService.startTour(
      {
        steps: ['step3@sidebar/tabs/tab2'],
      } // Your steps order
    );
  }
}

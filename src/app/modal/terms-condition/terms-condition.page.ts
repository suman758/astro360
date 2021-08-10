import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.page.html',
  styleUrls: ['./terms-condition.page.scss'],
})
export class TermsConditionPage implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}

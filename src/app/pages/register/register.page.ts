import { TermsConditionPage } from './../../modal/terms-condition/terms-condition.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(
    private router: Router,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  login() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  async openTerms() {
    const modal = await this.modalController.create({
      component: TermsConditionPage,
    });

    return await modal.present();
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';
import { TermsConditionPage } from './../../modal/terms-condition/terms-condition.page';
import { RegisterPage } from './register.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RegisterPageRoutingModule],
  declarations: [RegisterPage, TermsConditionPage],
  entryComponents: [TermsConditionPage],
})
export class RegisterPageModule {}

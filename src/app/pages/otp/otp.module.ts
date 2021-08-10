import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormatTimePipe } from '../../pipe/format-time.pipe';
import { IonicModule } from '@ionic/angular';

import { OtpPageRoutingModule } from './otp-routing.module';

import { OtpPage } from './otp.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OtpPageRoutingModule],
  declarations: [OtpPage, FormatTimePipe],
})
export class OtpPageModule {}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private fblog: Facebook,
    private googlePlus: GooglePlus
  ) {}

  async ngOnInit() {
    this.credentials = this.fb.group({
      email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
      password: ['cityslicka', [Validators.required, Validators.minLength(6)]],
    });
  }

  async fblogin() {
    //await this.showLoading();
    //const loading = await this.loadingController.create();
    this.fblog
      .login(['public_profile', 'email'])
      .then((response: FacebookLoginResponse) => {
        this.authService
          .loginWithFacebook(response.authResponse.accessToken)
          .then((res) => {
            this.router.navigateByUrl('/sidebar', { replaceUrl: true });
          });
      })
      .catch((error) => {
        alert('error:' + JSON.stringify(error));
      });
  }

  async googlelogin() {
    const user = await this.googlePlus.login({
      webClientId:
        '657106332716-3a3hk5iitddulcos7v8jif20404hhq54.apps.googleusercontent.com',
    });
    //alert(JSON.stringify(user));
    this.authService.loginWithGoogle(user.idToken).then((res) => {
      this.router.navigateByUrl('/sidebar', { replaceUrl: true });
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    //alert(JSON.stringify(this.credentials.value));
    this.authService.login(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();
        this.router.navigateByUrl('/sidebar', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error.error,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }

  sendOTPpage() {
    this.router.navigateByUrl('/otp', { replaceUrl: true });
  }

  register() {
    this.router.navigateByUrl('/register', { replaceUrl: true });
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }
}

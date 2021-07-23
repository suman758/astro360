import { Injectable, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import firebase from '@firebase/app';
import '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  token = null;
  constructor(
    private platform: Platform,
    private zone: NgZone,
    private facebook: Facebook,
    private http: HttpClient
  ) {}

  init(): void {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'YOUR-API-KEY',
      authDomain: 'YOUR-DOMAIN.firebaseapp.com',
      databaseURL: 'YOUR-URL',
      projectId: 'YOUR-PROJECT-ID',
      storageBucket: '',
      messagingSenderId: '********',
      appId: '*******',
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Emit logged in status whenever auth state changes
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.zone.run(() => {
        firebaseUser ? this.loggedIn.next(true) : this.loggedIn.next(false);
      });
    });
  }

  login(): void {
    if (this.platform.is('capacitor')) {
      this.nativeFacebookAuth();
    } else {
      this.browserFacebookAuth();
    }
  }

  async logout(): Promise<void> {
    if (this.platform.is('capacitor')) {
      try {
        await this.facebook.logout(); // Unauth with Facebook
        await firebase.auth().signOut(); // Unauth with Firebase
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await firebase.auth().signOut();
      } catch (err) {
        console.log(err);
      }
    }
  }

  // async loadUserData() {
  //   const url = `https://graph.facebook.com/${this.token.userId}?fields=id,name,picture.width(720),birthday,email&access_token=${this.token.token}`;
  //   this.http.get(url).subscribe((res) => {
  //     this.user = res;
  //   });
  // }

  async nativeFacebookAuth(): Promise<void> {
    try {
      const response: any = await this.facebook.login([
        'public_profile',
        'email',
        'user_birthday',
        'name',
      ]);

      alert(JSON.stringify(response));
      //console.log(response);

      if (response.authResponse) {
        // User is signed-in Facebook.
        if (response.authResponse) {
          this.token = response.authResponse;
          alert(JSON.stringify(this.token));
          const url = `https://graph.facebook.com/${this.token.userID}?fields=id,name,picture.width(720),birthday,email&access_token=${this.token.accessToken}`;
          this.http.get(url).subscribe((res) => {
            alert(JSON.stringify(res));
          });
        }
        const unsubscribe = firebase
          .auth()
          .onAuthStateChanged((firebaseUser) => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!this.isUserEqual(response.authResponse, firebaseUser)) {
              // Build Firebase credential with the Facebook auth token.
              const credential = firebase.auth.FacebookAuthProvider.credential(
                response.authResponse.accessToken
              );
              //alert(JSON.stringify(credential));
              // Sign in with the credential from the Facebook user.
              firebase
                .auth()
                .signInWithCredential(credential)
                .catch((error) => {
                  console.log(error);
                });
            } else {
              // User is already signed-in Firebase with the correct user.
              console.log('already signed in');
            }
          });
      } else {
        // User is signed-out of Facebook.
        firebase.auth().signOut();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async browserFacebookAuth(): Promise<void> {
    const provider = new firebase.auth.FacebookAuthProvider();

    try {
      const result = await firebase.auth().signInWithPopup(provider);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  isUserEqual(facebookAuthResponse, firebaseUser): boolean {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;

      providerData.forEach((data) => {
        if (
          data.providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
          data.uid === facebookAuthResponse.userID
        ) {
          // We don't need to re-auth the Firebase connection.
          return true;
        }
      });
    }

    return false;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { Storage } from '@capacitor/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

export const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  token = '';
  constructor(private http: HttpClient, private fireAuth: AngularFireAuth) {
    this.loadToken();
  }
  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  loginWithFacebook(accessToken) {
    //this.loginType = 'Login with Facebook';FacebookAuthProvider.credential(accessToken);
    const credential =
      firebase.auth.FacebookAuthProvider.credential(accessToken);
    return this.fireAuth.signInWithCredential(credential).then((res) => {
      Storage.set({ key: TOKEN_KEY, value: accessToken });
      this.isAuthenticated.next(true);
      return res;
    });
  }

  loginWithGoogle(accessToken) {
    const credential = firebase.auth.GoogleAuthProvider.credential(accessToken);
    return this.fireAuth
      .signInWithCredential(credential)
      .then((res) => {
        //alert(JSON.stringify(res));
        Storage.set({ key: TOKEN_KEY, value: accessToken });
        this.isAuthenticated.next(true);
        return res;
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  }

  login(credentials: { email; password }): Observable<any> {
    return this.http.post(`https://reqres.in/api/login`, credentials).pipe(
      map((data: any) => data.token),
      switchMap((token) => {
        return from(Storage.set({ key: TOKEN_KEY, value: token }));
      }),
      tap((_) => {
        this.isAuthenticated.next(true);
      })
    );
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({ key: TOKEN_KEY });
  }
}

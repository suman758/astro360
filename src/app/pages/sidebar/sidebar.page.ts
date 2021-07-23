import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.page.html',
  styleUrls: ['./sidebar.page.scss'],
})
export class SidebarPage implements OnInit {
  active = '';

  NAV = [
    {
      name: 'Dashboard',
      link: '/nav/tabs',
      icon: 'home',
    },
  ];
  user: any = null;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private fireAuth: AngularFireAuth,
    private fblog: Facebook,
    private googleplus: GooglePlus
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.active = event.url;
    });
  }

  ngOnInit() {
    this.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.user = {
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
          isAnonymous: user.isAnonymous,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          refreshToken: user.refreshToken,
        };
        //alert(JSON.stringify(this.user));
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  async logout() {
    this.user = null;
    await this.authService.logout();
    this.fireAuth.signOut().then(() => {
      this.fblog.logout();
      this.googleplus.logout();
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }
}

import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';
export const INTRO_KEY = 'astro360';

@Injectable({
  providedIn: 'root',
})
export class IntroGuard implements CanLoad {
  constructor(private router: Router) {}
  async canLoad(): Promise<boolean> {
    const hasSeenTutorial = await Storage.get({ key: INTRO_KEY });
    if (hasSeenTutorial && hasSeenTutorial.value === 'true') {
      return true;
    } else {
      this.router.navigateByUrl('/intro', { replaceUrl: true });
      return false;
    }
  }
}

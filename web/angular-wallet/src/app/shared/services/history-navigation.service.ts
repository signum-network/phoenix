import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class HistoryNavigationService {
  private history = 0;
  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history++;
      }
    });
  }

  back(): void {
    if (this.history > 0) {
      this.history--;
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }

  forward(): void {
    this.location.forward();
  }

  canBack(): boolean {
    return this.history > 0;
  }
}

import { Component, Input } from '@angular/core';
import { HistoryNavigationService } from 'app/shared/services/historyNavigation.service';


export interface BreadcrumbInfo {
  path: string;
  label: string;
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {

  @Input()
  title: string;

  @Input()
  breadcrumbs: BreadcrumbInfo[];

  @Input()
  wide: boolean;

  @Input()
  full: boolean;

  @Input()
  subtitle: string;
  constructor(private navService: HistoryNavigationService) {
  }

  back(): void {
    this.navService.back();
  }

  forward(): void {
    this.navService.forward();
  }

  canBack(): boolean {
    return this.navService.canBack();
  }

}

import {Component, Input} from '@angular/core';

export interface BreadcrumbInfo {
  path: string;
  label: string;
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent{

  @Input()
  title: string;

  @Input()
  breadcrumbs: BreadcrumbInfo[];

  @Input()
  wide: boolean;

  @Input()
  subtitle: string;
}

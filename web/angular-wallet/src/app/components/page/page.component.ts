import {Component, Input, OnInit} from '@angular/core';
import {sample} from 'lodash';

const BackgroundImages = [
  // ATTENTION: do not put trailing slashes here, otherwise in electron the images won't show up
  'assets/images/bg/polygones0.svg',
  'assets/images/bg/polygones1.svg',
  'assets/images/bg/polygones2.svg',
  'assets/images/bg/polygones3.svg',
  'assets/images/bg/polygones4.svg',
];

export interface BreadcrumbInfo {
  path: string;
  label: string;
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit{

  @Input()
  title: string;

  @Input()
  breadcrumbs: BreadcrumbInfo[];

  @Input()
  wide: boolean;

  @Input()
  subtitle: string;

  bgImgSrc: string;

  ngOnInit(): void {
    const bgSrc = sample(BackgroundImages);
    this.bgImgSrc = `url(${bgSrc})`;
  }


}

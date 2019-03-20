import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BalanceDiagramComponent} from './balance-diagram.component';
import {I18nService} from '../../../layout/components/i18n/i18n.service';
import {StoreService} from '../../../store/store.service';
import {BehaviorSubject} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {TooltipComponent} from './tooltip/tooltip.component';
import {I18nModule} from '../../../layout/components/i18n/i18n.module';
import {MockComponent} from 'ng-mocks';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('BalanceDiagramComponent', () => {
  let component: BalanceDiagramComponent;
  let fixture: ComponentFixture<BalanceDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        NgxChartsModule,
        I18nModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        BalanceDiagramComponent,
        MockComponent(TooltipComponent),
      ],
      providers: [
        I18nService,
        {
          provide: StoreService,
          useFactory: () => ({
            ready: new BehaviorSubject(true),
            getSettings: () => Promise.resolve({language: 'en'}),
            saveSettings: () => Promise.resolve(true)
          })
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

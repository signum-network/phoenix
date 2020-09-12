import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AssetsComponent} from './assets.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {ReactiveFormsModule} from '@angular/forms';
import {I18nModule} from 'app/layout/components/i18n/i18n.module';
import {BehaviorSubject} from 'rxjs';
import {StoreService} from 'app/store/store.service';
import {I18nService} from 'app/layout/components/i18n/i18n.service';
import {AccountService} from 'app/setup/account/account.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PageModule} from '../../components/page/page.module';
import { AppSharedModule } from 'app/shared/shared.module';

describe('AssetsComponent', () => {
  let component: AssetsComponent;
  let fixture: ComponentFixture<AssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        I18nModule,
        AppSharedModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(
          [{path: 'aliases', component: AssetsComponent}]
        ),
        MatTooltipModule,
        PageModule,
      ],
      providers: [I18nService, {
        provide: StoreService,
        useFactory: () => {
          return {
            ready: new BehaviorSubject(true),
            getSettings: () => Promise.resolve({language: 'en'}),
            saveSettings: () => Promise.resolve(true),
            getSelectedAccount: () => Promise.resolve({})
          };
        }
      },
        {
          provide: AccountService,
          useFactory: () => ({
              getAssets: () => Promise.resolve({aliases: [{aliasName: '123'}]})
            }
          )
        }],
      declarations: [AssetsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

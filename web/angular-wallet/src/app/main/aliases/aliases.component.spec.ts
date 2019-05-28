import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AliasesComponent} from './aliases.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSortModule,
  MatTableModule,
  MatDialogModule,
  MatTooltipModule
} from '@angular/material';
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

describe('AliasesComponent', () => {
  let component: AliasesComponent;
  let fixture: ComponentFixture<AliasesComponent>;

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
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(
          [{path: 'aliases', component: AliasesComponent}]
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
              getAliases: () => Promise.resolve({aliases: [{aliasName: '123'}]})
            }
          )
        }],
      declarations: [AliasesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AliasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

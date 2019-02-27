import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSortModule, MatTableModule, MatPaginatorModule  } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { BehaviorSubject } from 'rxjs';
import { StoreService } from 'app/store/store.service';
import { I18nService } from 'app/layout/components/i18n/i18n.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlocksComponent } from './blocks.component';
import { NetworkService } from 'app/network/network.service';
import { TimeAgoPipe } from 'time-ago-pipe';
import { NotifierModule } from 'angular-notifier';
import { BlocksResolver } from './blocks.resolver';

describe('BlocksComponent', () => {
  let component: BlocksComponent;
  let fixture: ComponentFixture<BlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        HttpClientTestingModule,
        ReactiveFormsModule, 
        I18nModule,
        BrowserAnimationsModule,
        NotifierModule,
        RouterTestingModule.withRoutes(
          [{path: 'blocks', component: BlocksComponent}]
        )
      ],
      providers: [ TimeAgoPipe, I18nService, {
        provide: StoreService,
        useFactory: () => {
          return {
            ready: new BehaviorSubject(true),
            getSettings: () => Promise.resolve({language: 'en'}),
            saveSettings: () => Promise.resolve(true)
          };
        }
      },
      {
        provide: NetworkService,
        useFactory: () => {
          return {
            getBlocks: () => Promise.resolve({blocks: [{block: '123'}]})
          }
        }
      }],
      declarations: [ BlocksComponent, TimeAgoPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

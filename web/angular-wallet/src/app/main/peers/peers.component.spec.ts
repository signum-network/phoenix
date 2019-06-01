import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { BehaviorSubject } from 'rxjs';
import { StoreService } from 'app/store/store.service';
import { I18nService } from 'app/layout/components/i18n/i18n.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PeersComponent } from './peers.component';
import { NetworkService } from 'app/network/network.service';
import { TimeAgoPipe } from 'time-ago-pipe';
import { NotifierModule } from 'angular-notifier';
import { PeersResolver } from './peers.resolver';

describe('PeersComponent', () => {
  let component: PeersComponent;
  let fixture: ComponentFixture<PeersComponent>;

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
          [{path: 'peers', component: PeersComponent}]
        )
      ],
      providers: [ I18nService, {
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
            getPeers: () => Promise.resolve({peers: ['1.2.3.4']}),
            getPeer: () => Promise.resolve({announcedAddress: '1.2.3.4'})
          }
        }
      }],
      declarations: [ PeersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

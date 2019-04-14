import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, takeUntil} from 'rxjs/operators';
import {MessagesService} from 'app/main/messages/messages.service';


@Component({
  selector: 'message-user-sidenav',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessageUserSidenavComponent implements OnInit, OnDestroy {
  user: any;
  userForm: FormGroup;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _messageService: MessagesService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.user = this._messageService.user;

    this.userForm = new FormGroup({
      mood: new FormControl(this.user.mood),
      status: new FormControl(this.user.status)
    });

    this.userForm.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(data => {
        this.user.mood = data.mood;
        this.user.status = data.status;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  changeLeftSidenavView(view): void {
    this._messageService.onLeftSidenavViewChanged.next(view);
  }

}

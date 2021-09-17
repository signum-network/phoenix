import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatStepper} from '@angular/material/stepper';
import {CreateService} from '../create.service';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-create',
  styleUrls: ['./create.component.scss'],
  templateUrl: './create.component.html'
})
export class CreateActiveAccountComponent extends UnsubscribeOnDestroy implements OnInit {
  @ViewChild(MatStepper, {static: true}) stepper: MatStepper;
  @Input() newUser: boolean;

  constructor(
    public createService: CreateService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntil(this.unsubscribeAll),
      ).subscribe(() => {
      this.createService.reset();
    })
  }

}

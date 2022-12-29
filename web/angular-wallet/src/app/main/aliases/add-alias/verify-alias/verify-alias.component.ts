import { Component, OnInit } from '@angular/core';
import { AddAliasWizardService } from '../add-alias-wizard.service';
import { UnsubscribeOnDestroy } from '../../../../util/UnsubscribeOnDestroy';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

const ValidationPattern = /^[a-zA-Z0-9]{1,100}$/;

@Component({
  selector: 'app-add-alias-verify-alias',
  styleUrls: ['./verify-alias.component.scss'],
  templateUrl: './verify-alias.component.html'
})
export class VerifyAliasComponent extends UnsubscribeOnDestroy implements OnInit {

  aliasNameInputChange$: Subject<string> = new Subject<string>();
  public error = '';
  public isVerifying = false;

  constructor(
    public aliasService: AddAliasWizardService,
  ) {
    super();
  }

  public canProceed(): boolean {
    return !this.isVerifying && !this.error && !!this.aliasService.aliasName;
  }

  public next(): void {
    if (this.canProceed()){
      this.aliasService.nextStep();
    }
  }

  onAliasNameChange(aliasName: string): void {
    this.aliasNameInputChange$.next(aliasName);
  }

  ngOnInit(): void {
    this.aliasNameInputChange$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
      .subscribe(async (aliasName: string) => {
        if (this.validateAlias(aliasName)){
          await this.checkIfAliasIsTaken(aliasName);
        }
      });
  }

  private validateAlias(aliasName: string): boolean {
    if (ValidationPattern.test(aliasName)){
      this.error = '';
    }
    else{
      this.error = 'invalid_alias_name';
    }
    return !this.error;
  }

  private async checkIfAliasIsTaken(aliasName: string): Promise<void>{
    this.error = '';
    this.isVerifying = true;
    const alias = await this.aliasService.fetchAlias(aliasName);
    this.isVerifying = false;
    if (alias){
      this.error = 'alias_taken';
    }else{
      this.aliasService.aliasName = aliasName;
    }
  }

}

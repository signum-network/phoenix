import {Injectable} from '@angular/core';
import { Alias } from '@signumjs/core';
import { AliasService } from '../alias.service';

const MaxSteps = 2;

@Injectable()
export class AddAliasWizardService {
  public aliasName = '';
  private step = 0;

  constructor(
    private aliasService: AliasService,
  ) {
  }

  public previousStep(): void {
    this.step = Math.max(0, this.step - 1);
  }

  public nextStep(): void {
    this.step = Math.min(MaxSteps - 1, this.step + 1);
  }

  public setStep(step: number): void {
    this.step = step;
  }

  public getStep(): number {
    return this.step;
  }



  public reset(): void {
    this.aliasName = '';
    setTimeout(() => {
      this.step = 0;
    }, 0);
  }

  async fetchAlias(aliasName: string): Promise<Alias|null> {
    try{
      return (await this.aliasService.getAliasByName(aliasName));
    } catch (e){
      return null;
    }
  }
}

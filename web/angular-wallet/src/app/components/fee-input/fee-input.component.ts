import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { FeeRegimeService } from "./fee-regime.service";
import { NetworkService } from "../../network/network.service";
import { SuggestedFees } from "@signumjs/core";
import { Amount, CurrencySymbol } from "@signumjs/util";

type FeeTypes = "cheap" | "standard" | "priority";

@Component({
  selector: "app-fee-input",
  templateUrl: "./fee-input.component.html",
  styleUrls: ["./fee-input.component.scss"]
})
export class FeeInputComponent implements OnInit, OnChanges {

  @Input() feeBase: string;
  @Input() type: number;
  @Input() subtype: number;
  @Input() payloadLength: number;
  @Input() disabled = false;

  symbol = CurrencySymbol;
  feeValue: string;
  maxFee = Amount.Zero();
  suggestedFees: SuggestedFees;
  priority: FeeTypes = "standard";

  @Input()
  get feeSigna(): string {
    return this.feeValue;
  }

  @Output()
  feeSignaChange = new EventEmitter();

  set feeSigna(feeValue: string) {
    if (!feeValue) {
      this.feeValue = "0";
      return;
    }

    this.feeValue = Amount.fromSigna(feeValue).greater(this.maxFee) ? this.maxFee.getSigna() : feeValue;
    this.feeSignaChange.emit(this.feeValue);
  }

  constructor(private feeRegimeService: FeeRegimeService,
              private networkService: NetworkService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.suggestedFees = await this.networkService.suggestFee();
    this.feeRegimeService.setFeeBase(Amount.fromPlanck(this.suggestedFees.standard));
    this.updateFee();
  }


  private updateFee(): void {
    const feeAmount = this.feeRegimeService.calculateFeeByPayload(this.type, this.subtype, this.payloadLength);
    this.maxFee = this.feeRegimeService.getMaxFeeByType(this.type, this.subtype);
    this.feeSigna = feeAmount.getSigna();
    // console.log("Max fee/amount", this.maxFee.toString(), feeAmount.getSigna());
  }

  public setPriority(prio: "cheap" | "standard" | "priority"): void {
    this.priority = prio;
    this.feeRegimeService.setFeeBase(Amount.fromPlanck(this.suggestedFees[prio]));
    this.updateFee();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {payloadLength} = changes;
    if (payloadLength && payloadLength.previousValue !== payloadLength.currentValue) {
      this.updateFee();
    }
  }
}

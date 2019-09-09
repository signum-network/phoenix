import {MultioutRecipientAmount} from '@burstjs/core';
import {I18nService} from '../../../layout/components/i18n/i18n.service';

export interface RecipientAmountCsvParserOptions {
  delimiter: string;
  lineBreak: string;
}

const defaultOptions = {
  delimiter: ',',
  lineBreak: '\n'
};

export class RecipientAmountCsvParser {

  constructor(private translationService: I18nService,
              private options: RecipientAmountCsvParserOptions = defaultOptions
  ) {

  }

  private assertNoDuplicate(parsedRecipientAmounts: any, currentRecipient: string): void {
    if (parsedRecipientAmounts[currentRecipient]) {
      const message = `${this.translationService.getTranslation('csv_error_duplicated_recipient')}: ${currentRecipient}`;
      throw new Error(message);
    }
  }

  private assertNoMaximumExceeded(parsedRecipientAmounts: any, isSameAmount: boolean): void {
    const MaxSameAmountCount = 128;
    const MaxDiffAmountCount = 64;
    const recipientCount = Object.keys(parsedRecipientAmounts).length;
    if (!isSameAmount && recipientCount > MaxDiffAmountCount){
      const message = `${this.translationService.getTranslation('csv_error_max_limit_multiout')} ${MaxDiffAmountCount}`;
      throw new Error(message);
    }
    else if (isSameAmount && recipientCount > MaxSameAmountCount){
      const message = `${this.translationService.getTranslation('csv_error_max_limit_same_multiout')} ${MaxSameAmountCount}`;
      throw new Error(message);
    }
  }

  private assertValidAmount(amountNQT: string, recipient: string): void {
    const int = parseInt(amountNQT, 10);
    if (Number.isNaN(int) || int <= 0){
      const message = `${this.translationService.getTranslation('csv_error_invalid_amount')}`;
      throw new Error(message);
    }
  }

  public parse(data: string = ''): MultioutRecipientAmount[] {

    const recipientAmounts = data.trim().split(this.options.lineBreak);
    const parsedRecipientAmounts = {};
    let previousAmountNQT = null;
    recipientAmounts
      .forEach( (ra = '') => {
        const [recipient, amountNQT] = ra.trim().split(this.options.delimiter);
        if (!(recipient && amountNQT)) {
          throw new Error(this.translationService.getTranslation('csv_error_unreadable_format'));
        }
        const trimmedAmountNQT = amountNQT.trim();
        const trimmedRecipient = recipient.trim();
        this.assertValidAmount(trimmedAmountNQT, trimmedRecipient);
        this.assertNoDuplicate(parsedRecipientAmounts, trimmedRecipient);
        parsedRecipientAmounts[trimmedRecipient] = trimmedAmountNQT;
        this.assertNoMaximumExceeded(parsedRecipientAmounts, trimmedAmountNQT === previousAmountNQT);
        previousAmountNQT = trimmedAmountNQT;
      });
    const result = Object.keys(parsedRecipientAmounts).map(recipient => ({
        recipient,
        amountNQT: parsedRecipientAmounts[recipient]
      })
    );
    return result;
  }
}

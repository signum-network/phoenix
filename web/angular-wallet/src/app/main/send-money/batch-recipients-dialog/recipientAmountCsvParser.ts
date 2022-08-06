import {MultioutRecipientAmount} from '@signumjs/core';
import {I18nService} from '../../../layout/components/i18n/i18n.service';
import {constants} from '../../../constants';
import {Address} from '@signumjs/core';
import {Amount} from '@signumjs/util';

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

  private assertNoDuplicate(parsedRecipientAmounts: any, currentAddress: Address): void {
    const numericId = currentAddress.getNumericId();
    if (parsedRecipientAmounts[numericId]) {
      const message = `${this.translationService.getTranslation('csv_error_duplicated_recipient')}: ${numericId}`;
      throw new Error(message);
    }
  }

  private assertNoMaximumExceeded(parsedRecipientAmounts: any, isSameAmount: boolean): void {
    const MaxSameAmountCount = constants.maxRecipientsSameMultiout;
    const MaxDiffAmountCount = constants.maxRecipientsMultiout;
    const recipientCount = Object.keys(parsedRecipientAmounts).length;
    if (!isSameAmount && recipientCount > MaxDiffAmountCount) {
      const message = `${this.translationService.getTranslation('csv_error_max_limit_multiout')} ${MaxDiffAmountCount}`;
      throw new Error(message);
    } else if (isSameAmount && recipientCount > MaxSameAmountCount) {
      const message = `${this.translationService.getTranslation('csv_error_max_limit_same_multiout')} ${MaxSameAmountCount}`;
      throw new Error(message);
    }
  }

  private assertValidAmount(amount: Amount): void {
    if (amount.lessOrEqual(Amount.Zero())) {
      const message = `${this.translationService.getTranslation('csv_error_invalid_amount')}`;
      throw new Error(message);
    }
  }

  public parse(data: string = ''): MultioutRecipientAmount[] {

    const recipientAmounts = data.trim().split(this.options.lineBreak);
    const parsedRecipientAmounts = {};
    let previousAmount: Amount = null;
    recipientAmounts
      .forEach((ra = '') => {
        const [recipient, amount] = ra.trim().split(this.options.delimiter);
        let recipientAddress, recipientAmount;
        try {
          recipientAddress = Address.create(recipient.trim());
          recipientAmount = Amount.fromSigna(amount.trim());
        } catch (e) {
          throw new Error(this.translationService.getTranslation('csv_error_unreadable_format'));
        }

        this.assertValidAmount(recipientAmount);
        this.assertNoDuplicate(parsedRecipientAmounts, recipientAddress);
        parsedRecipientAmounts[recipientAddress.getNumericId()] = recipientAmount.getPlanck();
        this.assertNoMaximumExceeded(parsedRecipientAmounts, previousAmount && recipientAmount.equals(previousAmount));
        previousAmount = recipientAmount;
      });
    const result = Object.keys(parsedRecipientAmounts).map(recipient => ({
        recipient,
        amountNQT: parsedRecipientAmounts[recipient]
      })
    );
    return result;
  }
}

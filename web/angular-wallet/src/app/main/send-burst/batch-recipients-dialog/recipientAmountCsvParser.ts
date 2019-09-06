import {MultioutRecipientAmount} from '@burstjs/core';

export interface RecipientAmountCsvParserOptions {
  delimiter: string;
  lineBreak: string;
}

const defaultOptions = {
  delimiter: ',',
  lineBreak: '\n'
};

export class RecipientAmountCsvParser {

  constructor(private options: RecipientAmountCsvParserOptions = defaultOptions) {

  }

  private static assertNoDuplicate(parsedRecipientAmounts: any, currentRecipient: string): void {
    if (parsedRecipientAmounts[currentRecipient]) {
      // TODO: i18n
      throw new Error('Parse Error: Duplicated Recipient:' + currentRecipient);
    }
  }

  private static assertNoMaximumExceeded(parsedRecipientAmounts: any, isSameAmount: boolean): void {
    const MaxSameAmountCount = 128;
    const MaxDiffAmountCount = 64;
    const recipientCount = Object.keys(parsedRecipientAmounts).length;
    if (!isSameAmount && recipientCount > MaxDiffAmountCount){
      throw new Error(`Parse Error: Maximum Limit (${MaxDiffAmountCount}) for Multiout exceeded`);
    }
    else if (isSameAmount && recipientCount > MaxSameAmountCount){
      throw new Error(`Parse Error: Maximum Limit (${MaxSameAmountCount}) for Same Multiout exceeded`);
    }
  }

  private static assertValidAmount(amountNQT: string, recipient: string): void {
    const int = parseInt(amountNQT, 10);
    if (Number.isNaN(int) || int <= 0){
      throw new Error('Parse Error: Invalid Amount:' +  recipient);
    }
  }

  public parse(data: string): MultioutRecipientAmount[] {

    const recipientAmounts = data.trim().split(this.options.lineBreak);
    const parsedRecipientAmounts = {};
    let previousAmountNQT = null;
    recipientAmounts
      .forEach(ra => {
        const [recipient, amountNQT] = ra.trim().split(this.options.delimiter);
        const trimmedAmountNQT = amountNQT.trim();
        const trimmedRecipient = recipient.trim();
        RecipientAmountCsvParser.assertValidAmount(trimmedAmountNQT, trimmedRecipient);
        RecipientAmountCsvParser.assertNoDuplicate(parsedRecipientAmounts, trimmedRecipient);
        parsedRecipientAmounts[trimmedRecipient] = trimmedAmountNQT;
        RecipientAmountCsvParser.assertNoMaximumExceeded(parsedRecipientAmounts, trimmedAmountNQT === previousAmountNQT);
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

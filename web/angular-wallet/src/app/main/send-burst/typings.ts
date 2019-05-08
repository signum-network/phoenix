import {
  RecipientType,
  RecipientValidationStatus
} from '../../layout/components/burst-recipient-input/burst-recipient-input.component';

export class Recipient {

  constructor(
    public addressRaw = '',
    public amountNQT = '',
    public addressRS = '',
    public status = RecipientValidationStatus.UNKNOWN,
    public type = RecipientType.UNKNOWN,
  ) {

  }
}

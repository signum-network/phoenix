export enum RecipientType {
  UNKNOWN = 0,
  ADDRESS = 1,
  ID,
  ALIAS,
  ZIL
}

export enum RecipientValidationStatus {
  UNKNOWN = 'unknown',
  INVALID = 'invalid',
  VALID = 'valid',
  ZIL_OUTAGE = 'zil_outage'
}

export class Recipient {

  constructor (
    public addressRaw = '',
    public addressRS = '',
    public status = RecipientValidationStatus.UNKNOWN,
    public type = RecipientType.UNKNOWN
  ) {

  }
}

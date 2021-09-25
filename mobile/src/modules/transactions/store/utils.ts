export enum RecipientType {
  UNKNOWN = 0,
  ADDRESS = 1,
  ID,
  ALIAS,
  UNSTOPPABLE,
}

export enum RecipientValidationStatus {
  UNKNOWN = "unknown",
  INVALID = "invalid",
  VALID = "valid",
  UNSTOPPABLE_OUTAGE = "unstoppable_outage",
}

export class Recipient {
  constructor(
    public addressRaw = "",
    public addressRS = "",
    public status = RecipientValidationStatus.UNKNOWN,
    public type = RecipientType.UNKNOWN
  ) {}
}

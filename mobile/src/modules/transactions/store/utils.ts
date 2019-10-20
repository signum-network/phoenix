export function parseURLParams (queryString: string): any {
  const query = {};
  const firstVar = queryString.indexOf('?');
  const pairs = (firstVar > -1 ? queryString.substr(firstVar + 1) : queryString).split('&');
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    // @ts-ignore
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

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

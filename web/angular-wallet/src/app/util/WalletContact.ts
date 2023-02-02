// @ts-ignore

export class WalletContact {
  public account: string;
  public name: string;
  constructor(data: any = {}) {
    this.account = data.accountId;
    this.name = data.name;
  }
}

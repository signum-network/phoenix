import { Account } from '..';

// TODO: review the relevance of this class
export abstract class Store {
    protected static readonly DATABASE_TABLE = "burst";
    public abstract init(): void;
    public abstract saveAccount(account: Account): Promise<Account>;
    public abstract findAccount(id: string): Promise<Account>;
    public abstract getSelectedAccount(): Promise<Account>;
    public abstract removeAccount(account: Account): Promise<boolean>;
}

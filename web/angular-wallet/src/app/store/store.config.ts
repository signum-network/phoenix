import { LokiLocalStorageAdapter } from 'lokijs';
import { constants } from 'app/constants';

export class StoreConfig {
    public databaseName: string;
    public persistenceAdapter: any;
}

const appConfigFactory = () => {
    const config = new StoreConfig();
    config.databaseName = constants.database;
    config.persistenceAdapter = new LokiLocalStorageAdapter();
    return config;
};

export {
    appConfigFactory
};

import { toNumber, toString } from "lodash";

// @ts-ignore-next-line WARNING: typescript can't check what we have in .env
// tslint:disable-next-line: max-line-length
import {
  BURSTALERTS_HOST_URL,
  CRYPTOCOMPARE_HOST_URL,
  DEFAULT_NODE_HOST,
  DEFAULT_PASSCODE_TIME,
  RELIABLE_NODE_HOSTS,
  BLACK_LISTED_ACCOUNT_IDS,
  TESTNET_NODE_HOSTS,
} from "react-native-dotenv";

// So we check it like this
// tslint:disable-next-line: max-line-length
if (
  !DEFAULT_NODE_HOST ||
  !DEFAULT_PASSCODE_TIME ||
  !CRYPTOCOMPARE_HOST_URL ||
  !BURSTALERTS_HOST_URL ||
  !RELIABLE_NODE_HOSTS ||
  !BLACK_LISTED_ACCOUNT_IDS
) {
  throw new Error("Incorrect .env config!");
}

const fromCsvString = (csv: string): string[] =>
  toString(csv)
    .split(";")
    .map((v) => v.trim())
    .filter((v) => !!v)

const defaultSettings = {
  nodeHost: toString(DEFAULT_NODE_HOST),
  reliableNodeHosts: fromCsvString(RELIABLE_NODE_HOSTS),
  testnetNodeHosts: fromCsvString(TESTNET_NODE_HOSTS),
  passcodeTime: toNumber(DEFAULT_PASSCODE_TIME),
  cryptoCompareURL: toString(CRYPTOCOMPARE_HOST_URL),
  burstAlertsURL: toString(BURSTALERTS_HOST_URL),
  blackListedAccountIds: fromCsvString(BLACK_LISTED_ACCOUNT_IDS),
};

console.log("Environment Settings:", defaultSettings);

export { defaultSettings };

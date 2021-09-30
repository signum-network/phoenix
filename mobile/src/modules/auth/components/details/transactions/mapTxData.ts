import { Transaction } from "@signumjs/core";
import { Amount, BlockTime } from "@signumjs/util";
import { startCase, toNumber } from "lodash";
import { formatAttachmentData } from "./formatAttachmentData";

export interface TxKeyValue {
  key: string;
  value: string;
}

const ExcludeList: string[] = [
  "ecBlockHeight",
  "ecBlockId",
  "blockTimestamp",
  "subtype",
  "transaction",
  "type"
];


const KeyValueMappers = {
  feeNQT: ({ value }: TxKeyValue): TxKeyValue => ({
    key: "Fee",
    value: Amount.fromPlanck(value).toString()
  }),
  amountNQT: ({ value }: TxKeyValue): TxKeyValue => ({
    key: "Amount",
    value: Amount.fromPlanck(value).toString()
  }),
  timestamp: ({ key, value }: TxKeyValue): TxKeyValue => ({
    key,
    value: `${value} - ${BlockTime.fromBlockTimestamp(toNumber(value))
      .getDate()
      .toISOString()}`
  }),
  attachment: ({ value }: TxKeyValue): TxKeyValue => ({
    key: "Payload",
    value: formatAttachmentData(value)
  })
};

// @ts-ignore
const mapKeyValueTuple = (
  { key, value }: TxKeyValue,
  tx: Transaction
): TxKeyValue => {
  const tuple = KeyValueMappers[key]
    // @ts-ignore
    ? KeyValueMappers[key]({ key, value }, tx)
    : { key, value };
  tuple.key = startCase(tuple.key);
  return tuple;
};

const compareKeyValueFn = (a: TxKeyValue, b: TxKeyValue): number => {
  if (a.key < b.key) {
    return -1;
  }
  if (a.key > b.key) {
    return 1;
  }
  return 0;
};

export function mapTxData(transaction: Transaction): TxKeyValue[] {
  return (
    Object.keys(transaction)
      .filter((key) => ExcludeList.indexOf(key) === -1)
      // @ts-ignore
      .map((key) => {
          // @ts-ignore
          const value = transaction[key];
          return mapKeyValueTuple(
            { key, value: typeof value === "object" ? JSON.stringify(value, null, "  ") : value.toString() },
            transaction
          );
        }
      )
      .sort(compareKeyValueFn)
  );
}

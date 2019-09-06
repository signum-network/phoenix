import { convertBurstTimeToDate } from '@burstjs/util';
import { i18n } from '../i18n';
import { core } from '../translations';

enum MonthKeys {
  JAN = 'JAN',
  FEB = 'FEB',
  MAR = 'MAR',
  APR = 'APR',
  MAY = 'MAY',
  JUN = 'JUN',
  JUL = 'JUL',
  AUG = 'AUG',
  SEP = 'SEP',
  OCT = 'OCT',
  NOV = 'NOV',
  DEC = 'DEC'
}

const months: string[] = [
  MonthKeys.JAN,
  MonthKeys.FEB,
  MonthKeys.MAR,
  MonthKeys.APR,
  MonthKeys.MAY,
  MonthKeys.JUN,
  MonthKeys.JUL,
  MonthKeys.AUG,
  MonthKeys.SEP,
  MonthKeys.OCT,
  MonthKeys.NOV,
  MonthKeys.DEC
];

export const getShortDateFromTimestamp = (ts: number) => {
  const date = convertBurstTimeToDate(ts);

  const day = date.getDate();
  const jsMonth = date.getMonth();
  const month = i18n.t(core.dates.months.short[months[jsMonth]]);
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const isSameDay = (d1: Date, d2: Date) => {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
};

import { convertBurstTimeToDate } from '@burstjs/util';
import { i18n } from '../i18n';
import { core } from '../translations';

export const getShortDateFromTimestamp = (ts: number) => {
  const date = convertBurstTimeToDate(ts);

  const day = date.getDate();
  const jsMonth = date.getMonth();
  const month = i18n.t(core.dates.months.short[jsMonth]);
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

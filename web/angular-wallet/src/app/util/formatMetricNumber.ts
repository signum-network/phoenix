export function formatMetricNumber(n: number|string, digits = 2): string {

  const number = typeof n === 'string' ? parseFloat(n) : n;

  if (isNaN(number) || number === null) {
    return null;
  }
  let abs = Math.abs(number);
  const rounder = Math.pow(10, 1);
  const isNegative = number < 0;
  let key = '';

  const powers = [
    {key: 'T', value: Math.pow(10, 12)},
    {key: 'B', value: Math.pow(10, 9)},
    {key: 'M', value: Math.pow(10, 6)},
    {key: 'K', value: 1000}
  ];

  for (let i = 0; i < powers.length; i++) {
    let reduced = abs / powers[i].value;
    reduced = Math.round(reduced * rounder) / rounder;
    if (reduced >= 1) {
      abs = reduced;
      key = powers[i].key;
      break;
    }
  }
  const value = abs.toFixed(Math.max(0, digits));
  return (isNegative ? '-' : '') + value + key;
}


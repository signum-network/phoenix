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

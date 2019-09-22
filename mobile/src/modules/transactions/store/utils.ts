export function parseURLParams(url: string): any {
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  const params = {};
  let match;
  // tslint:disable-next-line: no-conditional-assignment
  while (match = regex.exec(url)) {

  // @ts-ignore
    params[match[1]] = match[2];
  }
  return params;
}

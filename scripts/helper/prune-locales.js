/**
 * This script can be used to identify used translations in web/desktop wallet
 *
 * It will create json 'pruned-en.js' with only used translation tokens
 *
 */

const locale = require('../../web/angular-wallet/src/locales/en.json')
const {spawnSync} = require('child_process');
const {writeFileSync} = require('fs');

(() => {
  const pruned = {}
  Object.keys(locale).forEach(k => {
    console.log(`looking for [${k}]`)
    const grepResult = spawnSync('grep', ['-REo', '--exclude-dir=locales', k, '../../web/angular-wallet/src/app'])
    const hasFound = !!grepResult.output[1].toString('utf8').length
    if (hasFound) {
      console.log('Found')
      pruned[k] = locale[k]
    }
  })
  writeFileSync('pruned-en.json', JSON.stringify(pruned), {encoding:'utf8'})
})()

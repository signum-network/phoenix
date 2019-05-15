const flatten = require('lodash/flatten');
const semver = require('semver');
const {HttpImpl} = require("@burstjs/http");
const {version, update} = require("./package.json");

const PlatformFilePatterns = {
  darwin: [
    '.dmg',
    '-mac.zip'
  ],
  win32: [
    '.exe',
  ],
  linux: [
    '.tar.gz',
    '.deb',
    '.rpm',
    '.AppImage'
  ],
};


class UpdateService {


  constructor() {
    this.http = new HttpImpl(update.repositoryRootUrl)
  }

  _getPlatformSpecificAssets(assets, platform = process.platform) {
    return flatten(
      PlatformFilePatterns[platform]
        .map(p => assets
          .filter(({browser_download_url: url}) => url.endsWith(p))
          .map(a => a.browser_download_url)
        )
    )
  }

  checkForLatestRelease(callback) {
    this.http.get('/releases/latest').then(
      ({response}) => {
        const {assets, tag_name: releaseVersion, published_at} = response;
        if (semver.lt(version, releaseVersion)) {
          callback({
            assets: this._getPlatformSpecificAssets(assets),
            releaseVersion,
            published_at
          })
        }
      }
    )
  }

  start(callback) {
    console.info('Update Service started - current version:', version);
    this.checkForLatestRelease(callback);
    setInterval(this.checkForLatestRelease.bind(this, callback), update.checkIntervalMins * 60 * 1000)
  }
}

module.exports = new UpdateService();

const semver = require('semver');
const {HttpImpl} = require("@burstjs/http");
const {version, update} = require("./package.json");

class UpdateService {

  constructor() {
    this.http = new HttpImpl(update.repositoryRootUrl)
  }

  _checkForLatestRelease(callback) {
    this.http.get('/releases/latest').then(
      ({response}) => {
        const {assets, tag_name: releaseVersion} = response;
        if (semver.lt(version, releaseVersion)) {
          console.info("New version available:", releaseVersion);
          callback({assets, releaseVersion})
        }
      }
    )
  }

  start(callback) {
    console.info('Update Service started - current version:', version);
    this._checkForLatestRelease(callback);
    setInterval(this._checkForLatestRelease.bind(this, callback), update.checkIntervalMins * 60 * 1000)
  }
}

module.exports = new UpdateService();

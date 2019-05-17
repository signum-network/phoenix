const flatten = require('lodash/flatten');
const semver = require('semver');
const {HttpImpl} = require("@burstjs/http");
const getSSL = require('get-ssl-certificate');
import {validateSSL} from "ssl-validator";

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

function getRepositoryDomain() {
  const url = new URL(update.repositoryRootUrl);
  return url.host.substr(url.host.indexOf('.') + 1)
}

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

  async validateCertificate() {
    const domain = getRepositoryDomain();
    const repositoryCertificate = await getSSL.get(domain);

    const cert = repositoryCertificate.pemEncoded;

    try {
      await validateSSL(cert, {domain});
      return {
        isValid: true,
        issuer: cert.issuer.commonName,
        domain: cert.commonName,
        validThru: cert.validity.end
      }
    } catch (e) {
      console.warn("Certificate check failed");
      return {
        isValid: false
      }
    }
  }

  checkForLatestRelease(callback) {
    this.http.get('/releases/latest').then(
      async ({response}) => {
        const {assets, tag_name: releaseVersion, published_at} = response;
        if (semver.lt(version, releaseVersion)) {
          const validCert = await this.validateCertificate();
          callback({
            assets: this._getPlatformSpecificAssets(assets),
            releaseVersion,
            published_at,
            validCert
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

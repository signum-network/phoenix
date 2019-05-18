const flatten = require('lodash/flatten');
const semver = require('semver');
const {HttpImpl} = require("@burstjs/http");
const getSSL = require('get-ssl-certificate');
const {validateSSL} = require("ssl-validator");

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

  async validateCertificate(domain) {
    const cert = await getSSL.get(domain);
    try {
      await validateSSL(cert.pemEncoded, {domain});
      return {
        isValid: true,
        issuer: cert.issuer.O,
        domain: cert.subject.CN,
        validThru: cert.valid_to
      }
    } catch (e) {
      console.warn("Certificate check failed");
      return {
        isValid: false,
        issuer: cert.issuer.O,
        domain: cert.subject.CN,
        validThru: cert.valid_to
      };
    }
  }

  checkForLatestRelease(callback) {
    this.http.get('/releases/latest').then(
      async ({response}) => {
        const {
          assets,
          tag_name: releaseVersion,
          published_at: publishedAt,
          html_url: htmlUrl
        } = response;
        if (semver.lt(version, releaseVersion)) {
          const domain = getRepositoryDomain();
          const validCert = await this.validateCertificate(domain);
          callback({
            platform: process.platform,
            assets: this._getPlatformSpecificAssets(assets),
            htmlUrl,
            releaseVersion,
            publishedAt,
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

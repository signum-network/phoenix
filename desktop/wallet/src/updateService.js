const PropTypes = require('prop-types');
const _ = require('lodash');
const semver = require('semver');
const {HttpImpl} = require('@burstjs/http');
const getSSL = require('get-ssl-certificate');
const logger = require('./logger');

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


const ConfigPropTypes = {
  currentVersion: PropTypes.string.isRequired,
  repositoryRootUrl: PropTypes.string.isRequired,
  checkIntervalMins: PropTypes.number.isRequired,
  tagPrefix: PropTypes.string.isRequired
};

class UpdateService {

  constructor(config, httpImpl = null) {

    PropTypes.checkPropTypes(ConfigPropTypes, config);

    this.config = config;
    this.http = httpImpl ? httpImpl : new HttpImpl(config.repositoryRootUrl);
  }

  _getRepositoryDomain() {
    const url = new URL(this.config.repositoryRootUrl);
    return url.host.substr(url.host.indexOf('.') + 1)
  }

  _getPlatformSpecificAssets(assets, platform = process.platform) {
    return _.flatten(
      PlatformFilePatterns[platform]
        .map(p => assets
          .filter(({browser_download_url: url}) => url.endsWith(p))
          .map(a => a.browser_download_url)
        )
    )
  }

  async validateCertificate(domain, fingerprint) {
    const cert = await getSSL.get(domain);
    try {

      if(cert.subject.CN !== domain){
        throw new Error(`Invalid domain: {expected: ${domain}, received: ${cert.subject.CN}`);
      }

      if(new Date(cert.valid_to) < new Date()){
        throw new Error('Expired Certificate');
      }

      if(cert.fingerprint256 !== fingerprint){
        throw new Error(`Invalid fingerprint: {expected: ${fingerprint}, received: ${cert.fingerprint}`);
      }

      return {
        isValid: true,
        issuer: cert.issuer.O,
        domain: cert.subject.CN,
        validThru: cert.valid_to
      }
    } catch (e) {
      delete e.data;
      logger.error(`Certificate check failed: ${e.message}`, e);
      return {
        isValid: false,
        reason: e.message,
        issuer: cert.issuer.O,
        domain: cert.subject.CN,
        validThru: cert.valid_to
      };
    }
  }

  getLatestRelease() {
    return this.http.get('/releases')
      .then(({response: releases}) => {
        return _.chain(releases)
          /* eslint-disable camelcase */
          .filter(release => !release.draft && release.tag_name.startsWith(this.config.tagPrefix))
          .sortBy('published_at')
          .reverse()
          .head()
          .value()
      })
  }

  async checkForLatestRelease(callback) {
    try {
      logger.info('Checking for new version...');

      const release = await this.getLatestRelease();
      if (!release) return callback(null);

      const {
        assets,
        tag_name,
        published_at: publishedAt,
        html_url: htmlUrl
      } = release;

      const { tagPrefix, currentVersion, certFingerprint } = this.config;

      const releaseVersion = tag_name.replace(tagPrefix, '');
      if (!semver.lt(currentVersion, releaseVersion)) {
        logger.info(`Latest version installed: ${currentVersion}`);
        return callback(null);
      }

      logger.info(`Found a new version: ${releaseVersion}`);
      const domain = this._getRepositoryDomain();
      const validCert = await this.validateCertificate(domain, certFingerprint);
      callback({
        platform: process.platform,
        assets: this._getPlatformSpecificAssets(assets),
        htmlUrl,
        releaseVersion,
        publishedAt,
        validCert
      })
    } catch (e) {
      delete e.data;
      logger.error(e.message, e);
    }
  }

  start(callback) {
    this.checkForLatestRelease(callback);
    setInterval(this.checkForLatestRelease.bind(this, callback), this.config.checkIntervalMins * 60 * 1000)
  }
}

module.exports = UpdateService;

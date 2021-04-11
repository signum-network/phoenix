const {HttpMockBuilder} = require('@burstjs/http');
const UpdateService = require('../src/updateService');

const releaseMock = require('./releaseMock.json');
const releasesMock = require('./releasesMock.json');
const {createVoidLogger} = require("../src/logger");

const containsUrlThatEndsWith = urls => suffix => urls.filter(url => url.endsWith(suffix)).length > 0;

const config = {
  currentVersion: '1.0.0-beta.5',
  repositoryRootUrl: 'https://api.github.com/repos/burst-apps-team/phoenix',
  checkIntervalMins: 1,
  tagPrefix: 'desktop-',
  certFingerprint: 'fingerprint'
};

const logger = createVoidLogger()

describe('Update Service', () => {

  describe('_getRepositoryDomain', () => {
    const updateService = new UpdateService(config);
    it('returns the correct domain', () => {
      expect(updateService._getRepositoryDomain()).toBe('github.com');
    })
  });

  describe('_getPlatformSpecificAssets', () => {

    const updateService = new UpdateService(config,logger);

    it('for darwin (MacOS)', () => {
      const platformSpecificAssets = updateService._getPlatformSpecificAssets(releaseMock.assets, 'darwin');

      const oneEndsWith = containsUrlThatEndsWith(platformSpecificAssets);
      expect(platformSpecificAssets).toHaveLength(2);
      expect(oneEndsWith('.dmg')).toBeTruthy();
      expect(oneEndsWith('-mac.zip')).toBeTruthy();

    });

    it('for linux', () => {
      const platformSpecificAssets = updateService._getPlatformSpecificAssets(releaseMock.assets, 'linux');
      const oneEndsWith = containsUrlThatEndsWith(platformSpecificAssets);
      expect(platformSpecificAssets).toHaveLength(4);
      expect(oneEndsWith('.AppImage')).toBeTruthy();
      expect(oneEndsWith('.deb')).toBeTruthy();
      expect(oneEndsWith('.tar.gz')).toBeTruthy();
      expect(oneEndsWith('.rpm')).toBeTruthy();
    });

    it('for win32', () => {
      const platformSpecificAssets = updateService._getPlatformSpecificAssets(releaseMock.assets, 'win32');
      const atLeastOneEndsWith = containsUrlThatEndsWith(platformSpecificAssets);
      expect(platformSpecificAssets).toHaveLength(2);
      expect(atLeastOneEndsWith('.exe')).toBeTruthy();
    })
  });

  describe('getLatestRelease', () => {

    it('get the latest desktop release', async () => {
      const httpMock = HttpMockBuilder.create().onGetReply(200, releasesMock).build();
      const updateService = new UpdateService(config, logger, httpMock);

      updateService.validateCertificate = jest.fn(() => ({
        isValid: true,
        issuer: 'issuer',
        domain: 'domain',
        validThru: new Date()
      }));

      const newVersion = await updateService.getLatestRelease();
      expect(newVersion.tag_name).toBe('desktop-1.0.0-beta.6');
    });

    it('no latest version available', async () => {

      const _config = {
        currentVersion: "1.0.0-beta.6",
        repositoryRootUrl: "https://api.github.com/repos/burst-apps-team/phoenix",
        checkIntervalMins: 1,
        tagPrefix: "unknown-prefix-"
      };

      const httpMock = HttpMockBuilder.create().onGetReply(200, releasesMock).build();
      const updateService = new UpdateService(_config, logger, httpMock);

      updateService.validateCertificate = jest.fn(() => ({
        isValid: true,
        issuer: 'issuer',
        domain: 'domain',
        validThru: new Date()
      }));

      const newVersion = await updateService.getLatestRelease();
      expect(newVersion).toBeUndefined();
    });


    it('error on invocation', async () => {

      const httpMock = HttpMockBuilder.create().onGetThrowError(404, 'error message').build();
      const updateService = new UpdateService(config, logger, httpMock);

      updateService.validateCertificate = jest.fn(() => ({
        isValid: true,
        issuer: 'issuer',
        domain: 'domain',
        validThru: new Date()
      }));

      try {
        await updateService.getLatestRelease();
        expect(false).toBe('Expects and error');
      } catch (e) {
        expect(e).toBeDefined();
      }

    })

  });


  describe('checkForLatestRelease', () => {

    it('calls callback with newest version info', (done) => {
      const httpMock = HttpMockBuilder.create().onGetReply(200, releasesMock).build();
      const updateService = new UpdateService(config, logger, httpMock);

      const validThruDate = new Date();
      updateService.validateCertificate = jest.fn(() => ({
        isValid: true,
        issuer: 'issuer',
        domain: 'domain',
        validThru: validThruDate
      }));

      updateService.checkForLatestRelease((newVersion) => {
        expect(updateService.validateCertificate).toBeCalledWith('github.com', 'fingerprint');
        expect(newVersion).toEqual({
          platform: process.platform,
          assets:
            ['https://github.com/burst-apps-team/phoenix/releases/download/v1.0.0-beta.6/phoenix-1.0.0-beta.6.tar.gz',
              'https://github.com/burst-apps-team/phoenix/releases/download/v1.0.0-beta.6/phoenix_1.0.0-beta.6_amd64.deb',
              'https://github.com/burst-apps-team/phoenix/releases/download/v1.0.0-beta.6/phoenix-1.0.0-beta.6.x86_64.rpm',
              'https://github.com/burst-apps-team/phoenix/releases/download/v1.0.0-beta.6/phoenix-1.0.0-beta.6-x86_64.AppImage'],
          htmlUrl: 'https://github.com/burst-apps-team/phoenix/releases/tag/v1.0.0-beta.6',
          releaseVersion: '1.0.0-beta.6',
          publishedAt: '2019-05-09T14:23:17Z',
          validCert:
            {
              isValid: true,
              issuer: 'issuer',
              domain: 'domain',
              validThru: validThruDate
            }
        });
        done()
      })
    });

    it('calls callback with null, as no newer version is available', (done) => {
      const httpMock = HttpMockBuilder.create().onGetReply(200, releasesMock).build();
      const _config = {
        currentVersion: '1.0.0-beta.6', // <<< already on newest version
        repositoryRootUrl: 'https://api.github.com/repos/burst-apps-team/phoenix',
        checkIntervalMins: 1,
        tagPrefix: 'desktop-'
      };
      const updateService = new UpdateService(_config, logger, httpMock);

      const validThruDate = new Date();
      updateService.validateCertificate = jest.fn(() => ({
        isValid: true,
        issuer: 'issuer',
        domain: 'domain',
        validThru: validThruDate
      }));

      updateService.checkForLatestRelease((newVersion) => {
        expect(updateService.validateCertificate).not.toBeCalled();
        expect(newVersion).toBeNull();
        done()
      })
    })
  })
});

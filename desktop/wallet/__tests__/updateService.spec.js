const {HttpMockBuilder} = require("@burstjs/http");
const UpdateService = require('../updateService');

const releaseMock = require('./releaseMock.json');
const releasesMock = require('./releasesMock.json');

const containsUrlThatEndsWith = urls => suffix => urls.filter(url => url.endsWith(suffix)).length > 0;

const config = {
  currentVersion: "1.0.0-beta.5",
  repositoryRootUrl: "https://api.github.com/repos/burst-apps-team/phoenix",
  checkIntervalMins: 1,
  tagRegex: "^desktop-"
};

describe('Update Service', () => {

  describe('_getPlatformSpecificAssets ', () => {

    const updateService = new UpdateService(config);

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
      const updateService = new UpdateService(config, httpMock);

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
        tagRegex: "^desktop-"
      };

      const httpMock = HttpMockBuilder.create().onGetReply(200, releasesMock).build();
      const updateService = new UpdateService(_config, httpMock);

      updateService.validateCertificate = jest.fn(() => ({
        isValid: true,
        issuer: 'issuer',
        domain: 'domain',
        validThru: new Date()
      }));

      const newVersion = await updateService.getLatestRelease();
      expect(newVersion).toBeUndefined();
    })

  });


  describe('checkForLatestRelease', () => {

    it('get the latest desktop release', (done) => {
      const httpMock = HttpMockBuilder.create().onGetReply(200, releasesMock).build();
      const updateService = new UpdateService(config, httpMock);

      updateService.validateCertificate = jest.fn(() => ({
        isValid: true,
        issuer: 'issuer',
        domain: 'domain',
        validThru: new Date()
      }));

      updateService.checkForLatestRelease((newVersion) => {
        console.log(newVersion)
        done()
      })
    })

  })

});

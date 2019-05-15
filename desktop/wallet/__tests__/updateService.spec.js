const updateService = require('../updateService');

const releaseMock = require('./releaseMock.json');


const containsUrlThatEndsWith = urls => suffix => urls.filter( url => url.endsWith(suffix)).length > 0;


describe('Update Service', () => {

  describe('_getPlatformSpecificAssets ', () => {
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
  })

});

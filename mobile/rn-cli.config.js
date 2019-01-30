const metro = require('metro')
const path = require('path')

module.exports = {
  resolver: {
    blacklistRE: metro.createBlacklist([
      /@burstjs\/crypto\/node_modules\/.*/,
      /@burstjs\/http\/node_modules\/.*/,
      /@burstjs\/core\/node_modules\/.*/
    ]),
    extraNodeModules: new Proxy({}, {
      get: (target, name) => path.join(process.cwd(), `node_modules/${name}`)
    })
  },
  watchFolders: [
    path.join(process.cwd(), '../lib/packages/crypto'),
    path.join(process.cwd(), '../lib/packages/core'),
    path.join(process.cwd(), '../lib/packages/http'),
  ],
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
};

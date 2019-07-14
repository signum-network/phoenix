global.Buffer = global.Buffer || require('buffer').Buffer;
global.regeneratorRuntime = require("regenerator-runtime");

const path = require('path');
const { app, BrowserWindow, Menu, shell, ipcMain, protocol } = require('electron');
const { download } = require('electron-dl');

const { version, update } = require('./package.json');
const UpdateService = require('./src/updateService');
const TransportNodeHid = require('@ledgerhq/hw-transport-node-hid').default;

let win;
let downloadHandle;

const updateService = new UpdateService({
  currentVersion: version,
  ...update
});
const isDevelopment = process.env.development;

const isLinux = () => process.platform === 'linux';
const isMacOS = () => process.platform === 'darwin';
const isWindows = () => process.platform === 'win32';

const gotTheLock = app.requestSingleInstanceLock();

function handleLatestUpdate(newVersion) {
  win.webContents.send('new-version', newVersion);
}

function byteToHex(byte) {
  if (byte > 255 || byte < 0) {
    throw new Error('Byte out of bounds');
  }
  let accountIndexHex = byte.toString(16);
  if (accountIndexHex.length === 1) {
    accountIndexHex = '0' + accountIndexHex;
  }
  return accountIndexHex;
}

async function ledgerGetPublicKey(event, arg) {
  try {
    const transport = await TransportNodeHid.create();
    const accountIndex = parseInt(arg);
    // todo: move this to a shared fn
    let accountIndexHex = accountIndex.toString(16);
    if (accountIndexHex.length === 1) {
      accountIndexHex = '0' + accountIndexHex;
    }
    const publicKey = await transport.exchange(Buffer.from('800400' + accountIndexHex + '00', 'hex'));
    event.returnValue = publicKey.toString('hex').substr(0, 64);
  } catch (e) {
    event.returnValue = "Error: " + e.toString();
  }
}

async function ledgerSign(event, arg) {
  try {
    console.log("Made it!");
    const transport = await TransportNodeHid.create();
    const {accountIndex, message} = arg;
    let offset = 0;
    while (offset !== message.length) {
      let chunk;
      if (message.length - offset > 510) {
        chunk = message.substr(offset, 510);
      } else {
        chunk = message.substr(offset);
      }
      let apdu = '8002';
      const final = (offset + chunk.length) === message.length;
      apdu += final ? '80' : '00';
      apdu += byteToHex(accountIndex);
      apdu += byteToHex(chunk.length / 2);
      apdu += chunk;
      offset += chunk.length;
      console.log("sending " + apdu);
      console.log("chunk " + chunk);
      const result = await transport.exchange(Buffer.from(apdu, 'hex'));
      console.log("response: " + result.toString('hex').substr(0, 128));
      if (final) {
        event.returnValue = result.toString('hex').substr(0, 128);
      }
    }
  } catch (e) {
    event.returnValue = "Error: " + e.toString();
    // 80028000b60115b5eb3809a00528ca53dceb5bd0b2069605515e3d0bf7443196c9d485e9bc3b9f56e6b3b3c95b00000000000000000000000000000000306e16000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c7f10000724516c82407cfee010161010062
    // 0115b5eb3809a00528ca53dceb5bd0b2069605515e3d0bf7443196c9d485e9bc3b9f56e6b3b3c95b00000000000000000000000000000000306e16000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c7f10000724516c82407cfee010161010062
    // 0115b5eb3809a00528ca53dceb5bd0b2069605515e3d0bf7443196c9d485e9bc3b9f56e6b3b3c95b00000000000000000000000000000000306e160000000000000000000000000000000000000000000000000000000000000000000000000004d589bda650c5027746b797cee2d10c6d631c4ae74c76f27d0ec71601388307802bf2b9521584640df7c9fc0c96c97bc9886fb7b9cf417679c18bc9ef0153f100000000c7f10000724516c82407cfee010161010062
    // 04d589bda650c5027746b797cee2d10c6d631c4ae74c76f27d0ec71601388307802bf2b9521584640df7c9fc0c96c97bc9886fb7b9cf417679c18bc9ef0153f1
  }
}

function getBrowserWindowConfig() {
  const commonConfig = {
    icon: path.join(__dirname, 'assets/images/png/64x64.png'),
    center: true,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  };
  return isDevelopment ? {
    ...commonConfig,
    fullscreen: false,
    width: 800,
    height: 600
  } :
    {
      ...commonConfig,
    }
}

function createWindow() {

  const distPath = path.join(__dirname, './dist');
  win = new BrowserWindow(getBrowserWindowConfig());
  win.loadURL(`file://${distPath}/index.html`);
  win.maximize();
  win.show();

  win.on('closed', function () {
    win = null
  });

  const template = [
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Burst Wiki',
          click() {
            shell.openExternal('https://burstwiki.org/');
          }
        },
        {
          label: 'Burst Faucet',
          click() {
            shell.openExternal('http://faucet.burst-alliance.org:8080/');
          }
        },
        {
          label: 'Report A Suggestion',
          click() {
            shell.openExternal('https://github.com/burst-apps-team/phoenix/issues/new?assignees=&labels=enhancement,web,desktop&template=feature_request.md&title=');
          }
        },
        {
          label: 'Report An Issue',
          click() {
            shell.openExternal('https://github.com/burst-apps-team/phoenix/issues/new?assignees=&labels=bug,web,desktop&template=bug_report.md&title=');
          }
        },
        {
          label: 'Check for update',
          click() {
            updateService.checkForLatestRelease((newVersion) => {
              if (!newVersion) {
                win.webContents.send('new-version-check-noupdate');
                return;
              }
              handleLatestUpdate(newVersion);
            })
          }
        },
        {
          label: 'Credits',
          selector: 'orderFrontStandardAboutPanel:'
        }
      ]
    }
  ];

  if (isMacOS()) {
    template.unshift({
      label: app.getName(),

      submenu: [

        { label: `About ${app.getName()}`, selector: 'orderFrontStandardAboutPanel:' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        {
          role: 'quit', accelerator: 'Command+Q', click: () => {
            app.quit();
          }
        }
      ]
    });

    // Edit menu
    template[1].submenu.push(
      { type: 'separator' },
      {
        label: 'Speech',
        submenu: [
          { role: 'startspeaking' },
          { role: 'stopspeaking' }
        ]
      }
    );

    // Window menu
    template[3].submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ];
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

}

function downloadUpdate($event, assetUrl) {
  download(win, assetUrl, {
    openFolderWhenDone: true,
    saveAs: true,
    onStarted: (handle) => {
      downloadHandle = handle;
      win.webContents.send('new-version-download-started');
    },
    onProgress: (progress) => {
      if (progress === 1) {
        downloadHandle = null;
        win.webContents.send('new-version-download-finished');
      }
    }
  })
}

function onReady() {
  createWindow();

  if (win && win.webContents) {
    win.webContents.on('did-finish-load', () => {
      updateService.start((newVersion) => {
        if (newVersion) {
          handleLatestUpdate(newVersion);
        }
      });

      // Deeplinks for initial startup
      process.argv.forEach((arg) => {
        if (/^burst:\/\//.test(arg)) {
          win.webContents.send('deep-link-clicked', arg);
        }
      });
    });
  }
  ipcMain.on('new-version-asset-selected', downloadUpdate);
  ipcMain.on('ledger-get-public-key', ledgerGetPublicKey);
  ipcMain.on('ledger-sign', ledgerSign);

  app.setAsDefaultProtocolClient('burst');
}

function logEverywhere(s) {
  if (win && win.webContents) {
    win.webContents.executeJavaScript(`console.log("${s}")`);
  }
}

if (!gotTheLock) {
  app.quit();
} else {

  // Someone tried to run a second instance, we should focus our window.
  app.on('second-instance', (e, argv) => {
    if (win) {

      // Deeplinks for Windows
      argv.forEach((arg) => {
        if (/^burst:\/\//.test(arg)) {
          if (win.webContents) {
            win.webContents.send('deep-link-clicked', arg);
          }
        }
      });

      if (win.isMinimized()) {
        win.restore();
      }
      win.focus();
    }
  })

  app.on('ready', onReady);

  app.on('will-finish-launching', () => {
    // Deeplinks for OSX
    app.on('open-url', (e, url) => {
      e.preventDefault();
      if (win && win.webContents) {
        logEverywhere(url);
        win.webContents.send('deep-link-clicked', url);
      }
    })
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', function () {

    if (downloadHandle) {
      downloadHandle.cancel();
    }

    // On macOS specific close process
    if (!isMacOS()) {
      app.quit();
    }
  });

  app.on('activate', function () {
    // macOS specific activate process
    if (win === null) {
      createWindow();
    }
  });
}

// TODO: need this for other OSes
if (isMacOS()) {
  app.setAboutPanelOptions({
    applicationName: app.getName(),
    applicationVersion: app.getVersion(),
    copyright: 'Burst Apps Team',
    credits: 'ohager, blankey1337',
    version: process.versions.electron
  });
}

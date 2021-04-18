const path = require('path');
const {app, BrowserWindow, Menu, shell, ipcMain, protocol} = require('electron');
const {download} = require('electron-dl');
const {context} =require('./src/context')

let win;
let downloadHandle;

const isLinux = () => process.platform === 'linux';
const isMacOS = () => process.platform === 'darwin';
const isWindows = () => process.platform === 'win32';

const gotTheLock = app.requestSingleInstanceLock();
const logger = context.getLogger()
const updateService = context.getUpdateService()

function handleLatestUpdate(newVersion) {
  win.webContents.send('new-version', newVersion);
}

function getBrowserWindowConfig() {
  const commonConfig = {
    icon: path.join(__dirname, 'assets/images/logos/phoenix.png'),
    center: true,
    show: false,
    webPreferences: {
      devTools: context.isDevToolsEnabled(),
      nodeIntegration: true,
      contextIsolation: false,
    }
  };
  return context.isDevelopmentMode() ? {
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
      label: 'File',
      submenu: [
        {
          label: 'Settings',
          click() {
            win.webContents.send('route-to', '/settings');
          }
        },
        {type: 'separator'},
        {role: 'quit'},
      ]
    },
    {
      label: "Edit",
      submenu: [
        {
          label: "Undo",
          accelerator: "CmdOrCtrl+Z",
          selector: "undo:"
        },
        {
          label: "Redo",
          accelerator: "Shift+CmdOrCtrl+Z",
          selector: "redo:"
        },
        {
          type: "separator"
        },
        {
          label: "Cut",
          accelerator: "CmdOrCtrl+X",
          selector: "cut:"
        },
        {
          label: "Copy",
          accelerator: "CmdOrCtrl+C",
          selector: "copy:"
        },
        {
          label: "Paste",
          accelerator: "CmdOrCtrl+V",
          selector: "paste:"
        },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          selector: "selectAll:"
        }
      ]
    },
    {
      label: 'View',
      submenu: context.isDevToolsEnabled() ? [
          {role: 'toggledevtools'},
          {type: 'separator'},
          {role: 'resetzoom'},
          {role: 'zoomin'},
          {role: 'zoomout'},
          {type: 'separator'},
          {role: 'togglefullscreen'}
        ] :
        [
          {role: 'togglefullscreen'},
          {type: 'separator'},
          {role: 'resetzoom'},
          {role: 'zoomin'},
          {role: 'zoomout'},
        ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'close'}
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

        {label: `About ${app.getName()}`, selector: 'orderFrontStandardAboutPanel:'},
        {type: 'separator'},
        {role: 'services'},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {
          role: 'quit', accelerator: 'Command+Q', click: () => {
            app.quit();
          }
        }
      ]
    });

    // Edit menu
    template[1].submenu.push(
      {type: 'separator'},
      {
        label: 'Speech',
        submenu: [
          {role: 'startspeaking'},
          {role: 'stopspeaking'}
        ]
      }
    );

    // Window menu
    template[3].submenu = [
      {role: 'close'},
      {role: 'minimize'},
      {role: 'zoom'},
      {type: 'separator'},
      {role: 'front'}
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
      handle.once('done', () => {
        downloadHandle = null;
        win.webContents.send('new-version-download-finished');

      })
    },
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

  app.setAsDefaultProtocolClient('burst');
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
        logger.info(`open-url: ${url}`)
        win.webContents.send('deep-link-clicked', url);
      }
    })
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', function () {

    if (downloadHandle) {
      try {
        downloadHandle.cancel();
      } catch (e) {
        logger.error(e);
      }
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

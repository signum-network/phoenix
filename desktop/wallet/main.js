const path = require('path');
const {app, BrowserWindow, Menu, shell, ipcMain} = require('electron');
const UpdateService = require('./updateService');
const {download} = require('electron-dl');

const {version, update} = require('./package.json');
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

  const distPath = path.join(__dirname, "./dist");
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
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'}
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'}
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
            updateService.checkForLatestRelease(handleLatestUpdate)
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

function handleLatestUpdate(newVersion) {
  if (newVersion){
    win.webContents.send('new-version', newVersion)
  }
}

function downloadUpdate($event, assetUrl){
  download(win, assetUrl, {
    openFolderWhenDone: true,
    saveAs: true,
    onStarted: (handle) => {
      downloadHandle = handle;
      win.webContents.send('new-version-download-started')
    },
    onProgress: (progress) => {
      if(progress === 1){
        downloadHandle = null;
        win.webContents.send('new-version-download-finished')
      }
    }
  })
}

function onReady() {
  createWindow();
  win.webContents.on('did-finish-load', () => {
    updateService.start(handleLatestUpdate);
  });
  ipcMain.on('new-version-asset-selected', downloadUpdate)
}

app.on('ready', onReady);

// TODO: need this for other OSes
if (isMacOS()) {
  app.setAboutPanelOptions({
    applicationName: app.getName(),
    applicationVersion: app.getVersion(),
    copyright: 'Burst Apps Team',
    credits: 'ohager, blankey1337, Matheus Castiglioni',
    version: process.versions.electron
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  if(downloadHandle){
    downloadHandle.cancel()
  }

  // On macOS specific close process
  if (!isMacOS()) {
    app.quit()
  }
});

app.on('activate', function () {
  // macOS specific activate process
  if (win === null) {
    createWindow()
  }
});

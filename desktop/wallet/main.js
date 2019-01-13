const path = require('path');
const { app, BrowserWindow } = require('electron');

let win;

const isDevelopment = process.env.development;

function getBrowserWindowConfig() {
    const commonConfig = {
        //icon: `file://${distPath}/dist/assets/logo.png`
    };
    return isDevelopment ? {
        ...commonConfig ,
        fullscreen: false,
        width: 800,
        height: 600
    } :
    {
        ...commonConfig,
    }
}

function createWindow () {

    const distPath = path.join(__dirname, "./dist");
    // Create the browser window.
    win = new BrowserWindow(getBrowserWindowConfig());

    win.loadURL(`file://${distPath}/index.html`);

    win.webContents.openDevTools();

    // Event when the window is closed.
    win.on('closed', function () {
        win = null
    })
}

// Create window on electron intialization
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // macOS specific activate process
    if (win === null) {
        createWindow()
    }
});

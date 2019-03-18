const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');

let win;

const isDevelopment = process.env.development;

function getBrowserWindowConfig() {
    const commonConfig = {
        icon: path.join(__dirname, 'assets/images/png/64x64.png')
    };
    return isDevelopment ? {
        ...commonConfig ,
        fullscreen: false,
        width: 800,
        height: 600
    } :
    {
        ...commonConfig,
        fullscreen: true,
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

    const template = [{
        label: "Phoenix",
        submenu: [
            { label: "About Phoenix", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]}, {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
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

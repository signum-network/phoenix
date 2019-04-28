const path = require('path');
const { app, BrowserWindow, Menu, shell } = require('electron');

let win;

const isDevelopment = process.env.development;

function getBrowserWindowConfig() {
    const commonConfig = {
        icon: path.join(__dirname, 'assets/images/png/64x64.png')
    };
    return isDevelopment ? {
        ...commonConfig,
        fullscreen: false,
        width: 800,
        height: 600
    } :
        {
            ...commonConfig,
            fullscreen: true,
        }
}

function createWindow() {

    const distPath = path.join(__dirname, "./dist");
    // Create the browser window.
    win = new BrowserWindow(getBrowserWindowConfig());

    win.loadURL(`file://${distPath}/index.html`);

    // win.webContents.openDevTools();

    // Event when the window is closed.
    win.on('closed', function () {
        win = null
    })

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
                    click() { shell.openExternal('https://burstwiki.org/'); }
                },
                {
                    label: 'Burst Faucet',
                    click() { shell.openExternal('http://faucet.burst-alliance.org:8080/'); }
                },
                {
                    label: 'Report A Suggestion',
                    click() { shell.openExternal('https://github.com/burst-apps-team/phoenix/issues/new?assignees=&labels=enhancement,web,desktop&template=feature_request.md&title='); }
                },
                {
                    label: 'Report An Issue',
                    click() { shell.openExternal('https://github.com/burst-apps-team/phoenix/issues/new?assignees=&labels=bug,web,desktop&template=bug_report.md&title='); }
                },
                {
                    label: 'Credits',
                    selector: 'orderFrontStandardAboutPanel:'
                }
            ]
        }
    ];

    if (process.platform === 'darwin') {
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
                { role: 'quit', accelerator: 'Command+Q', click: () => { app.quit(); } }
            ]
        })

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

// Create window on electron intialization
app.on('ready', createWindow);

if (process.platform === 'darwin') {
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

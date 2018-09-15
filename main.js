const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

let win

function createWindow() {

    win = new BrowserWindow({ width: 400, height: 220, frame: false, resizable: false, fullscreen: false, show: false })
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.once('ready-to-show', () => {
        win.show();
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
});
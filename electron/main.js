const {app, BrowserWindow} = require('electron');
// const path = require('path');
// require('electron-reloader')(module);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
      // preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('./index.html');
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

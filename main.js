const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('node:path');
const fs = require ('fs');

let win;

const createWindow = () => {
   win = new BrowserWindow({
    width: 800,
    height: 600,
       icon: __dirname + '/music/appicon.ico',
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
  }
  });

  win.loadFile('app.html');
};

// When Electron is ready, create the window
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

//this will listen for folder selection request from renderer 
ipcMain.handle('select-folder', async()=>{

  const result = await dialog.showOpenDialog(win, {
    properties:['openDirectory'] //this opens a folder selection window
  });

  if (result.canceled) return null;
  const folderPath = result.filePaths[0];

  //reading MP3 files from  the selected folder
  const files = fs.readdirSync(folderPath)
      .filter(file => file.endsWith('.mp3') || file.endsWith('.wav'))// this filters files for only mp3
      .map(file => ({
        title: file.replace(/\.[^/.]+$/, ""),
        src: path.join(folderPath, file)

      }));

      return files;
})

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('node:path');
const mm = require('music-metadata');
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


//extracting music metadata

async function extractMetadata(filePath) {
  try {
    
    const metadata = await mm.parseFile(filePath);
    const metadataExtracted = {
    picture: null,
    title: metadata.common.title || "Unknown title",
    artist: metadata.common.artist || "Unknown Artist",
    album: metadata.common.album || "Unknown Album",
    year: metadata.common.year || "Unknown Year"
    };

    const picture = metadata.common.picture;
    if (picture && picture.length > 0) {
      const cover = picture[0];
      const coverPath = path.join(app.getPath('userData'), `${Date.now()}_cover.jpg`);
      
      // Save the image as a file
      fs.writeFileSync(coverPath, cover.data);
      console.log("Cover saved at:", coverPath); //console printing for debugging
       metadataExtracted.picture = coverPath; //returning file path 
    } else {
      console.log("No cover photo found.");
    }

    return metadataExtracted;

  } catch (error) {
    console.error("Error extracting metadata:", error);
    return null;
  }
}

ipcMain.handle("get-metadata", async (_, filePath) => {
  return await extractMetadata(filePath);
});


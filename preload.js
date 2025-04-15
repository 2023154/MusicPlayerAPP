const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    getAlbumCover: (filePath) => ipcRenderer.invoke("get-album-cover", filePath),
    selectFolder: () => ipcRenderer.invoke("select-folder")
});


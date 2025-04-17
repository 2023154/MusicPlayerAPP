const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    getMetadata: (filePath) => ipcRenderer.invoke("get-metadata", filePath),
    selectFolder: () => ipcRenderer.invoke("select-folder"),
   getSavedFolder: () => ipcRenderer.invoke("get-saved-folder")
});


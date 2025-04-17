const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    getMetadata: (filePath) => ipcRenderer.invoke("get-metadata", filePath),
    selectFolder: () => ipcRenderer.invoke("select-folder"),
    getFilesFromPath: (folderPath) => ipcRenderer.invoke("get-files-from-path", folderPath)
});



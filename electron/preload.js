const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("api", {

    // Wallpaper
    send: (day, image) =>
        ipcRenderer.send("set-wallpaper", day, image),

    openFile: () =>
        ipcRenderer.invoke("open-file"),

    getWallpapers: () =>
        ipcRenderer.invoke("get-wallpapers"),

    openFolder: (imagePath) =>
    ipcRenderer.invoke("open-folder", imagePath),

getImageInfo: (imagePath) =>
    ipcRenderer.invoke("get-image-info", imagePath),

    // Settings
    getSettings: () =>
        ipcRenderer.invoke("get-settings"),

    saveSettings: (settings) =>
        ipcRenderer.invoke("save-settings", settings),

    // Open Settings Window
    openSettings: () =>
        ipcRenderer.send("open-settings")

})
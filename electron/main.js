const {
    app,
    BrowserWindow,
    ipcMain,
    dialog,
    Tray,
    Menu,
    shell
} = require("electron")

const path = require("path")
const fs = require("fs")
const { imageSize } = require("image-size")

const changeWallpaper = require("../changer.js")
const wallpaperLogic = require("../wallpaperLogic.js")

const {
    readSettings,
    saveSettings
} = require("../settings")

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
    app.quit()
    return
}

let tray = null
let win = null
let isQuiting = false
let settingsWindow = null

function createWindow() {

    const settings = readSettings()

    win = new BrowserWindow({

        width: 1280,
        height: 820,

        minWidth: 1100,
        minHeight: 700,

        show: settings.showWindowOnStartup,

        webPreferences: {

            preload: path.join(__dirname, "preload.js"),

            contextIsolation: true

        }

    })

    win.loadFile(path.join(__dirname, "../ui/index.html"))

    win.on("ready-to-show", () => {

        if (!settings.showWindowOnStartup) {

            win.hide()

        }

    })

    win.on("close", e => {

        if (!isQuiting) {

            e.preventDefault()

            win.hide()

        }

    })

}

function createSettingsWindow() {

    if (settingsWindow) {

        settingsWindow.focus()

        return

    }

    settingsWindow = new BrowserWindow({

        width: 520,

        height: 420,

        resizable: false,

        minimizable: false,

        maximizable: false,

        title: "Settings",

        parent: win,

        modal: true,

        webPreferences: {

            preload: path.join(__dirname, "settings-preload.js"),

            contextIsolation: true

        }

    })

    settingsWindow.removeMenu()

    settingsWindow.loadFile(

        path.join(__dirname, "settings.html")

    )

    settingsWindow.on("closed", () => {

        settingsWindow = null

    })

}

function createTray() {

    tray = new Tray(path.join(__dirname, "icon.png"))

    tray.setToolTip("Wallpaper of the Day")

    tray.setContextMenu(Menu.buildFromTemplate([

        {

            label: "Open App",

            click: () => {

                win.show()

                win.focus()

            }

        },

        {

            label: "Change Wallpaper Now",

            click: () => changeWallpaper()

        },

        {

            type: "separator"

        },

        {

            label: "Quit",

            click: () => {

                isQuiting = true

                app.quit()

            }

        }

    ]))

    tray.on("double-click", () => {

        if (!win) return

        if (win.isMinimized())
            win.restore()

        win.show()

        win.focus()

    })

}

app.on("second-instance", () => {

    if (!win) return

    if (win.isMinimized())
        win.restore()

    win.show()

    win.focus()

})

ipcMain.handle("open-file", async () => {

    const result = await dialog.showOpenDialog({

        properties: ["openFile"],

        filters: [

            {

                name: "Images",

                extensions: [

                    "png",

                    "jpg",

                    "jpeg",

                    "webp"

                ]

            }

        ]

    })

    if (result.canceled)

        return null

    return result.filePaths[0]

})

ipcMain.handle("get-wallpapers", () => {

    const { readData } = require("../storage")

    return readData()

})

ipcMain.handle("open-folder", async (event, imagePath) => {

    if (!imagePath)

        return

    shell.showItemInFolder(imagePath)

})

ipcMain.handle("get-image-info", (event, imagePath) => {

    if (!imagePath || !fs.existsSync(imagePath))
        return null

    try {

        const stats = fs.statSync(imagePath)

        const buffer = fs.readFileSync(imagePath)
        const dimensions = imageSize(buffer)

        const extension = path
            .extname(imagePath)
            .replace(".", "")
            .toUpperCase()

        const size =
            (stats.size / 1024 / 1024).toFixed(2) + " MB"

        return {

            width: dimensions.width,
            height: dimensions.height,
            extension,
            size

        }

    } catch (err) {

        console.error("IMAGE ERROR:", err)

        return null

    }

})

/* ===========================
   SETTINGS IPC
=========================== */

ipcMain.handle("get-settings", () => {

    return readSettings()

})

ipcMain.handle("save-settings", (event, settings) => {

    saveSettings(settings)

    if (app.isPackaged) {

        app.setLoginItemSettings({

            openAtLogin: settings.startup

        })

    }

    return true

})

ipcMain.on("open-settings", () => {

    createSettingsWindow()

})

/* ===========================
   WALLPAPER
=========================== */

ipcMain.on("set-wallpaper", (event, day, imagePath) => {

    wallpaperLogic(day, imagePath)

    const days = [

        "sunday",

        "monday",

        "tuesday",

        "wednesday",

        "thursday",

        "friday",

        "saturday"

    ]

    const today = days[new Date().getDay()]

    if (today === day.toLowerCase())

        changeWallpaper()

})

function scheduleMidnightUpdate() {

    const now = new Date()

    const next = new Date()

    next.setHours(24, 0, 0, 0)

    setTimeout(() => {

        changeWallpaper()

        scheduleMidnightUpdate()

    }, next - now)

}

app.whenReady().then(() => {

    if (app.isPackaged) {

        const settings = readSettings()

        app.setLoginItemSettings({

            openAtLogin: settings.startup

        })

    }

    createWindow()

    createTray()

    changeWallpaper()

    scheduleMidnightUpdate()

})

app.on("window-all-closed", e => {

    e.preventDefault()

})
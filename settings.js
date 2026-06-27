const fs = require("fs")
const path = require("path")
const { app } = require("electron")

const FILE_NAME = "settings.json"

function getSettingsPath() {
    return path.join(app.getPath("userData"), FILE_NAME)
}

function ensureSettingsFile() {

    const file = getSettingsPath()

    if (!fs.existsSync(file)) {

        const defaultSettings = {

            startup: true,

            showWindowOnStartup: true

        }

        fs.writeFileSync(
            file,
            JSON.stringify(defaultSettings, null, 2)
        )

    }

    return file

}

function readSettings() {

    const file = ensureSettingsFile()

    return JSON.parse(
        fs.readFileSync(file, "utf8")
    )

}

function saveSettings(settings) {

    const file = ensureSettingsFile()

    fs.writeFileSync(
        file,
        JSON.stringify(settings, null, 2)
    )

}

module.exports = {

    readSettings,

    saveSettings

}
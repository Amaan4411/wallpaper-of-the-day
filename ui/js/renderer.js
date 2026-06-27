console.log("renderer.js loaded")
let selectedImage = ""
let selectedDay = ""

async function init() {

    const data = await window.api.getWallpapers()

    buildDashboard(data)

    // Settings button
    const settingsBtn = document.getElementById("settings")

    if (settingsBtn) {

        settingsBtn.addEventListener("click", () => {

            window.api.openSettings()

        })

    }

}

async function pickWallpaperForDay(day) {

    selectedDay = day

    const filePath = await window.api.openFile()

    if (!filePath) return

    selectedImage = filePath

    window.api.send(day, filePath)

    const data = await window.api.getWallpapers()

    buildDashboard(data)

}

window.pickWallpaperForDay = pickWallpaperForDay

init()
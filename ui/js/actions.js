async function assignWallpaper(day) {

    const filePath = await window.api.openFile()

    if (!filePath) return

    window.api.send(day, filePath)

    const data = await window.api.getWallpapers()

    buildDashboard(data)

}

window.assignWallpaper = assignWallpaper
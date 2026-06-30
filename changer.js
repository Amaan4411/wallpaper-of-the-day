const { readData } = require("./storage")

async function changeWallpaper() {
  try {
    const wallpaper = await import("wallpaper")

    const data = readData()

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
    // console.log("TODAY IS:", today)
    const imagePath = data.wallpapers[today]

    if (!imagePath) {
      console.log("No wallpaper set for today.")
      return
    }

    console.log("Changing wallpaper to:", imagePath)

await wallpaper.setWallpaper(imagePath)

console.log("Wallpaper API finished.")

    console.log("Wallpaper changed successfully:")
    console.log(imagePath)

  } catch (err) {
    console.error("Wallpaper error:")
    console.error(err)
  }
}

module.exports = changeWallpaper
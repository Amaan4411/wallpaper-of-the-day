const { readData, saveData } = require("./storage")

function wallpaperLogic(day, imagePath) {
  day = day.toLowerCase()

  const validDays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ]

  if (!validDays.includes(day)) {
    console.log("Invalid day")
    return
  }

  const data = readData()

  data.wallpapers[day] = imagePath

  saveData(data)

  console.log("UPDATED SUCCESSFULLY:", day, imagePath)
}

module.exports = wallpaperLogic
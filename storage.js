const fs = require("fs")
const path = require("path")
const { app } = require("electron")

const FILE_NAME = "wallpapers.json"

function getDataPath() {
  return path.join(app.getPath("userData"), FILE_NAME)
}

function ensureDataFile() {
  const file = getDataPath()

  if (!fs.existsSync(file)) {
    const defaultData = {
      lastDate: "",
      wallpapers: {
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      }
    }

    fs.writeFileSync(file, JSON.stringify(defaultData, null, 2))
    // console.log("Created:", file)
  }

  return file
}

function readData() {
  const file = ensureDataFile()
  return JSON.parse(fs.readFileSync(file, "utf8"))
}

function saveData(data) {
  const file = ensureDataFile()
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

module.exports = {
  readData,
  saveData,
  getDataPath
}
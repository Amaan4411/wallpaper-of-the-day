const DAYS = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
]

let currentDay = ""
let currentImage = ""

function capitalize(day) {
    return day.charAt(0).toUpperCase() + day.slice(1)
}

// ==========================
// LIVE COUNTDOWN
// ==========================

function updateCountdown() {

    const now = new Date()

    const midnight = new Date()

    midnight.setHours(24, 0, 0, 0)

    const diff = midnight - now

    const hours = Math.floor(diff / (1000 * 60 * 60))

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    document.getElementById("countdown").textContent =
        `${hours}h ${minutes}m`

}

setInterval(updateCountdown, 60000)

// ==========================
// HERO
// ==========================

function updateHero(day, imagePath) {

    currentDay = day
    currentImage = imagePath

    const hero = document.querySelector(".hero-image")

    if (imagePath) {

        hero.innerHTML = `
            <img
                src="${imagePath}"
                class="hero-wallpaper"
                draggable="false"
            >
        `

    } else {

        hero.innerHTML = `
            <div class="placeholder hero-placeholder">

                No Wallpaper Selected

            </div>
        `

    }

    document.getElementById("hero-day").textContent =
        capitalize(day)

    document.getElementById("hero-file").textContent =
        imagePath
            ? imagePath.split("\\").pop()
            : "No wallpaper selected"

    // ==========================
    // REAL IMAGE RESOLUTION
    // ==========================

if (imagePath) {

    window.api.getImageInfo(imagePath).then(info => {

        if (!info) return

        document.getElementById("hero-resolution").textContent =
            `${info.width} × ${info.height} • ${info.extension} • ${info.size}`

    })

} else {

    document.getElementById("hero-resolution").textContent =
        "Resolution: --"

} 

}

// ==========================
// DAY CARD
// ==========================

function createDayCard(day, imagePath) {

    const card = document.createElement("div")

    card.className = "day-card"

    const today = DAYS[new Date().getDay()]

    card.innerHTML = `

        <div class="card-image">

            ${
                imagePath
                ? `<img src="${imagePath}" draggable="false">`
                : `<div class="placeholder">+</div>`
            }

            ${
                today === day
                ? `<span class="today-badge">TODAY</span>`
                : ""
            }

        </div>

        <div class="card-info">

            <h3>${capitalize(day)}</h3>

            <p>

                ${
                    imagePath
                    ? "Wallpaper Assigned"
                    : "Double Click to Add"
                }

            </p>

        </div>

    `

    card.addEventListener("click", () => {

        updateHero(day, imagePath)

    })

    card.addEventListener("dblclick", async () => {

        await window.assignWallpaper(day)

    })

    return card

}

// ==========================
// DASHBOARD
// ==========================

function buildDashboard(data) {

    const container = document.querySelector(".cards")

    container.innerHTML = ""

    const today = DAYS[new Date().getDay()]

    let scheduled = 0

    DAYS.forEach(day => {

        if (data.wallpapers[day])
            scheduled++

        container.appendChild(

            createDayCard(
                day,
                data.wallpapers[day]
            )

        )

    })

    updateHero(
        today,
        data.wallpapers[today]
    )

    updateCountdown()

   

}

// ==========================
// BUTTONS
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    const replaceBtn =
        document.getElementById("replaceBtn")

    const openFolderBtn =
        document.getElementById("folderBtn")

    if (replaceBtn) {

        replaceBtn.addEventListener("click", async () => {

            if (!currentDay) return

            await window.assignWallpaper(currentDay)

        })

    }

    if (openFolderBtn) {

        openFolderBtn.addEventListener("click", () => {

            if (!currentImage) {

                alert("No wallpaper selected.")

                return

            }

            window.api.openFolder(currentImage)

        })

    }

})
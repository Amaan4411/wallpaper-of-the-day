<div align="center">

<img src="ui/assets/logo.png" width="140">

# Wallpaper of the Day

### A modern Electron desktop application that automatically changes your Windows wallpaper every day.

![Platform](https://img.shields.io/badge/Platform-Windows-0078D6?style=for-the-badge)

![Electron](https://img.shields.io/badge/Electron-37.x-47848F?style=for-the-badge\&logo=electron)

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)

![Version](https://img.shields.io/badge/Version-v1.0.0-orange?style=for-the-badge)

![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

A clean, lightweight wallpaper scheduler built with Electron for Windows.

</div>

---

# 📸 Preview

## Dashboard

![Dashboard](screenshots/Dashboard.png)

---

## Weekly Schedule

![Weekly Schedule](screenshots/weekly-schedule.png)

---

## Settings

![Settings](screenshots/settings.png)

---

# ✨ Features

* 📅 Schedule a unique wallpaper for every day of the week
* 🖼️ Beautiful dashboard with live wallpaper preview
* ⏱️ Automatic wallpaper switching at midnight
* ⚙️ Start automatically with Windows
* 👻 Option to launch silently in the system tray
* 📂 Open wallpaper location instantly
* 📸 View wallpaper resolution, file type and file size
* 🎨 Modern dark-themed user interface
* 🔒 Single-instance protection
* 🚀 Lightweight and fast

---

# 🚀 Installation

## Clone the repository

```bash
git clone https://github.com/Amaan4411/wallpaper-of-the-day.git
```

## Open the project

```bash
cd wallpaper-of-the-day
```

## Install dependencies

```bash
npm install
```

## Start the application

```bash
npm start
```

---

# 🛠️ Built With

| Technology | Purpose             |
| ---------- | ------------------- |
| Electron   | Desktop Application |
| Node.js    | Backend             |
| JavaScript | Application Logic   |
| HTML5      | User Interface      |
| CSS3       | Styling             |

---

# 📂 Project Structure

```text
wallpaper-of-the-day
│
├── electron/
│   ├── main.js
│   ├── preload.js
│   ├── settings-preload.js
│   └── settings.html
│
├── ui/
│   ├── assets/
│   ├── css/
│   ├── js/
│   └── index.html
│
├── screenshots/
│
├── wallpapers/
│
├── changer.js
├── settings.js
├── storage.js
├── wallpaperLogic.js
├── wallpapers.json
├── package.json
└── README.md
```

---

# 🧠 How It Works

1. The user assigns a wallpaper to each day of the week.
2. The application stores the selected wallpaper paths.
3. Every midnight, the scheduler checks the current day.
4. The corresponding wallpaper is automatically applied.
5. The app continues running quietly in the Windows system tray.

---

# ⚙️ Settings

The application allows users to configure:

* Start with Windows
* Open Dashboard on Startup
* Silent background launch
* Replace wallpapers anytime
* Open wallpaper location instantly

---

# 🗺️ Roadmap

## Version 1.1

* 📚 Built-in Wallpaper Collections
* 🖥️ Multi-monitor Support
* 🎲 Random Wallpapers

## Future Plans

* ❤️ Favorite Wallpapers
* ☁️ Cloud Synchronization
* 📦 Downloadable Wallpaper Packs
* 🎨 Multiple Themes

---

# 🤝 Contributing

Contributions, ideas and feature suggestions are welcome.

Feel free to fork the repository, open issues or submit pull requests.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Amaan Shaikh**

Built with ❤️ using Electron and JavaScript.

If you like this project, consider giving it a ⭐ on GitHub.

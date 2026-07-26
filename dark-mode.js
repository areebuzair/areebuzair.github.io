window.addEventListener("DOMContentLoaded", () => {
    const themeButton = document.createElement("button");
    themeButton.setAttribute("type", "button")
    themeButton.setAttribute("id", "theme")
    themeButton.setAttribute("title", "Set display theme")

    const sunImage = document.createElement('img')
    sunImage.src = "./Assets/sun.svg"
    sunImage.className = "theme-icon"
    sunImage.alt = "sun"

    const moonImage = document.createElement('img')
    moonImage.src = "./Assets/moon.svg"
    moonImage.className = "theme-icon"
    moonImage.alt = "moon"

    themeButton.appendChild(sunImage)
    themeButton.appendChild(moonImage)

    document.body.appendChild(themeButton)

    let darkMode = !(localStorage.getItem("theme") == "false");
    const setTheme = () => {
        if (darkMode) {
            sunImage.style.scale = 0;
            moonImage.style.scale = 1;
            document.body.classList.add("dark");
        }
        else {
            sunImage.style.scale = 1;
            moonImage.style.scale = 0;
            document.body.classList.remove("dark");
        }
    }
    setTheme()

    themeButton.addEventListener('click', () => {
        darkMode = !darkMode;
        localStorage.setItem("theme", darkMode);
        setTheme();
    })
})
window.addEventListener("DOMContentLoaded", () => {

    document.body.innerHTML += `<button type="button" id="theme" title="Set theme">
            <img src="./Assets/moon.svg" id="moon" alt="moon">
            <img src="./Assets/sun.svg" id="sun" alt="sun">
        </button>`

    let darkMode = !(localStorage.getItem("theme") == "false");
    const setTheme = () => {
        const r = document.querySelector(':root');
        if (darkMode) {
            document.getElementById("sun").style.scale = 0;
            document.getElementById("moon").style.scale = 1;
            document.body.classList.add("dark");
        }
        else {
            document.getElementById("sun").style.scale = 1;
            document.getElementById("moon").style.scale = 0;
            document.body.classList.remove("dark");
        }
    }
    setTheme()
    document.getElementById("theme").addEventListener('click', () => {
        darkMode = !darkMode;
        localStorage.setItem("theme", darkMode);
        setTheme();
    })
})
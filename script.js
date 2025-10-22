"use strict";

window.addEventListener("load", () => {
    const root = document.querySelector(":root");
    window.addEventListener("mousemove", (e) => {
        root.style.setProperty("--mouse-x", `${e.clientX}px`);
        root.style.setProperty("--mouse-y", `${e.clientY}px`);
    });
})
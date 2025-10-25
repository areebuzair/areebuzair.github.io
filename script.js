"use strict";

window.addEventListener("load", () => {
    const root = document.querySelector(":root");
    window.addEventListener("mousemove", (e) => {
        root.style.setProperty("--mouse-x", `${e.clientX}px`);
        root.style.setProperty("--mouse-y", `${e.clientY}px`);
    });

    let sparkles = document.querySelectorAll(".sparkles");
    let sparkleContainer = document.querySelector(".sparkly-word");
    let i = 0;
    for (let sparkle of sparkles) {
        i++;
        setTimeout(() => {
            setInterval(() => {
                let x = Math.round(Math.random() * 100);
                let y = Math.round(Math.random() * 100);
                sparkle.style.top = `${x}%`;
                sparkle.style.left = `${y}%`;
                sparkle.style.transform = `translate(${-y}%, ${-x}%)`;
                sparkle.style.transformOrigin = `${-y + 50}% ${-x + 50}%`;
                sparkleContainer.appendChild(sparkle)
            }, 1000)
        }, i * 300)
    }

    const banners = document.querySelectorAll(".banner");
    const banner_container = document.querySelector("#affiliate-websites")
    window.addEventListener("scroll", () => {
        let { bottom, height, top } = banner_container.getBoundingClientRect();
        if (top <= window.innerHeight && bottom >= 0) {
            const factor = bottom / height * banners.length;
            banner_container.dataset.factor = factor;
            for (let b = 0; b < banners.length; b++) {
                let banner = banners[b];
                let f = Math.max(Math.min(factor - (banners.length - b - 1), 1), 0)
                banner.style.transform = `scale(${f})`;
                banner.style.opacity = `${f}`;
            }
        }
    })
})
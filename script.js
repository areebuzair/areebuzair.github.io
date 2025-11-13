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

    // let lastScrollPosition = window.pageYOffset;
    // const nav = document.querySelector("nav");
    window.addEventListener("scroll", () => {

        // if (window.pageYOffset - lastScrollPosition > 0) {
        //     nav.classList.remove("show-nav")
        // }
        // else {
        //     nav.classList.add("show-nav")
        // }
        // lastScrollPosition = window.pageYOffset;


        let { bottom, height, top } = banner_container.getBoundingClientRect();
        if (top <= window.innerHeight && bottom >= 0) {
            const factor = bottom / height * banners.length;
            banner_container.dataset.factor = factor;
            for (let b = 0; b < banners.length; b++) {
                let banner = banners[b];
                let f = Math.max(Math.min(factor - (banners.length - b - 1), 1), 0)
                banner.style.transform = `scale(${0.6 + 0.4 * f})`;
                banner.style.opacity = `${f}`;
            }
        }
    })

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains("animate")) {
                    entry.target.classList.add("animated")
                }
                if (entry.target.classList.contains("scroll-snap")) {
                    entry.target.scrollIntoView({ behavior: "smooth" });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    setTimeout(() => {
        document.querySelector(".loading-screen").classList.add("loaded");
    }, 500);

    setTimeout(() => {
        document.body.style.overflowY = "auto";
        document.querySelector(".loading-screen").style.display = "none";
        let animated_elements = document.querySelectorAll(".animate");
        for (let elem of animated_elements) {
            observer.observe(elem)
        }
        animated_elements = document.querySelectorAll(".scroll-snap");
        for (let elem of animated_elements) {
            observer.observe(elem)

        }
    }, 3000);


})
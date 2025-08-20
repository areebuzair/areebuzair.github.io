"use strict"

const { min, max } = Math;

const easingFunctions = {
    "": function (x) {
        return x;
    },
    "easeInOutQuart": function (x) {
        return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
    },
    "easeInOutExpo": function (x) {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
                    : (2 - Math.pow(2, -20 * x + 10)) / 2;
    },
    "step": function (x) {
        return Math.round(x);
    }
}

onload = () => {
    // Animated header text

    let texts = ["Front-End Developer", "Programmer", "Artist"];
    let anim = document.querySelector(".animated-text");

    function deleteChar() {
        if (anim.textContent != "") {
            let text = anim.textContent;
            anim.textContent = text.slice(0, -1);
            window.requestAnimationFrame(deleteChar);
        }
        else {
            texts.push(texts.shift());
            setTimeout(() => {
                addChar(texts[0]);
            }, 100);
        }
    }
    function addChar(text) {
        if (text != "") {
            let ch = text[0];
            text = text.slice(1);
            anim.textContent += ch;
            setTimeout(() => {
                addChar(text);
            }, 100);
        }
        else {
            setTimeout(deleteChar, 1000);
        }
    }
    deleteChar();

    // Nav-bar activation on scroll
    const sections = Array.from(document.getElementsByTagName('section')).map(element => {
        return element.id
    });

    let active = "";

    const scrollEffects = () => {
        let newActive = sections[0];
        for (let section of sections) {
            const { top, height } = document.getElementById(section).getBoundingClientRect()
            const H = window.innerHeight
            if (top < H / 3) {
                newActive = section;
            }
            if (top > H || top < -height) continue
            const ease = easingFunctions[document.getElementById(section).dataset.ease || ""]
            const fraction = ease(max(min(1.25 * (-top / (height - H)) - 0.125, 1), 0));
            document.getElementById(section).style.setProperty("--scroll-amount", fraction);
        }
        if (newActive == active) return;
        if (active) document.querySelector(`a[href='#${active}']`).classList.remove('active')
        active = newActive
        document.querySelector(`a[href='#${newActive}']`).classList.add('active')
    }
    scrollEffects()
    document.querySelector('main').addEventListener('scroll', scrollEffects)

    //Projects display
    const iframeContainer = document.querySelector(".iframe-container")
    const resizeButtons = document.querySelectorAll(".resize-button")
    for (let button of resizeButtons) {
        button.addEventListener("click", (e) => {
            let [w, h] = e.target.textContent.split("x");
            iframeContainer.style.width = w / 4 + "px";
            iframeContainer.style.height = h / 4 + "px";
        })
    }
}
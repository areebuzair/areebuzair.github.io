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

    // let texts = ["Front-End Developer", "Programmer", "Artist"];
    // let anim = document.querySelector(".animated-text");

    // function deleteChar() {
    //     if (anim.textContent != "") {
    //         let text = anim.textContent;
    //         anim.textContent = text.slice(0, -1);
    //         window.requestAnimationFrame(deleteChar);
    //     }
    //     else {
    //         texts.push(texts.shift());
    //         setTimeout(() => {
    //             addChar(texts[0]);
    //         }, 100);
    //     }
    // }
    // function addChar(text) {
    //     if (text != "") {
    //         let ch = text[0];
    //         text = text.slice(1);
    //         anim.textContent += ch;
    //         setTimeout(() => {
    //             addChar(text);
    //         }, 100);
    //     }
    //     else {
    //         setTimeout(deleteChar, 1000);
    //     }
    // }
    // deleteChar();

    //Mousemove
    const rootElement = document.querySelector(":root")
    // window.addEventListener("mousemove", (e)=>{
    //     rootElement.style.setProperty("--mouse-x", `${40 + e.clientX * 20 / innerWidth}%`);
    //     rootElement.style.setProperty("--mouse-y", `${40 + e.clientY * 20 / innerHeight}%`);
    // })

    // Nav-bar activation on scroll
    const sections = Array.from(document.getElementsByTagName('section')).map(element => {
        return element.id
    });

    //Create Navbar
    const navList = document.querySelector("nav ul")
    for(let id of sections){
        let li = document.createElement("li");
        let a = document.createElement("a")
        a.textContent = document.querySelector(`#${id} h2`).textContent;
        a.href = `#${id}`;
        li.appendChild(a);
        navList.appendChild(li);
    }

    let active = "";

    const scrollEffects = () => {
        let newActive = sections[0];
        for (let section of sections) {
            const { top, height, bottom } = document.getElementById(section).getBoundingClientRect()
            const H = window.innerHeight
            if (top < H / 3) {
                newActive = section;
            }
            if (top > H || top < -height) continue
            const ease = easingFunctions[document.getElementById(section).dataset.ease || ""]
            const fraction = ease(1 - max(min((bottom / (height)), 1), 0));
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

    //Projects Cards:
    fetch("./Assets/WebProjects.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // document.getElementById("loader-text").style.display = "none";
            // Handle the JSON data
            // console.log(data);
            document.getElementById("project-iframe").src = data[0].url;
            document.querySelector(".project-description").textContent = data[0].description;
            document.querySelector(".url-container a").textContent = data[0].url;
            document.querySelector(".url-container a").href = data[0].url;

            let container = document.querySelector(".projects-list");
            for (let item of data) {
                let card = document.createElement('div');
                card.className = "project-item";
                let card_url = document.createElement('a');
                card_url.href = item.url;
                card_url.textContent = item.name;
                card_url.target = "project-iframe";
                card_url.dataset.description = item.description;
                card_url.addEventListener("click", (e) => {
                    document.querySelector(".project-description").textContent = e.target.dataset.description;
                    document.querySelector(".url-container a").textContent = e.target.href;
                    document.querySelector(".url-container a").href = e.target.href;
                    document.querySelector("#projects").scrollIntoView()
                })
                card.appendChild(card_url);
                container.appendChild(card);
            }
        })
        .catch(error => {
            console.error('Error fetching the JSON file:', error);
            // document.getElementById("loader-text").innerHTML = "ERROR!";
            // document.getElementById("loader-text").className = "";
        });

}
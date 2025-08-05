window.onload = () => {
    // Replace 'your_file_path.json' with the actual path to your JSON file
    const jsonFilePath = './list.json';
    const images = [];
    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                document.getElementById("Container").innerHTML = "ERROR!";
            }
            return response.json();
        })
        .then(data => {
            // Handle the JSON data
            // console.log(data);
            let i = 0;
            let count = data.length;
            for (let name of data) {
                // console.log(name.folder_name)
                let a = document.createElement("a");
                a.href = `./WebCodes/${name.folder_name}`;
                a.target = "_blank";
                a.draggable = false;
                a.textContent = "Visit";
                let card = document.createElement('div')
                card.className = 'card'
                card.style.backgroundColor = `hsl(${360 * i / data.length}deg, 100%, 70%)`;
                card.style.backgroundImage = `url("./WebCodes/${name.folder_name}/preview.jpg")`

                let img = new Image()
                img.src = `./WebCodes/${name.folder_name}/preview.jpg`
                img.onload = () => {
                    count--;
                    if (count == 0) {
                        document.querySelector(".loading-screen").style.display = "none";
                    }
                    else {
                        document.querySelector(".loading-screen").textContent = `LOADING ${Math.floor((1 - count / data.length) * 100)}%`;
                    }
                }
                images.push(img);

                // a.textContent = name.folder_name.replaceAll("_", " ");
                card.dataset.title = name.folder_name.replaceAll("_", " ");
                card.appendChild(a)

                // let cardContainer = document.createElement('div')
                // cardContainer.className = 'cardContainer'
                // cardContainer.appendChild(card)
                // cardContainer.appendChild(img)

                document.getElementById("Container").appendChild(card);
                i++;
            }
        })
        .catch(error => {
            console.error('Error fetching the JSON file:', error);
            document.getElementById("Container").innerHTML = "ERROR!";
            document.querySelector(".loading-screen").style.display = "none";
        });

    let Container = document.getElementById('Container');
    let cards = document.getElementsByClassName('card');

    const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

    let animDur = 1200;
    if(isReduced){
        animDur = 0;
    }
    let mousedown = false, prevX = 0, container_progress = 0;
    function grab(e) {
        mousedown = true;
        prevX = e.clientX || e.touches[0].clientX;
    }
    function drag(e) {
        if (!mousedown) return;
        let X = e.clientX || e.touches[0].clientX;
        container_progress += (X - prevX) / window.innerWidth;
        // console.log({container_progress})
        container_progress = Math.max(Math.min(container_progress, 0), -1)
        prevX = X;
        Container.animate({
            transform: `translate(${container_progress * 100}%, -50%)`,
        }, { duration: animDur, fill: 'forwards', })
        for (let card of cards) {
            card.animate({
                backgroundPosition: `${100 + container_progress * 100}%, 50%`,
            }, { duration: animDur, fill: 'forwards', })
        }

    }
    function release(e) {
        mousedown = false;
    }

    Container.addEventListener('mousedown', grab);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', release);

    Container.addEventListener('touchstart', grab);
    window.addEventListener('touchmove', drag);
    window.addEventListener('touchend', release);

    let darkMode = localStorage.getItem("theme") == "true";
    const setTheme=()=>{
        const r = document.querySelector(':root');
        if (darkMode) {
            document.getElementById("sun").style.scale = 0;
            document.getElementById("moon").style.scale = 1;
            r.style.setProperty('--bg', '#292929ff')
            r.style.setProperty('--text', '#d0d0d0ff')
        }
        else {
            document.getElementById("sun").style.scale = 1;
            document.getElementById("moon").style.scale = 0;
            r.style.setProperty('--bg', '#f3f3f3ff')
            r.style.setProperty('--text', '#323232ff')
        }
    }
    setTheme()
    document.getElementById("theme").addEventListener('click', () => {
        darkMode = !darkMode;
        localStorage.setItem("theme", darkMode);
        setTheme();
    })

}

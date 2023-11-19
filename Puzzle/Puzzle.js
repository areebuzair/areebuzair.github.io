"use strict";

var s, tiles, started = false, nor = 0, t, time;
var keysound = new Audio("Keyboard-Button-Click-02-c-FesliyanStudios.mp3");
function clicksound() {
    keysound.currentTime = 0.6;
    keysound.play();
}

const { random, floor, round } = Math;

const storage = localStorage;

window.onload = function () {
    document.body.style.backgroundImage = `url("https://source.unsplash.com/random/?wood,table")`;
    //var quit  = document.getElementById("quit");
    var save = document.getElementById("save");
    var timedisp = document.getElementById("timedisp");
    var grid = document.getElementById("grid");
    var solved = document.getElementById("solved");
    var levelselect = document.getElementById("levelselect");
    var start = document.getElementById("start");
    var lastgame = document.getElementById("lastgame");
    var confirmpage = document.getElementById("confirmpage");
    var confrm = document.getElementById("confrm");
    var audiobox = document.getElementById("audiobox");
    if (!(parseInt(storage.bool))) {
        lastgame.style.backgroundColor = "rgba(51,34,17,0.5)";
    }

    audiobox.addEventListener("input",
        function () {
            document.getElementById("labelsfx").textContent = this.checked ? "🔊" : "🔇";
        });

    function create() {
        storage.bool = "0";
        storage.time = "";
        storage.gridvalue = "";
        storage.tiles = "";
        storage.s = "";
        lastgame.style.backgroundColor = "rgba(51,34,17,0.5)";
        //started = false;
        s = parseInt(level.value);
        grid.innerHTML = "";
        let gridvalue = "";
        for (let i = 0; i < s; i++) {
            gridvalue += " auto";
        }
        grid.style.gridTemplateColumns = gridvalue;
        for (let i = 0; i < s ** 2; i++) {
            let d = document.createElement("div");
            d.pos = i;
            if (i < s ** 2 - 1) {
                let txt = document.createTextNode(i + 1);
                d.appendChild(txt);
            }
            d.style.width = `${80 / s}vmin`;
            d.style.height = `${80 / s}vmin`;
            d.style.fontSize = `${30 / s}vmin`;
            d.addEventListener("click", move);
            grid.appendChild(d);
            //nums.splice(index,1);
        }
        //console.log(grid.innerHTML);
        tiles = grid.childNodes;
        nor = tiles.length - 1;
    }
    function scramble() {
        started = false;
        let i = 0
        while (i < s ** 3 + 20) {
            if (nor == 0) {
                nor -= [-1, -s][round(random())];
            }
            else if (nor == s - 1) {
                nor -= [1, -s][round(random())];
            }
            else if (nor == tiles.length - s) {
                nor -= [-1, s][round(random())];
            }
            else if (nor == tiles.length - 1) {
                nor -= [1, s][round(random())];
            }
            else if (nor < s) {
                nor -= [1, -1, -s][floor(random() * 3)];
            }
            else if (nor >= tiles.length - s) {
                nor -= [1, -1, s][floor(random() * 3)];
            }
            else if ((nor + 1) % s == 0) {
                nor -= [s, -s, 1][floor(random() * 3)];
            }
            else if ((nor % s) == 0) {
                nor -= [s, -s, -1][floor(random() * 3)];
            }
            else {
                nor -= [1, -s, s, -1][floor(random() * 4)]
            }
            tiles[nor].click();
            i++;
        }

        started = true;

    }

    start.addEventListener("click", function () {
        if (parseInt(storage.bool)) {
            confirmpage.style.display = "flex";
        } else {
            create();
            scramble();
            levelselect.style.display = "none";
            time = 0;
            setTime();
            t = setInterval(setTime, 1000);
        }
    });

    confrm.addEventListener("click", function () {
        confirmpage.style.display = "none";
        create();
        scramble();
        levelselect.style.display = "none";
        time = 0;
        setTime();
        t = setInterval(setTime, 1000);
    });

    function setTime() {
        let min = floor(time / 60);
        let sec = time % 60;
        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        timedisp.innerHTML = `${min}:${sec}`;
        time++;
    }


    function move() {
        let val = this.innerHTML;
        if (this.pos < tiles.length - 1 && (this.pos + 1) % s != 0) {
            if (tiles[this.pos + 1].innerHTML == "") {
                tiles[this.pos + 1].innerHTML = val;
                this.innerHTML = "";
            }
        }
        if (this.pos > 0 && this.pos % s != 0) {
            if (tiles[this.pos - 1].innerHTML == "") {
                tiles[this.pos - 1].innerHTML = val;
                this.innerHTML = "";
            }
        }
        if (this.pos < tiles.length - s) {
            if (tiles[this.pos + s].innerHTML == "") {
                tiles[this.pos + s].innerHTML = val;
                this.innerHTML = "";
            }
        }
        if (this.pos > s - 1) {
            if (tiles[this.pos - s].innerHTML == "") {
                tiles[this.pos - s].innerHTML = val;
                this.innerHTML = "";
            }
        }
        if (started) {
            if (audiobox.checked) clicksound();
            let victory = true;
            for (let t of tiles) {
                if (t.pos + 1 != t.innerHTML && t.innerHTML != "") {
                    victory = false;
                    break;
                }
            }
            if (victory) {
                /*alert("Solved!");
                if(confirm("Play Again?")){
                    create();
                    scramble();
                }*/
                clearInterval(t);
                solved.style.display = "flex";
                tiles[s ** 2 - 1].innerHTML = s ** 2;
            }
        }
    }
    solved.addEventListener("click", function () {
        solved.style.display = "none";
        levelselect.style.display = "flex";
    });

    save.addEventListener("click", function () {
        clearInterval(t);
        storage.time = time;
        storage.gridvalue = grid.style.gridTemplateColumns;
        storage.tiles = grid.innerHTML;
        storage.bool = "1";
        levelselect.style.display = "flex";
        storage.s = s;
        lastgame.style.backgroundColor = "#321";
    });

    lastgame.addEventListener("click", function () {
        if (parseInt(storage.bool)) {
            time = parseInt(storage.time);
            grid.style.gridTemplateColumns = storage.gridvalue;
            grid.innerHTML = storage.tiles;
            //console.log(storage.tiles);
            tiles = grid.childNodes;
            s = parseInt(storage.s);
            for (let d = 0; d < tiles.length; d++) {
                tiles[d].pos = d;
                tiles[d].addEventListener("click", move);
            }
            setTime();
            t = setInterval(setTime, 1000);
            started = true;
            levelselect.style.display = "none";
        }
    });

}





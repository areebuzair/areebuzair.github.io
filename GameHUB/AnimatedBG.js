"use strict";
let W, H, L;
let skyGRD, hillsGRD, hazeGRD;
let N1 = 600, N2 = 100, N3 = 50;
let cnv = document.getElementById("cnv");
let ctx = cnv.getContext("2d");
const { min, random, ceil, floor, round, PI, abs, sin, cos } = Math;

function init() {
    W = 1000;//window.innerWidth;
    H = 1000;//window.innerHeight;
    L = min(W, H);
    cnv.width = W;
    cnv.height = H;
    cnv.oncontextmenu = (e) => {
        e.preventDefault();
    }
    colorSet();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    skyGRD = ctx.createLinearGradient(0, H, 0, 0);
    skyGRD.addColorStop(0, "#558");
    skyGRD.addColorStop(1, "#88B");
    hillsGRD = ctx.createLinearGradient(0, 0, 0, H);
    hillsGRD.addColorStop(0, "#222");
    hillsGRD.addColorStop(1, "#011");
    hazeGRD = ctx.createLinearGradient(0, 0, 0, H);
    hazeGRD.addColorStop(0.5, "transparent");
    hazeGRD.addColorStop(1, "#AAC");
}
init();
// window.onresize = init;

class Point {
    constructor(r = 2) {
        this.r = r;
        this.setDX = function () {
            this.dx = -0.001 - (random()) / 300;
            // this.dx = -1/300;
        };
        this.setDY = function () {
            this.dy = -random() / 500;
            // this.dy = -1 / 500;
        };
        this.set = function () {
            this.x = 3 * random();
            this.y = 1; // + random();
            this.setDX();
            this.setDY();
        };
        this.set();
        this.draw = function (t = 1) {
            ctx.fillStyle = "rgba(255, 255, 100, 1)";
            ctx.fillRect(this.x * W - this.r / 2, this.y * H - this.r / 2, this.r, this.r);

            if (this.dx == 0) this.setDX();
            if (this.dy == 0) this.setDY();

            this.x += this.dx * t;
            this.y += this.dy * t;
            if (this.y < -0.1 || this.x < -0.1 || this.x > 1.1) {
                this.set();
            }
        };
    }
}
let points = [];
for (let i = 0; i < N1; i++) {
    points.push(new Point(1));
}
for (let i = 0; i < N2; i++) {
    points.push(new Point(2));
}
for (let i = 0; i < N3; i++) {
    points.push(new Point(5));
}

function drawHills(t) {
    ctx.beginPath();
    ctx.fillStyle = hillsGRD;
    for (let i = 0; i <= 100; i++) {
        let x = t + W * i / 100
        let y = (
            H / 2
            + 64 * sin(2 * PI * x / 1700)
            + 32 * sin(2 * PI * x / 1300)
            + 16 * sin(2 * PI * x / 1100)
            + 8 * sin(2 * PI * x / 700)
            + 4 * sin(2 * PI * x / 500)
            + 2 * sin(2 * PI * x / 300)
            + 1 * sin(2 * PI * x / 200)
        ) - 100;
        if (i == 0)
            ctx.moveTo(x - t, y);
        else
            ctx.lineTo(x - t, y);
    }
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fill();
    // ctx.stroke();
}
function drawClouds(t) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    for (let i = 0; i <= 100; i++) {
        let x = t + W * i / 100
        let y = (
            H / 2.5
            + 64 * sin(2 * PI * x / 1900 + 123)
            - 16 * abs(sin(2 * PI * x / 300))
            - 2 * abs(sin(2 * PI * x / 170))
        );
        if (i == 0)
            ctx.moveTo(x - t, y);
        else
            ctx.lineTo(x - t, y);
    }
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fill();
    // ctx.stroke();
}

function rgb(r, g, b) {
    return [r, g];
}

function colorSet() {
    let color = document.createElement("input");
    color.type = "color";
    color.value = "#0008FF";
    color.id = "color";
    color.style.display = "none";
    let Controller = document.querySelector(".gameControllerIcon");
    Controller.addEventListener("click", () => {
        if (!Controller.count) {
            Controller.count = 1;
            return;
        }
        Controller.count++;
        if (Controller.count == 8) {
            Controller.removeAttribute("for");
            Controller.count = 1;
        }
        else if (Controller.count == 7) {
            Controller.setAttribute("for", "color");
        }
        console.log(Controller.count);
    });
    color.addEventListener("input", () => {
        const root = document.querySelector(":root");

        color.style.backgroundColor = color.value;
        let c = window.getComputedStyle(color,null).getPropertyValue("background-color");
        c = eval(c);
        if(c[0]<180 && c[1]<140){
            root.style.setProperty(
                "--buttoncolor",
                "white"
            );
        }
        else{
            root.style.setProperty(
                "--buttoncolor",
                "black"
            );
        }

        root.style.setProperty(
            "--color",
            color.value
        );
        // console.log(color.value)
    });
    document.querySelector("header").appendChild(color);
}


function drawBuildings(t, offset = 0, n = 100, details = false) {
    // ctx.beginPath();
    for (let i = 0; i <= n; i++) {
        ctx.fillStyle = "#000";
        let w = W / n;
        let x = floor(t / w) * w + w * i;
        let y = (
            H / 2
            + 64 * ceil(sin(2 * PI * x / 300))
            + 64 * ceil(sin(2 * PI * x / 500))
            + 16 * ceil(sin(2 * PI * x / 200))
        ) + offset;
        ctx.fillRect(x - t, y, w, H);
        if (details) {
            let windows = 5;
            // console.log(x);
            for (let h = y; h <= H; h += 20) {
                ctx.fillStyle = "#000";
                ctx.fillRect(x - t, 10 + h, w, 7)
            }
            for (let j = 0; j <= windows; j++) {
                ctx.fillStyle = "#222";
                if (j == 0) {
                    ctx.fillRect(x - t + j * w / windows, y, w / 40, H);
                }
                if (j == windows) {
                    ctx.fillRect(x - t + j * w / windows - w / 40, y, w / 40, H);
                }
                if (j > 0 && j < windows) {
                    ctx.fillRect(x - t + j * w / windows - w / 40, y, w / 20, H);
                }
            }
            ctx.strokeRect(x - t, y, w, H);
        }
    }
}

function drawFireFlies(n1, n2, t = 1) {
    for (let i = n1; i < n2; i++) {
        points[i].draw(t);
    }
}

function drawFog() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(0, 0, W, H);
}


let T1 = null;

function draw(t) {
    if (T1 == null) {
        T1 = t;
        requestAnimationFrame(draw);
        return;
    }
    let dt = t - T1

    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = skyGRD;
    ctx.fillRect(0, 0, W, H);

    drawClouds(t / 100);

    drawHills(t / 30);

    drawFog();
    drawHills((t + 1700) / 20);

    drawFog();
    drawBuildings((t - 260) / 10, 0, 25);
    drawFireFlies(0, N1, dt / 17);

    drawFog();
    drawBuildings((t - 8000) / 8, 50, 20);
    drawFireFlies(N1, N1 + N2, 2 * dt / 17);

    drawFog();
    drawBuildings((t - 500) / 5, 100, 10);
    drawFireFlies(N1 + N2, N1 + N2 + N3, 3 * dt / 17);

    ctx.fillStyle = hazeGRD;
    ctx.fillRect(0, 0, W, H);

    // console.log(t);

    T1 = t;
    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
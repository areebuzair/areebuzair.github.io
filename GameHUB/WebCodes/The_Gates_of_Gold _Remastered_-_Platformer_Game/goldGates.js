//alert("Brought to you by Nor'wester!");



"use strict";

var W, H, L, D, g, score = 0, gemnumber = 0, deathcount = 0, t1, dt;

var keyboardEnabled = false;

var gameover = false;

var gemPic = new Image(), wingsPic = new Image();

var saveState = { xf: 23, yf: 22.4, };

var gems = [];

var playSound = true, allowMotion = true;

if (playSound) {

    var audio = new Audio("./Audiosprite.mp3");

    audio.currentTime = 0;

}

function setSound(t, v = 1) {

    if (playSound) {

        let T = parseInt(audio.currentTime);

        if (((T < 70 || (82 <= T) || (50 < t && t < 61)))) {

            audio.volume = v;

            audio.currentTime = t;

            audio.play();

        }

    }

}

//console.log("(1,34), (3,21), (1,0), (26,31), (38,29), (38,36),");

var mapModel = new Image();

mapModel.src = "./Map.jpg";

var bg = new Image();



bg.src = "./MapHD.jpg";

gemPic.src = "./gemPic.png";

wingsPic.src = "./wings.png";






var sprites = new Image();

sprites.src = "spritesheet-shadow.png";



const { sin, cos, PI, sqrt, random, floor, ceil, round, abs } = Math;



function id(n) {

    //console.log(`    var id_${n} = document.getElementById("${n}");`);

    return document.getElementById(n);

}



var barriers = [

    { x: 0, y: 0, w: 0.025, h: 0.425, }, { x: 0.65, y: 0.225, w: 0.025, h: 0.025, }, { x: 0.7, y: 0.225, w: 0.025, h: 0.025, }, { x: 0.025, y: 0.175, w: 0.075, h: 0.025, }, { x: 0.1, y: 0.2, w: 0.1, h: 0.025, }, { x: 0.2, y: 0.225, w: 0.45, h: 0.025, }, { x: 0.725, y: 0.225, w: 0.075, h: 0.025, }, { x: 0.8, y: 0.2, w: 0.1, h: 0.025, }, { x: 0.9, y: 0.175, w: 0.075, h: 0.025, }, { x: 0.875, y: 0.125, w: 0.025, h: 0.025, }, { x: 0.9, y: 0.1, w: 0.075, h: 0.025, }, { x: 0.975, y: 0, w: 0.025, h: 0.125, }, { x: 0.975, y: 0.15, w: 0.025, h: 0.275, }, { x: 0.05, y: 0.375, w: 0.15, h: 0.025, }, { x: 0.175, y: 0.4, w: 0.025, h: 0.05, }, { x: 0.15, y: 0.425, w: 0.025, h: 0.025, }, { x: 0.05, y: 0.425, w: 0.05, h: 0.025, }, { x: 0.05, y: 0.475, w: 0.025, h: 0.025, }, { x: 0.975, y: 0.475, w: 0.025, h: 0.25, }, { x: 0, y: 0.45, w: 0.025, h: 0.3, }, { x: 0.025, y: 0.525, w: 0.025, h: 0.15, }, { x: 0.05, y: 0.525, w: 0.025, h: 0.125, }, { x: 0.075, y: 0.55, w: 0.025, h: 0.05, }, { x: 0.1, y: 0.425, w: 0.025, h: 0.025, }, { x: 0.1, y: 0.45, w: 0.05, h: 0.125, }, { x: 0.1, y: 0.575, w: 0.35, h: 0.025, }, { x: 0.475, y: 0.575, w: 0.025, h: 0.025, }, { x: 0.525, y: 0.575, w: 0.125, h: 0.05, }, { x: 0.65, y: 0.55, w: 0.025, h: 0.1, }, { x: 0.625, y: 0.475, w: 0.125, h: 0.025, }, { x: 0.65, y: 0.45, w: 0.075, h: 0.025, }, { x: 0.675, y: 0.425, w: 0.025, h: 0.025, }, { x: 0.65, y: 0.5, w: 0.05, h: 0.025, }, { x: 0.7, y: 0.5, w: 0.025, h: 0.15, }, { x: 0.725, y: 0.575, w: 0.05, h: 0.05, }, { x: 0.95, y: 0.5, w: 0.025, h: 0.125, }, { x: 0.925, y: 0.525, w: 0.025, h: 0.125, }, { x: 0.9, y: 0.55, w: 0.025, h: 0.075, }, { x: 0.8, y: 0.575, w: 0.075, h: 0.05, }, { x: 0.775, y: 0.6, w: 0.025, h: 0.025, }, { x: 0.8, y: 0.625, w: 0.025, h: 0.025, }, { x: 0.875, y: 0.6, w: 0.025, h: 0.05, }, { x: 0.45, y: 0.6, w: 0.075, h: 0.025, }, { x: 0.275, y: 0.625, w: 0.2, h: 0.025, }, { x: 0.55, y: 0.625, w: 0.025, h: 0.025, }, { x: 0.6, y: 0.625, w: 0.025, h: 0.025, }, { x: 0.625, y: 0.675, w: 0.025, h: 0.025, }, { x: 0.775, y: 0.675, w: 0.05, h: 0.025, }, { x: 0.85, y: 0.675, w: 0.075, h: 0.025, }, { x: 0.95, y: 0.675, w: 0.025, h: 0.025, }, { x: 0.075, y: 0.65, w: 0.15, h: 0.025, }, { x: 0.15, y: 0.625, w: 0.025, h: 0.025, }, { x: 0.225, y: 0.625, w: 0.025, h: 0.025, }, { x: 0.25, y: 0.675, w: 0.35, h: 0.025, }, { x: 0.45, y: 0.65, w: 0.025, h: 0.025, }, { x: 0.35, y: 0.7, w: 0.025, h: 0.025, }, { x: 0.4, y: 0.7, w: 0.025, h: 0.05, }, { x: 0.5, y: 0.7, w: 0.025, h: 0.025, }, { x: 0.55, y: 0.7, w: 0.025, h: 0.025, }, { x: 0.675, y: 0.675, w: 0.075, h: 0.025, }, { x: 0.675, y: 0.7, w: 0.025, h: 0.05, }, { x: 0.875, y: 0.7, w: 0.025, h: 0.05, }, { x: 0.55, y: 0.75, w: 0.425, h: 0.025, }, { x: 0.625, y: 0.725, w: 0.025, h: 0.025, }, { x: 0.725, y: 0.725, w: 0.025, h: 0.025, }, { x: 0.775, y: 0.725, w: 0.025, h: 0.025, }, { x: 0.825, y: 0.725, w: 0.025, h: 0.025, }, { x: 0.925, y: 0.725, w: 0.025, h: 0.025, }, { x: 0, y: 0.775, w: 0.025, h: 0.225, }, { x: 0.025, y: 0.975, w: 0.025, h: 0.025, }, { x: 0.075, y: 0.975, w: 0.3, h: 0.025, }, { x: 0.1, y: 0.925, w: 0.025, h: 0.05, }, { x: 0.175, y: 0.9, w: 0.025, h: 0.05, }, { x: 0.125, y: 0.925, w: 0.05, h: 0.025, }, { x: 0.025, y: 0.925, w: 0.05, h: 0.025, }, { x: 0.025, y: 0.875, w: 0.025, h: 0.025, }, { x: 0.075, y: 0.875, w: 0.075, h: 0.025, }, { x: 0.15, y: 0.85, w: 0.05, h: 0.025, }, { x: 0.225, y: 0.85, w: 0.025, h: 0.05, }, { x: 0.25, y: 0.85, w: 0.075, h: 0.025, }, { x: 0.3, y: 0.875, w: 0.075, h: 0.025, }, { x: 0.225, y: 0.925, w: 0.05, h: 0.025, }, { x: 0.3, y: 0.925, w: 0.15, h: 0.025, }, { x: 0.45, y: 0.925, w: 0.025, h: 0.05, }, { x: 0.45, y: 0.725, w: 0.025, h: 0.175, }, { x: 0.5, y: 0.85, w: 0.025, h: 0.125, }, { x: 0.525, y: 0.925, w: 0.025, h: 0.025, }, { x: 0.525, y: 0.875, w: 0.1, h: 0.025, }, { x: 0.55, y: 0.85, w: 0.025, h: 0.025, }, { x: 0.575, y: 0.9, w: 0.025, h: 0.025, }, { x: 0.4, y: 0.85, w: 0.025, h: 0.025, }, { x: 0.4, y: 0.875, w: 0.05, h: 0.025, }, { x: 0.4, y: 0.775, w: 0.025, h: 0.05, }, { x: 0.325, y: 0.75, w: 0.025, h: 0.025, }, { x: 0.35, y: 0.775, w: 0.025, h: 0.075, }, { x: 0.275, y: 0.775, w: 0.025, h: 0.05, }, { x: 0.3, y: 0.8, w: 0.025, h: 0.025, }, { x: 0.225, y: 0.775, w: 0.025, h: 0.05, }, { x: 0.175, y: 0.725, w: 0.025, h: 0.075, }, { x: 0.1, y: 0.8, w: 0.1, h: 0.025, }, { x: 0.025, y: 0.8, w: 0.025, h: 0.025, }, { x: 0.05, y: 0.825, w: 0.075, h: 0.025, }, { x: 0.05, y: 0.75, w: 0.025, h: 0.05, }, { x: 0.2, y: 0.725, w: 0.05, h: 0.025, }, { x: 0.275, y: 0.725, w: 0.025, h: 0.025, }, { x: 0.475, y: 0.75, w: 0.05, h: 0.025, }, { x: 0.5, y: 0.775, w: 0.025, h: 0.05, }, { x: 0.525, y: 0.8, w: 0.025, h: 0.025, }, { x: 0.05, y: 0.7, w: 0.025, h: 0.025, }, { x: 0.1, y: 0.7, w: 0.05, h: 0.025, }, { x: 0.075, y: 0.75, w: 0.075, h: 0.025, }, { x: 0.1, y: 0.725, w: 0.025, h: 0.025, }, { x: 0.2, y: 0.7, w: 0.025, h: 0.025, }, { x: 0.4, y: 0.975, w: 0.4, h: 0.025, }, { x: 0.85, y: 0.975, w: 0.125, h: 0.025, }, { x: 0.975, y: 0.75, w: 0.025, h: 0.25, }, { x: 0.875, y: 0.925, w: 0.025, h: 0.025, }, { x: 0.925, y: 0.925, w: 0.05, h: 0.025, }, { x: 0.9, y: 0.85, w: 0.025, h: 0.05, }, { x: 0.875, y: 0.875, w: 0.025, h: 0.025, }, { x: 0.65, y: 0.85, w: 0.025, h: 0.05, }, { x: 0.675, y: 0.875, w: 0.1, h: 0.025, }, { x: 0.7, y: 0.85, w: 0.025, h: 0.025, }, { x: 0.775, y: 0.875, w: 0.025, h: 0.1, }, { x: 0.825, y: 0.875, w: 0.025, h: 0.125, }, { x: 0.7, y: 0.925, w: 0.05, h: 0.025, }, { x: 0.575, y: 0.95, w: 0.025, h: 0.025, }, { x: 0.625, y: 0.95, w: 0.05, h: 0.025, }, { x: 0.65, y: 0.925, w: 0.025, h: 0.025, }, { x: 0.575, y: 0.8, w: 0.1, h: 0.025, }, { x: 0.625, y: 0.775, w: 0.025, h: 0.025, }, { x: 0.6, y: 0.825, w: 0.025, h: 0.025, }, { x: 0.7, y: 0.8, w: 0.05, h: 0.025, }, { x: 0.775, y: 0.775, w: 0.025, h: 0.075, }, { x: 0.8, y: 0.8, w: 0.075, h: 0.025, }, { x: 0.825, y: 0.825, w: 0.025, h: 0.025, }, { x: 0.9, y: 0.8, w: 0.05, h: 0.025, }, { x: 0.95, y: 0.825, w: 0.025, h: 0.025, }, { x: 0, y: 0.425, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.125, y: 0.425, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.025, y: 0.5, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.45, y: 0.575, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.5, y: 0.575, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.775, y: 0.575, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.875, y: 0.575, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.975, y: 0.425, w: 0.025, h: 0.05, dangerous: true, }, { x: 0.975, y: 0.725, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.825, y: 0.675, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.5, y: 0.65, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.675, y: 0.8, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.75, y: 0.925, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.8, y: 0.975, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.9, y: 0.925, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.925, y: 0.875, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.2, y: 0.8, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.25, y: 0.725, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.25, y: 0.8, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.425, y: 0.8, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.275, y: 0.925, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.375, y: 0.975, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.05, y: 0.975, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.05, y: 0.875, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.075, y: 0.7, w: 0.025, h: 0.025, dangerous: true, }, { x: 0, y: 0.75, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.075, y: 0.625, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.425, y: 0.9, w: 0.025, h: 0.025, dangerous: true, }, { x: 0.625, y: 0.7, w: 0.025, h: 0.025, dangerous: true, },

];

var clouds = [

    { x: 0.025, y: 0.025, w: 0.075, h: 0.025, }, { x: 0.05, y: 0.05, w: 0.3, h: 0.025, }, { x: 0.1, y: 0.075, w: 0.275, h: 0.025, }, { x: 0.2, y: 0.1, w: 0.25, h: 0.025, }, { x: 0.375, y: 0.125, w: 0.025, h: 0.025, }, { x: 0.325, y: 0.15, w: 0.05, h: 0.025, }, { x: 0.3, y: 0.175, w: 0.1, h: 0.025, }, { x: 0.425, y: 0.15, w: 0.15, h: 0.025, }, { x: 0.475, y: 0.125, w: 0.075, h: 0.025, }, { x: 0.675, y: 0.15, w: 0.025, h: 0.025, }, { x: 0.65, y: 0.175, w: 0.025, h: 0.025, }, { x: 0.625, y: 0.25, w: 0.05, h: 0.025, }, { x: 0.6, y: 0.275, w: 0.1, h: 0.025, }, { x: 0.575, y: 0.3, w: 0.175, h: 0.025, }, { x: 0.55, y: 0.325, w: 0.05, h: 0.025, }, { x: 0.525, y: 0.35, w: 0.05, h: 0.025, }, { x: 0.625, y: 0.35, w: 0.05, h: 0.025, }, { x: 0.675, y: 0.375, w: 0.025, h: 0.025, }, { x: 0.7, y: 0.35, w: 0.025, h: 0.025, }, { x: 0.75, y: 0.35, w: 0.025, h: 0.025, }, { x: 0.475, y: 0.325, w: 0.025, h: 0.025, }, { x: 0.5, y: 0.4, w: 0.025, h: 0.05, }, { x: 0.525, y: 0.425, w: 0.05, h: 0.025, }, { x: 0.575, y: 0.4, w: 0.025, h: 0.025, }, { x: 0.25, y: 0.375, w: 0.025, h: 0.025, }, { x: 0.275, y: 0.35, w: 0.025, h: 0.025, }, { x: 0.35, y: 0.375, w: 0.075, h: 0.025, }, { x: 0.325, y: 0.4, w: 0.025, h: 0.025, }, { x: 0.3, y: 0.425, w: 0.025, h: 0.025, }, { x: 0.3, y: 0.475, w: 0.05, h: 0.025, }, { x: 0.275, y: 0.5, w: 0.1, h: 0.025, }, { x: 0.25, y: 0.525, w: 0.15, h: 0.025, }, { x: 0.425, y: 0.5, w: 0.025, h: 0.025, }, { x: 0.85, y: 0.45, w: 0.05, h: 0.025, }, { x: 0.825, y: 0.475, w: 0.1, h: 0.025, }, { x: 0.85, y: 0.5, w: 0.05, h: 0.025, },

];



function atan(x1, y1, x2, y2) {

    let dx = x2 - x1;

    let dy = y2 - y1;

    if (dx == 0) {

        if (dy >= 0) {

            return PI / 2;

        }

        else {

            return (3 / 2) * PI;

        }

    }

    else if (dx > 0) {

        return Math.atan(dy / dx);

    }

    else { return PI + Math.atan(dy / dx); }

}



window.onload = function () {

    const touch = ("ontouchstart" in document);



    var cnv = document.getElementById("cnv");

    var ctx = cnv.getContext("2d");

    function init() {

        W = window.innerWidth;

        H = window.innerHeight;

        L = round((W < H ? W : H) / 400) * 400;

        if (L === 0) L = 400;

        W = L;

        H = L;

        cnv.width = W;

        cnv.height = H;

        L *= 6;

        D = L / 40;

        ctx.font = "Bold " + (D / 2.5) + "px Arial";

        ctx.textAlign = "center";

        ctx.textBaseline = "middle";

        //1m = D/3px

        g = D / 3 * 9.8;

        for (let b of barriers) {

            b.x *= L;

            b.y *= L;

            b.w *= L;

            b.h *= L;

        }

        barriers.push({ x: 0, y: 0, w: L, h: 0, });

        barriers.push({ x: 0, y: 0, w: 0, h: L, });

        barriers.push({ x: L, y: 0, w: 0, h: L, });

        barriers.push({ x: 0, y: L, w: L, h: 0, });

        //draw();

        //ctx.shadowBlur = D/3;

    }

    init();

    //console.log(barriers)

    setTimeout(function () {

        id("circularbar").style.display = "none";

        id("continue").style.display = "block";

        id("continue").style.cursor = "pointer";

        id("continue").onclick = function () {

            if (playSound) audio.play();

            id("loader").style.display = "none";

            t1 = performance.now();

            keyboardEnabled = true;

            animate();

            //if(playSound) audio.pause();

        };

    }, 500);



    function gameOver() {

        keyboardEnabled = false;

        score -= 50;

        text.o = 0;

        deathcount++;

        if (Player.neckIsBroken) {

            id("deathcause").textContent = "You fell and broke your neck.";

            setSound(60.5);

        }

        else {

            id("deathcause").textContent = "You touched the venom vines.";

            //setSound(50.1);

        }

        gameover = true;

        id("gameOver").style.display = "flex";

        if (!Player.neckIsBroken) {

            setSound(50.1);

        }

        //if(playSound) audio.pause();

    }



    var text = {

        o: 0,

        txt: "",

        w: 0,

        activate: function (t) {

            this.txt = t;

            this.o = 100;

            this.w = ctx.measureText(t).width;

        },

        write: function () {

            if (this.o > 0) {

                ctx.fillStyle = `rgba(255,255,255,${this.o / 100})`;

                ctx.strokeStyle = `rgba(0,0,0,${this.o / 100})`;

                ctx.lineWidth = D / 40;

                ctx.beginPath();

                ctx.fillText(this.txt, W / 2, H - D * 1.5);

                ctx.strokeText(this.txt, W / 2, H - D * 1.5);

                ctx.beginPath();

                ctx.rect((W - this.w) / 2, H - D * 1.3, this.w, D / 20);

                ctx.fill();

                ctx.stroke();

                this.o -= dt * 20;

                if (this.o <= 0) this.o = 0;

            }

        },

    }



    var Player = {

        //p.y = 0.982

        //p.x = 0.032

        x: saveState.xf * D + (D - D * 0.36) / 2,

        w: D * 0.36,

        h: D * 0.6,

        y: saveState.yf * D,

        dx: 0,

        dy: 0,

        s: 0,

        steps: 0,

        fr: true,

        neckIsBroken: false,

        dead: false,

        midAir: false,

        climbing: false,

        draw: function () {

            /*ctx.fillStyle = "red";

            ctx.fillRect(this.x,H-L+this.y,this.w,this.h);*/

            if (this.fr)

                ctx.drawImage(sprites, sprites.width/7 * this.s, 0, sprites.width/7, sprites.height, this.x, H - L + this.y - (this.s < 5 ? D / 8 : 0), this.w, this.h);

            else {

                ctx.scale(-1, 1);

                ctx.drawImage(sprites, sprites.width/7 * this.s, 0, sprites.width/7, sprites.height, -this.x - this.w, H - L + this.y - (this.s < 5 ? D / 8 : 0), this.w, this.h);

                ctx.scale(-1, 1);

            }

        },

        move: function () {

            if (this.dead) {

                this.dx = 0;

                this.dy = 0;

            }

            else {

                this.dx = (D * 3.456) * parseFloat(id("joystick").value);

                //this.dy = (this.h/10) * (joy.dist/joy.maxR) * sin(joy.ang);

                if (!this.climbing)

                    this.dy += g * dt;

                else if (this.dy < 0)

                    this.dy += g * dt;

                else {

                    this.dy = 0;

                }

            }

            this.climbing = false;

            this.midAir = true;

            if (this.dx > 0) {

                this.fr = true;

                this.steps += dt * 60;

                for (let b of barriers) {

                    if (this.x + this.w + this.dx * dt >= b.x && this.x < b.x && this.y < b.y + b.h && this.y + this.h > b.y) {

                        if (b.dangerous)

                            this.dead = true;

                        if (this.y + this.h - b.y <= this.h / 2) {

                            this.y -= this.y + this.h - b.y;

                            this.dy = 0;

                        }

                        else {



                            this.dx = (b.x - this.x - this.w) / dt;

                            this.climbing = true;

                        }

                        //this.midAir = false;

                    }

                }



            }

            else if (this.dx < 0) {

                this.fr = false;

                this.steps += dt * 60;

                for (let b of barriers) {

                    if (this.x + this.dx * dt <= b.x + b.w && this.x + this.w > b.x + b.w && this.y < b.y + b.h && this.y + this.h > b.y) {

                        if (b.dangerous)

                            this.dead = true;

                        if (this.y + this.h - b.y <= this.h / 2) {

                            this.y -= this.y + this.h - b.y;

                            this.dy = 0;

                        }

                        else {

                            this.dx = (b.x + b.w - this.x) / dt;

                            this.climbing = true;

                        }

                        //this.midAir = false;

                    }

                }

            }

            if (this.steps >= 16) this.steps = 0;

            /*if(this.dy===0){

                this.dy = this.h/50;

            }*/

            //audio.volume = this.y/L;

            if (this.dy > 0) {

                for (let b of barriers) {

                    if (this.y + this.dy * dt + this.h >= b.y && this.y < b.y && this.x < b.x + b.w && this.x + this.w > b.x) {

                        if (b.dangerous)

                            this.dead = true;

                        if (this.dy >= Math.sqrt(2 * g * D * 4)) {

                            this.dead = true;

                            this.neckIsBroken = true;

                        }

                        else if (this.dy >= Math.sqrt(2 * g * D * 1.5)) {

                            setSound(40.15);

                        }

                        this.dy = (b.y - this.y - this.h) / dt;

                        this.midAir = false;

                    }

                }

            }

            else if (this.dy < 0) {

                for (let b of barriers) {

                    if (this.y + this.dy * dt <= b.y + b.h && this.y + this.h > b.y + b.h && this.x < b.x + b.w && this.x + this.w > b.x) {

                        if (b.dangerous)

                            this.dead = true;

                        this.dy = (b.y + b.h - this.y) * dt;

                    }

                }

            }



            this.x += this.dx * dt;

            this.y += this.dy * dt;

            tx = (W - this.w) / 2 - this.x;

            if (tx > 0) tx = 0;

            if (tx < W - L) tx = W - L;

            ty = L - this.y - this.h / 2 - H / 2;

            if (ty < 0) ty = 0;

            else if (ty > L - H) ty = L - H;

            if (this.climbing && this.dy >= 0)

                this.s = 5;

            else if (this.midAir)

                this.s = 6;

            else if (this.dx != 0)

                this.s = 1 + floor(this.steps / 4);

            else

                this.s = 0;

            if (Player.dead && !gameover)

                gameOver();

        },

        jump: function () {

            if (!this.dead && allowMotion && !id("map").checked) {

                if (Player.climbing && (Player.dy == 0 || !Player.midAir)) {

                    Player.dy = -Math.sqrt(2 * g * D * 1.6);

                    setSound(30.15, 0.3);

                }

                else if (!Player.midAir && !Player.climbing) {

                    Player.dy -= Math.sqrt(2 * g * D * 1.6);

                    setSound(30.15, 0.3);

                }

            }

        },

        check: function () {

            let x = (this.x + this.w / 2) / D;

            let y = (this.y + this.h / 2) / D;

            for (let gem of gems) {

                if (!gem.collected && x > gem.xf && x < gem.xf + 1 && y > gem.yf && y < gem.yf + 1) {

                    gem.collect();

                }

            }

        },



    };



    function Gem(x, y, pic = gemPic) {

        this.xf = x;

        this.yf = y;

        this.l = D;

        this.pic = pic;

        this.a = 0;

        this.collected = false;

        this.draw = function () {

            if (!this.collected) {

                ctx.drawImage(this.pic, D * this.xf, H - L + D * this.yf + D * sin(this.a) / 15, D, D);

                this.a += PI * dt / 2;

                if (this.a >= 2 * PI) this.a = 0;

            }

            else if (this.l >= 0) {

                ctx.drawImage(this.pic, Player.x + (Player.w - this.l) / 2, H - L + Player.y + (Player.h - this.l) / 2, this.l, this.l);

                this.l -= D * dt * 3;

            }

        }

        this.collect = function () {

            this.collected = true;

            saveState.xf = this.xf;

            saveState.yf = this.yf;

            score += 1000;

            gemnumber++;

            setSound(80.4);

            text.activate(`Checkpoint saved. Gems: ${gemnumber}/5`);

        }

    }

    gems = [new Gem(1, 34), new Gem(3, 21), new Gem(1, 0), new Gem(26, 31), new Gem(38, 29),];

    let wings = new Gem(38, 35, wingsPic);

    wings.collect = function () {

        this.collected = true;

        saveState.xf = this.xf;

        saveState.yf = this.yf;

        setSound(70.4);

        for (let c of clouds) {

            barriers.push({

                x: c.x * L,

                y: c.y * L,

                w: c.w * L,

                h: c.h * L,

            });

        }

        score += 2000;

        text.activate("The Wings of Nebula");

    }

    gems.push(wings);



    let gate = new Gem(39.5, 5);

    gate.draw = function () { }

    gate.collect = function () {

        this.collected = true;

        score += 10000;

    }

    gems.push(gate);



    var tx = 0, ty = 0;

    // ctx.save();

    function animate() {

        ctx.save();

        ctx.clearRect(0, 0, W, H);



        ctx.translate(tx, ty);



        ctx.drawImage(bg, 0, H - L, L, L);

        let t2 = performance.now();

        dt = (t2 - t1) / 1000;

        if (dt > 0.2) dt = 0;

        if(allowMotion && !id("map").checked)

            Player.move();

        Player.draw();

        for (let gem of gems) {

            gem.draw();

        }

        wings.draw();

        Player.check();



        ctx.restore();

        text.write();

        ctx.beginPath();

        ctx.strokeStyle = "black";

        ctx.lineWidth = D / 50;

        ctx.beginPath();

        ctx.fillStyle = "white";

        ctx.fillText(score, W / 2, D * 0.5);

        ctx.strokeText(score, W / 2, D * 0.5);

        if (id("map").checked) {

            ctx.drawImage(

                mapModel,

                0, 0, W, H,

            )

        }



        t1 = t2;



        if (!gems[6].collected) {

            //setTimeout(animate,100);

            window.requestAnimationFrame(animate);

            if (playSound && parseInt(audio.currentTime) % 10 > 5) {

                audio.currentTime = 0;

                audio.pause();

            }



        }

        else {

            setTimeout(function () {

                id("score").textContent = score;

                id("score").style.color = score == 17000 ? "gold" : "white";

                id("gemnumber").textContent = gemnumber;

                id("deathcount").textContent = deathcount;

                //if(playSound) audio.pause();

                id("end").style.display = "block";

                id("scroll").scrollIntoView();

                setSound(90);

                keyboardEnabled = false;

            }, 500);

        }

    }



    /*window.onresize = function(){

        //joy.kill();

        let pL = L;

        

        for(let b of barriers){

            b.x /= L;

            b.y /= L;

            b.w /= L;

            b.h /= L;

        }

        init();

        Player.x *= L/pL;

        Player.y *= L/pL;

        Player.w *= L/pL;

        Player.h *= L/pL; 

    }*/



    //animate();

    if (touch) {

        id("jump").addEventListener("touchstart", function () {

            Player.jump();

        });

        id("left").addEventListener("touchstart", function () {

            id("joystick").value = -1;

        });

        id("right").addEventListener("touchstart", function () {

            id("joystick").value = 1;

        });

        id("left").addEventListener("touchend", function () {

            id("joystick").value = 0;

        });

        id("right").addEventListener("touchend", function () {

            id("joystick").value = 0;

        });



    }

    else {

        let ctrls = document.getElementsByClassName("controls");

        for (let c of ctrls)

            c.style.display = "none";

        id("map").style.display = "none";

        window.addEventListener("keypress", function (e) {

            if(!keyboardEnabled) return;

            let k = e.key;

            if (k == " ") {

                Player.jump();

            }

            else if (k == "a")

                id("joystick").value = -1;

            else if (k == "d")

                id("joystick").value = 1;

            else if (k == "m")

                id("map").checked = !id("map").checked;



        });

        window.addEventListener("keyup", function (e) {

            // if(!keyboardEnabled) return;

            let k = e.key;

            if (k == "a" && id("joystick").value == -1) {

                id("joystick").value = 0;

            }

            else if (k == "d" && id("joystick").value == 1) {

                id("joystick").value = 0;

            }



        });

    }

    /*
    
    a:97, w:119, d:100, s:115, space:32
    
    */



    document.querySelector("#gameOver span").addEventListener("click", function () {

        gameover = false;

        Player.x = saveState.xf * D + (D - Player.w) / 2;

        Player.y = saveState.yf * D;

        Player.dx = 0;

        Player.dy = 0;

        Player.s = 0;

        Player.dead = false;

        Player.neckIsBroken = false;

        Player.fr = true;

        Player.midAir = false;

        Player.climbing = false;

        keyboardEnabled = true;

        id("gameOver").style.display = "none";

        if (playSound) {

            audio.volume = 1;

            audio.currentTime = 0;

            audio.pause();

        }

    });





    id("replay").addEventListener("click", function () {

        saveState = { xf: 23, yf: 22.4, };

        for (let gm of gems) {

            gm.collected = false;

            gm.l = D;

        }

        Player.x = saveState.xf * D + (D - Player.w) / 2;

        Player.y = saveState.yf * D;

        Player.dx = 0;

        Player.dy = 0;

        Player.s = 0;

        Player.dead = false;

        Player.neckIsBroken = false;

        Player.fr = true;

        Player.midAir = false;

        Player.climbing =

            false;

        gemnumber = 0;

        deathcount = 0;

        score = 0;

        barriers.splice(171, clouds.length);

        id("end").style.display = "none";

        if (playSound) {

            audio.volume = 1;

            audio.currentTime = 0;

            audio.play();

            //audio.pause();

        }

        t1 = performance.now();

        keyboardEnabled = true;

        animate();

    });



    if (playSound) {

        window.addEventListener("blur", function () {

            if (!audio.paused) {

                audio.pause();

                audio.currentTime = 0;

                audio.volume = 1;

                id("resume").style.display = "flex";

                allowMotion = false;

            }

        });

        id("resume").addEventListener("click", function () {

            this.style.display = "none";

            audio.play();

            allowMotion = true;

        });

    }

}
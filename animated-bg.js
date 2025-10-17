"use strict";

var W, H, L, ang = 0, points, start;

//var XP,YP;

const { sin, cos, PI, sqrt, random, floor, ceil, round, abs } = Math;



function id(n) {

    return document.getElementById(n);

}



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

    var cnv = document.getElementById("cnv");

    var ctx = cnv.getContext("2d");

    function init() {

        W = window.innerWidth;

        H = window.innerHeight;

        cnv.width = W;

        cnv.height = H;

        L = W < H ? W : H;

        points = [];

        start = new Point(W / 2, H / 2);

    }

    init();

    window.onresize = init;



    function Point(x, y) {

        this.x = x;

        this.y = y;

        this.ang = ang;

        this.fc = 7;

        //XP = x;YP=y;

        if (points.length) {

            let p = points[points.length - 1];

            this.dx = (this.x - p.x) / 15;

            this.dy = (this.y - p.y) / 15;

        }

        else {

            this.dx = 0;

            this.dy = 0;

        }

        this.lineto = function () {

            ctx.lineTo(this.x, this.y);

            this.x += this.dx;

            this.y += this.dy;

        }

        this.moveto = function () {

            ctx.beginPath();

            ctx.moveTo(this.x, this.y);

            if (points.length) {

                this.fc--;

                if (this.fc === 0) {

                    start = points.shift();

                }

            }

        }

        this.distanceFrom = function (x, y) {

            return sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y))

        }

    }



    function animate() {

        ctx.fillStyle = "rgba(0,0,0,0.08)";

        ctx.fillRect(0, 0, W, H);

        ctx.strokeStyle = "rgba(100, 150, 255, 0.3)";

        start.moveto();

        for (let p of points) {

            p.lineto();

        }

        ctx.stroke();

        window.requestAnimationFrame(animate);

    }



    animate();



    window.ontouchmove = function (e) {

        points.push(new Point(e.touches[0].clientX, e.touches[0].clientY));

    }

    window.ontouchstart = function (e) {

        points.push(new Point(e.touches[0].clientX, e.touches[0].clientY));

    }

    window.onmousemove = function (e) {
        if (points.length == 0)
            points.push(new Point(e.clientX, e.clientY));
        else if (points[points.length - 1].distanceFrom(e.clientX, e.clientY) > 100)
            points.push(new Point(e.clientX, e.clientY));

    }





}
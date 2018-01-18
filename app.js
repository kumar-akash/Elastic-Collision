var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var flag = false;
var x = 100;
var y = 100;
var r = 20;
var dx;
var dy;
var nob = 100;
var color;
var b = [];

var mouse = {
    mouseX: undefined,
    mouseY: undefined
};
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

addEventListener('mousemove', function (e) {
    if (e.clientX  <= 50 || e.clientX >= canvas.width-50) {
        mouse.mouseX = undefined;
    }
    if (e.clientY <= 50 || e.clientY >= canvas.height-50) {
        mouse.mouseY = undefined;
    } else {
        mouse.mouseX = e.clientX;
        mouse.mouseY = e.clientY;

    }



});
for (var i = 0; i < nob; i++) {
    x = random(r, canvas.width - r);
    y = random(r, canvas.height - r);
    dx = (Math.random() - 0.5) * 2;
    dy = (Math.random() - 0.5) * 2;
    color = getcolor();
    if (i != 0) {
        for (j = 0; j < b.length; j++) {
            if ((distance(x, y, b[j].x, b[j].y) - (r * 2)) < 0) {
                x = random(r, canvas.width - r);
                y = random(r, canvas.height - r);
                j = -1;
            }
        }
    }
    b.push(new Balls(x, y, r, dx, dy, color));
}

function getcolor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var rgb = "rgb(" + r + ", " + g + ", " + b + ")";
    return rgb;
}

function distance(x1, y1, x2, y2) {
    const xdis = x2 - x1;
    const ydis = y2 - y1;
    return Math.sqrt(Math.pow(xdis, 2) + Math.pow(ydis, 2));
}

function rgb() {
    let r1 = random(0, 255);
    let b = random(0, 255);
    let g = random(0, 255);
    let rrr = ("rgb(" + r1 + ", " + g + ", " + b + ")");
    return rrr;
}

function random(min, max) {
    return ((Math.random() * (max - min + 1) + min));
}
//Ball Class 
function Balls(x, y, r, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.color = color;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }



    this.update = function (b) {

        for (let j = 0; j < b.length; j++) {

            if (this === b[j]) continue;
            if ((distance(this.x, this.y, b[j].x, b[j].y) - (this.r + r)) < 0) {
                const xVelocityDiff = this.dx - b[j].dx;
                const yVelocityDiff = this.dy - b[j].dy;

                const xDist = b[j].x - this.x;
                const yDist = b[j].y - this.y;

                // Prevent accidental overlap of particles
                if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
                    let tmpx = this.dx;
                    this.dx = b[j].dx;
                    b[j].dx = tmpx;
                    let tmpy = this.dy;
                    this.dy = b[j].dy;
                    b[j].dy = tmpy;
                    let speed1 = Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
                    let speed2 = Math.sqrt(Math.pow(b[j].dx, 2) + Math.pow(b[j].dy, 2));
                    if (this.color === "black") {
                        this.color = b[j].color;
                    } else
                    if (b[j].color === "black") {
                        b[j].color = this.color;
                    } else
                    if (speed1 > speed2) {
                        b[j].color = this.color;
                    } else {
                        this.color = b[j].color;
                    }
                }
            }
        }
        //mouse Collision Detection
        if ((distance(mouse.mouseX, mouse.mouseY, this.x, this.y) < 50)) {
            this.color = "black";
            if (this.r < 50) {
                this.r += 5;
            }
        } else {
            if (this.r > 20) {
                this.r -= 1;
            }
        }

        if (this.x <= this.r || this.x >= canvas.width - this.r) {
            this.dx = -this.dx;
        }

        if (this.y <= this.r || this.y >= canvas.height - this.r) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;



    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < nob; i++) {
        b[i].draw();
        b[i].update(b);
    }
}


animate();
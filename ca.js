let canvas = document.getElementById("canvas");
canvas.width = innerWidth
canvas.height = innerHeight

let ctx = canvas.getContext("2d");
ctx.fillStyle = 'rgba(255,255,255,0.5)'
const _mod = 10

function draw() {
    for (let x = 0; x < canvas.offsetWidth; x += _mod) {
        for (let y = 0; y < canvas.offsetHeight; y += _mod) {
            ctx.fillText(".", x, y)
        }
    }
}

const AA = ['#', '.', '"', '@', "*", '/', '$']
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function draw_rand() {
    for (let x = 0; x < canvas.offsetWidth; x += _mod) {
        for (let y = 0; y < canvas.offsetHeight; y += _mod) {
            ctx.fillText(AA[getRndInteger(0, AA.length)], x, y)
        }
    }
}


function onDown(e) {
    console.log("down");
}

function onUp(e) {
    console.log("up");
}

function _round(x) {
    x -= x % _mod
    return x
}

function onClick(e) {
    console.log("click");
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;
    x = _round(x)
    y = _round(y)
    console.log("x:", x, "y:", y);
}

function onOver(e) {
    console.log("mouseover");
}

function onOut() {
    console.log("mouseout");
}

function drawRect(x, y, width, height) {
    let context = canvas.getContext('2d');
    context.fillRect(x, y, width, height);
}

function move(e) {
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;
    // x = _round(x)
    // y = _round(y)
    // ctx.fillStyle = 'rgba(100,0,200,0.3)'
    // ctx.fillText('#', x, y)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.clearRect(x-10, y-10, 100, 100);
    draw_rand()
    // drawRect(x, y, _mod, _mod)
}

canvas.addEventListener('mousedown', onDown, false);
canvas.addEventListener('mouseup', onUp, false);
canvas.addEventListener('click', onClick, false);
canvas.addEventListener('mouseover', onOver, false);
canvas.addEventListener('mouseout', onOut, false);
canvas.addEventListener('mousemove', move, false);

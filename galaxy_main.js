let canvas;
let context;
let fixed_galaxies = [];
let following_mouse_galaxy;

let mouse_pos = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

const option = {
    count: 13,
    opacity: 0.1,
    star_color: "random",
    draw_style: 'L',
    doAnim: true,
    sgnx: 'C',
    sgny: 'C',
    center_x: mouse_pos.x,
    center_y: mouse_pos.y,
}

const get_random_color = () => {
    const s = "0123456789ABCDEF";
    let return_color = "#";
    for (let i = 0; i < 6; i++) {
        return_color += s[Math.ceil(Math.random() * 15)];
    }
    return return_color;
}

const get_random_char = () => {
    const s = "0123456789ABCDEF#$%&()~=!^/-+";
    return s[Math.ceil(Math.random() * (s.length - 1))];
}

const updateTextInput = (val) => {
    option.opacity = val / 500;
}

window.onmousemove = function (e) {
    mouse_pos.x = e.clientX - canvas.offsetLeft;
    mouse_pos.y = e.clientY - canvas.offsetTop;
}

const new_galaxy = () => {
    if (option.star_color == 'random' && option.draw_style == 'R') {
        following_mouse_galaxy = new RandomColor_RandomChar_galaxy(option);
    }
    else if (option.star_color == 'random') {
        following_mouse_galaxy = new RandomColor_FixedChar_galaxy(option);
    }
    else if (option.draw_style == 'R') {
        following_mouse_galaxy = new FixedColor_RandomChar_galaxy(option);
    }
    else {
        following_mouse_galaxy = new FixedColor_FixedChar_galaxy(option);
    }
}

function onClick(e) {
    console.log("click");
    fixed_galaxies.push(following_mouse_galaxy);
    new_galaxy();
    set_info();
}

window.onload = function () {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    resize();
    anim();
    set_panel();
    document.addEventListener("click", onClick, false);
}

window.onresize = function () {
    resize();
}

function resize() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
    new_galaxy();
}


function anim() {
    if (!option.doAnim) { context = null; return; }
    context = canvas.getContext('2d');
    window.requestAnimationFrame(anim);
    context.fillStyle = `rgba(0,0,0,${option.opacity})`;
    context.fillRect(0, 0, canvas.width, canvas.height);
    following_mouse_galaxy.following_mouse_draw(mouse_pos.x, mouse_pos.y);
    fixed_galaxies.map(gal => gal.fixed_draw());
    // context.clearRect(0, 0, canvas.width, canvas.height);
}
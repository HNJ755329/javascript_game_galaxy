

window.onmousemove = function (e) {
    mouse_pos.x = e.clientX - canvas.offsetLeft;
    mouse_pos.y = e.clientY - canvas.offsetTop;
}

function new_galaxy(option = {}) {
    let galaxy;
    if (option.style == RAY) {
        if (option.color == RANDOM_COLOR) {
            galaxy = new RandomColor_RAY_galaxy(option);
        }
        else {
            galaxy = new FixedColor_RAY_galaxy(option);
        }
    }
    else if (option.style == DOT) {
        if (option.color == RANDOM_COLOR) {
            galaxy = new RandomColor_DOT_galaxy(option);
        }
        else {
            galaxy = new FixedColor_DOT_galaxy(option);
        }
    }
    else {
        if (option.color == RANDOM_COLOR && option.style == RANDOM_STR) {
            galaxy = new RandomColor_RandomChar_galaxy(option);
        }
        else if (option.color == RANDOM_COLOR) {
            galaxy = new RandomColor_FixedChar_galaxy(option);
        }
        else if (option.style == RANDOM_STR) {
            galaxy = new FixedColor_RandomChar_galaxy(option);
        }
        else {
            galaxy = new FixedColor_FixedChar_galaxy(option);
        }
    }
    return galaxy;
}

function onClick(e) {
    fixed_galaxies.push(following_mouse_galaxy);
    following_mouse_galaxy = new_galaxy(options);
    set_info();
}

window.onload = function () {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    set_panel();
    set_option({ count: 13, opacity: 0.1, color: RANDOM_COLOR, style: RAY, sgnx: CIRCLE, sgny: CIRCLE, center_x: mouse_pos.x, center_y: mouse_pos.y, doAnim: true });
    set_info();

    resize();
    anim();
    document.addEventListener("click", onClick, false);
}

window.onresize = function () {
    resize();
}

function resize() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
    following_mouse_galaxy = new_galaxy(options);
}

function anim() {
    if (!options.doAnim) { context = null; return; }
    else context = canvas.getContext('2d');
    window.requestAnimationFrame(anim);
    context.fillStyle = `rgba(0,0,0,${options.opacity})`;
    context.fillRect(0, 0, canvas.width, canvas.height);
    following_mouse_galaxy.following_mouse_draw(mouse_pos.x, mouse_pos.y);
    fixed_galaxies.map(gal => gal.fixed_draw());
}
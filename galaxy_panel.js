
function set_info() {
    let all_stars = (fixed_galaxies.length + 1) * options.count;
    Info.innerHTML = `${fixed_galaxies.length + 1}:galaxy ${all_stars}:stars`;
}

const _DomChildrenhasRemovedCssSelected = (DOM) => {
    for (const child of DOM.children) {
        child.classList.remove('selected');
    }
}

function _move_bar() {
    const _bar = document.getElementById('bar');
    const onMouseMove = (event) => {
        let height = _bar.offsetHeight;
        let width = _bar.offsetWidth;
        Panel.style.top = (event.clientY - height / 2) + "px";
        Panel.style.left = (event.clientX - width / 2) + "px";
    }
    _bar.onmousedown = () => { document.addEventListener("mousemove", onMouseMove) };
    _bar.onmouseup = () => { document.removeEventListener("mousemove", onMouseMove) };
}


function set_opacity(e) {
    document.getElementById('Opacity').value = e * MaxOpacity;
}

function set_color(e) {
    const DOM = document.getElementById('color');
    _DomChildrenhasRemovedCssSelected(DOM);
    document.getElementById(e).classList.add('selected');
}

function set_style(e) {
    const DOM = document.getElementById('style');
    _DomChildrenhasRemovedCssSelected(DOM);
    document.getElementById(e).classList.add('selected');
}

function set_xaxis(e) {
    const DOM = document.getElementById('x-axis');
    _DomChildrenhasRemovedCssSelected(DOM);
    document.getElementById("x-" + e).classList.add('selected');
}

function set_yaxis(e) {
    const DOM = document.getElementById('y-axis');
    _DomChildrenhasRemovedCssSelected(DOM);
    document.getElementById("y-" + e).classList.add('selected');
}

function set_sample(e) {
    const DOM = document.getElementById('samples');
    _DomChildrenhasRemovedCssSelected(DOM);
    document.getElementById(e).classList.add('selected');
}

function set_option(change = {}) {
    if ('count' in change) options.count = change.count;
    if ('opacity' in change) { options.opacity = change.opacity; set_opacity(options.opacity); }
    if ('color' in change) { options.color = change.color; set_color(options.color); }
    if ('style' in change) { options.style = change.style; set_style(options.style); }
    if ('sgnx' in change) { options.sgnx = change.sgnx; set_xaxis(options.sgnx); }
    if ('sgny' in change) { options.sgny = change.sgny; set_yaxis(options.sgny); }
    if ('sample' in change) { options.sample = change.sample; set_sample(options.sample); }
    if ('center_x' in change) options.center_x = change.center_x;
    if ('center_x' in change) options.center_x = change.center_x;
    if ('doAnim' in change) options.doAnim = change.doAnim;
    if (options.doAnim) following_mouse_galaxy = new_galaxy(options);
}

function reset() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = BLACK_BACKGROUND;
    context.fillRect(0, 0, canvas.width, canvas.height);
    fixed_galaxies = [];
    set_info();
}

function set_panel() {

    Info = document.getElementById('info');
    Panel = document.getElementById('panel');

    Panel.onmouseover = (e) => { document.removeEventListener("click", onClick, false); };
    Panel.onmouseleave = (e) => { document.addEventListener("click", onClick, false); };
    _move_bar();

    document.getElementById('hidden').addEventListener('click', () => {
        if (document.getElementById('panel-body').classList.contains('hidden')) document.getElementById('panel-body').classList.remove('hidden');
        else document.getElementById('panel-body').classList.add('hidden');
    })

    document.getElementById('close').addEventListener('click', () => {
        if (document.getElementById('panel').classList.contains('hidden')) document.getElementById('panel').classList.remove('hidden');
        else document.getElementById('panel').classList.add('hidden');
    })

    {
        CTRL.color_list.map((e) => {
            let style;
            if (e == RANDOM_COLOR) style = `background-image: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet);`
            else style = `background-color:${e};`;
            document.getElementById('color').innerHTML += `<span id="${e}" class='box' style="${style}"></span>`;
        });

        CTRL.color_list.map((e) => {
            document.getElementById(e).addEventListener('click', (event) => { set_option({ color: e }); }, false);
        });
    }

    {
        CTRL.style_list.map((e) => {
            document.getElementById('style').innerHTML += `<span id="${e}" class='box'>${e}</span>`;
        });
        CTRL.style_list.map((e) => {
            document.getElementById(e).addEventListener('click', (event) => { set_option({ style: e }); }, false);
        });
    }

    {
        CTRL.x_axis.map((e) => {
            document.getElementById('x-axis').innerHTML += `<span id="x-${e}" class='box'>${e}</span>`;
        });
        CTRL.x_axis.map((elem) => {
            document.getElementById("x-" + elem).addEventListener('click', (event) => { set_option({ sgnx: elem }); }, false);
        });
    }

    {
        CTRL.y_axis.map((e) => {
            document.getElementById('y-axis').innerHTML += `<span id="y-${e}" class='box'>${e}</span>`;
        });
        CTRL.y_axis.map((elem) => {
            document.getElementById("y-" + elem).addEventListener('click', (event) => { set_option({ sgny: elem }); }, false);
        });
    }


    {
        CTRL.sapmles.map((e) => {
            document.getElementById('samples').innerHTML += `<span id="${e}" class='box'>${e}</span>`;
        });
    }
    // innerHTML追加したあとにeventlistner追加しないと動かない。
    // sample1
    document.getElementById(CTRL.sapmles[0]).addEventListener('click', (event) => {
        reset();
        set_option({ color: 'skyblue', opacity: 1, style: DOT, sgnx: CIRCLE, sgny: -1, sample: CTRL.sapmles[0] });
        for (let index = 0; index < SAMPLE_COUNT; index++) {
            set_option({ center_x: RANDOM_X(), center_y: RANDOM_Y() });
            fixed_galaxies.push(following_mouse_galaxy);
        }
        set_info();
    }, false);

    // sample2
    document.getElementById(CTRL.sapmles[1]).addEventListener('click', (event) => {
        reset();
        set_option({ opacity: 0.2, sgnx: 1, sgny: -1, color: RANDOM_COLOR, style: DOT, sample: CTRL.sapmles[1] });
        for (let index = 0; index < SAMPLE_COUNT; index++) {
            set_option({ center_x: RANDOM_X(), center_y: RANDOM_Y() });
            fixed_galaxies.push(following_mouse_galaxy);
        }
        set_info();
    }, false);

    // sample3
    document.getElementById(CTRL.sapmles[2]).addEventListener('click', (event) => {
        reset();
        set_option({ opacity: 0.1, sgnx: 0, sgny: 1, color: 'GreenYellow', style: RANDOM_STR, sample: CTRL.sapmles[2] });
        for (let index = 0; index < SAMPLE_COUNT; index++) {
            set_option({ center_x: RANDOM_X(), center_y: RANDOM_Y() });
            fixed_galaxies.push(following_mouse_galaxy);
        }
        set_info();
    }, false);

    // sample4
    document.getElementById(CTRL.sapmles[3]).addEventListener('click', (event) => {
        reset();
        set_option({ opacity: 0, sgnx: 1, sgny: CIRCLE, color: 'white', style: AA, sample: CTRL.sapmles[3] });
        for (let index = 0; index < SAMPLE_COUNT; index++) {
            set_option({ center_x: RANDOM_X(), center_y: RANDOM_Y() });
            fixed_galaxies.push(following_mouse_galaxy);
        }
        set_info();
    }, false);


    {
        const _reset_button = document.getElementById('reset');
        _reset_button.innerHTML = "CLEAR";
        _reset_button.addEventListener('click', () => { reset(); }, false);
    }

    {
        const _delete_button = document.getElementById('delete');
        _delete_button.innerHTML = "DEL";
        _delete_button.addEventListener('click', () => { fixed_galaxies.shift(); set_info(); }, false);
    }
    {
        const _stop_button = document.getElementById('stop');
        _stop_button.innerHTML = "&#9632;"; // ■
        _stop_button.addEventListener('click', () => { set_option({ doAnim: false }) }, false);
    }

    {
        const _play_button = document.getElementById('play');
        _play_button.innerHTML = "&#9658;"; // ▶
        _play_button.addEventListener('click', () => { set_option({ doAnim: true }); resize(); anim(); }, false);
    }
}
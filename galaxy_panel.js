let Panel;
let Info;

function set_info() {
    let all_stars = (fixed_galaxies.length + 1) * option.count;
    Info.innerHTML = `${fixed_galaxies.length + 1}:galaxy ${all_stars}:stars`;
}

const _clear_selected_child = (DOM) => {
    for (const child of DOM.children) {
        child.classList.remove('selected');
    }
}

const ctrl = {
    color_list: ['white', 'red', 'orange', 'yellow', 'GreenYellow', 'skyblue', 'blue', 'indigo', 'violet', 'random'],
    draw_style_list: ['L', 'C', '#', '*', 'R'],
    x_axis: [-1, 0, 1, 'C'],
    y_axis: [-1, 0, 1, 'C'],
}

const _move_bar = () => {
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

function set_panel() {
    Info = document.getElementById('info');
    Panel = document.getElementById('panel');
    Panel.onmouseover = (e) => { document.removeEventListener("click", onClick, false); };
    Panel.onmouseleave = (e) => { document.addEventListener("click", onClick, false); };
    _move_bar();

    {
        ctrl.color_list.map((e) => {
            let style;
            if (e == 'random') style = `background-image: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet);`
            else style = `background-color:${e};`;
            document.getElementById('color').innerHTML += `<span id="${e}" class='box' style="${style}"></span>`;
        });

        ctrl.color_list.map((e) => {
            document.getElementById(e).addEventListener('click', (event) => {
                _clear_selected_child(event.path[1]);
                event.target.classList.add('selected');
                option.star_color = e;
                new_galaxy();
            }, false);
        });
    }

    {
        ctrl.draw_style_list.map((e) => {
            document.getElementById('draw_style').innerHTML += `<span id="${e}" class='box'>${e}</span>`;
        });
        ctrl.draw_style_list.map((e) => {
            document.getElementById(e).addEventListener('click', (event) => {
                _clear_selected_child(event.path[1]);
                event.target.classList.add('selected');
                option.draw_style = e;
                new_galaxy();
            }, false);
        });
    }

    {
        ctrl.x_axis.map((e) => {
            document.getElementById('x-axis').innerHTML += `<span id="x-${e}" class='box'>${e}</span>`;
        });
        ctrl.x_axis.map((elem) => {
            document.getElementById("x-" + elem).addEventListener('click', (event) => {
                _clear_selected_child(event.path[1]);
                event.target.classList.add('selected');
                option.sgnx = elem;
                new_galaxy();
            }, false);
        });
    }

    {
        ctrl.y_axis.map((e) => {
            document.getElementById('y-axis').innerHTML += `<span id="y-${e}" class='box'>${e}</span>`;
        });
        ctrl.y_axis.map((elem) => {
            document.getElementById("y-" + elem).addEventListener('click', (event) => {
                _clear_selected_child(event.path[1]);
                event.target.classList.add('selected');
                option.sgny = elem;
                new_galaxy();
            }, false);
        });
    }

    {
        const _reset_button = document.getElementById('reset');
        _reset_button.innerHTML = "CLEAR";
        _reset_button.addEventListener('click', () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = `rgba(0,0,0,1)`;
            context.fillRect(0, 0, canvas.width, canvas.height);
            fixed_galaxies = [];
            set_info();
        }, false);
    }
    {
        const _delete_button = document.getElementById('delete');
        _delete_button.innerHTML = "DEL";
        _delete_button.addEventListener('click', () => { fixed_galaxies.shift(); set_info(); }, false);
    }
    {
        const _stop_button = document.getElementById('stop');
        _stop_button.innerHTML = "&#9632;"; // ■
        _stop_button.addEventListener('click', () => { option.doAnim = false; }, false);
    }

    {
        const _play_button = document.getElementById('play');
        _play_button.innerHTML = "&#9658;"; // ▶
        _play_button.addEventListener('click', () => { option.doAnim = true; resize(); anim(); }, false);
    }
    set_info();
}
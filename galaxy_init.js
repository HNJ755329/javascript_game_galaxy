let canvas;
let context;
let fixed_galaxies = [];
let following_mouse_galaxy;

let mouse_pos = {
    x: innerWidth / 2,
    y: innerHeight / 2
};
let Panel;
let Info;

const RANDOM_COLOR = 'RandomColor';
const RANDOM_STR = 'Ran';
const RAY = 'Ray';
const DOT = 'Dot';
const CIRCLE = 'Cir';
const SAMPLE_COUNT = 10; //サンプル生成する際の個数
const RANDOM_X = () => { return Math.ceil(Math.random() * canvas.width); };
const RANDOM_Y = () => { return Math.ceil(Math.random() * canvas.height); };

const options = {
    count: 13,
    opacity: 0.1,
    color: RANDOM_COLOR,
    style: RAY,
    sgnx: CIRCLE,
    sgny: CIRCLE,
    center_x: mouse_pos.x,
    center_y: mouse_pos.y,
    doAnim: true,
}

const CTRL = {
    color_list: ['white', 'red', 'orange', 'yellow', 'GreenYellow', 'skyblue', 'blue', 'indigo', 'violet', RANDOM_COLOR],
    style_list: [RAY, DOT, '#', RANDOM_STR],
    x_axis: [-1, 0, 1, CIRCLE],
    y_axis: [-1, 0, 1, CIRCLE],
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

const AA_size = 12;
const _mod = (x) => {
    return x - x % AA_size;
}

const updateTextInput = (val) => {
    option.opacity = val / 500;
}
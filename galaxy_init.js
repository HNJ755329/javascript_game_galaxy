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
const AA = '$$';
const CIRCLE = 'Cir';
const SAMPLE_COUNT = 10; //サンプル生成する際の個数

const BLACK_BACKGROUND = `rgba(0,0,0,1)`;
const RANDOM_X = () => { return Math.ceil(Math.random() * canvas.width); };
const RANDOM_Y = () => { return Math.ceil(Math.random() * canvas.height); };

// 読み込みが終わってHTML作った後に初期値を設定する。
const options = {}

const CTRL = {
    color_list: ['white', 'red', 'orange', 'yellow', 'GreenYellow', 'skyblue', 'blue', 'indigo', 'violet', RANDOM_COLOR],
    style_list: [RAY, DOT, AA, RANDOM_STR],
    x_axis: [-1, 0, 1, CIRCLE],
    y_axis: [-1, 0, 1, CIRCLE],
    sapmles: ['sp1', 'sp2', 'sp3', 'sp4'],
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

const MaxOpacity = 100;
const updateTextInput = (val) => {
    set_option({ opacity: val / MaxOpacity });
}
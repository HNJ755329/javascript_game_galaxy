/**
 * @constructor
 * @param {Array} star
 * @param {Number} count
 **/

const AA_size = 12;

class galaxy {
    constructor(option = {}) {
        this.count = option.count;
        this.stars = [];
        this.col = option.star_color;
        this.char = option.draw_style;
        this.center_x = option.center_x;
        this.center_y = option.center_y;
        this.sgnx = option.sgnx;
        this.sgny = option.sgny;
    };

    make_galaxy = () => {
        for (let i = 0; i < this.count; i++) {
            this.#make_a_star();
        }
    }

    #make_a_star = () => {
        let Rad = Math.random() * 150;
        let size = Math.random() * 10;
        let theta = Math.random() * Math.PI * 2;
        let speed = Math.random() / 50;
        this.stars.push(new star(this.center_x, this.center_y, Rad, size, this.col(), theta, speed, this.sgnx, this.sgny, this.char()));
    }

    fixed_draw = () => {
        this.stars.map(e => e.fixed_draw());
    };

    following_mouse_draw = (mouse_x, mouse_y) => {
        this.stars.map(e => e.following_mouse_draw(mouse_x, mouse_y));
    };
}

// is-a 関係なので継承をつかう
class RandomColor_RandomChar_galaxy extends galaxy {
    constructor(option) {
        const option_req = Object.assign({}, option);
        option_req.star_color = get_random_color;
        option_req.draw_style = get_random_char;
        super(option_req);
        this.make_galaxy();
    }
}

class RandomColor_FixedChar_galaxy extends galaxy {
    constructor(option) {
        const option_req = Object.assign({}, option);
        option_req.star_color = get_random_color;
        option_req.draw_style = () => { return option.draw_style; };
        super(option_req);
        this.make_galaxy();
    }
}

class FixedColor_RandomChar_galaxy extends galaxy {
    constructor(option) {
        const option_req = Object.assign({}, option);
        option_req.star_color = () => { return option.star_color; };
        option_req.draw_style = get_random_char;
        super(option_req);
        this.make_galaxy();
    }
}

class FixedColor_FixedChar_galaxy extends galaxy {
    constructor(option) {
        const option_req = Object.assign({}, option);
        option_req.star_color = () => { return option.star_color; };
        option_req.draw_style = () => { return option.draw_style; };
        super(option_req);
        this.make_galaxy();
    }
}

const _mod = (x) => {
    return x - x % AA_size;
}

/** 
 * @constructor
 * @param {Number} x position x
 * @param {Number} y position y
 * @param {Number} r radius
 * @param {Number} size star size
 * @param {String} color color
 * @param {Number} speed speed
 * @param {String} char charactor
 * @param {Number} style style
 * @param {Number} cx center x
 * @param {Number} cy center y
**/

class star {
    constructor(x, y, r, size, color, theta, speed, sgnx, sgny, style) {
        this.size = size;
        this.center_x = x;
        this.center_y = y;
        this.color = color;
        this.theta = theta;
        this.speed = speed;
        this.r = r;
        this.char = style;
        this.style = style;
        this.x = this.center_x + Math.cos(this.theta) * this.r;
        this.y = this.center_y + Math.sin(this.theta) * this.r;
        this.sgnx = sgnx;
        this.sgny = sgny;
        this.linex = (Math.abs(this.sgnx) <= 1);
        this.liney = (Math.abs(this.sgny) <= 1);
    }

    #draw_line() {
        context.beginPath();
        context.lineWidth = this.size;
        context.strokeStyle = this.color;
        context.moveTo(this.x, this.y);
        this.#move();
        context.lineTo(this.x, this.y);
        context.stroke();
        context.closePath();
    }

    #draw_AA() {
        context.fillStyle = this.color;
        context.font = `${AA_size}px`;
        context.fillText(this.char, _mod(this.x), _mod(this.y));
    }

    #draw_circle() {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.fill();
    }


    #move_rot() {
        this.theta += this.speed;
        this.x = this.center_x + Math.cos(this.theta) * this.r;
        this.y = this.center_y + Math.sin(this.theta) * this.r;
    }
    #move_x() {
        if (this.linex) this.x = (canvas.width + (this.center_x + this.r + this.sgnx * (this.theta) * 150) % canvas.width) % canvas.width;
        else this.x = this.center_x + Math.cos(this.theta) * this.r;
    }

    #move_y() {
        if (this.liney) this.y = (canvas.height + (this.center_y + this.r + this.sgny * (this.theta) * 150) % canvas.height) % canvas.height;
        else this.y = this.center_y + Math.sin(this.theta) * this.r;
    }


    #move() {
        this.theta += this.speed;
        this.#move_x();
        this.#move_y();
    }

    #set_pos(x, y) {
        this.center_x = x;
        this.center_y = y;
    }

    fixed_draw() {
        if (this.style == 'L') {
            this.#draw_line();
        }
        else if (this.style == 'C') {
            this.#move();
            this.#draw_circle();
        }
        else {
            this.#move();
            this.#draw_AA();
        }
    }

    following_mouse_draw(x, y) {
        this.#set_pos(x, y);

        if (this.style == 'L') {
            this.#draw_line();
        }
        else if (this.style == 'C') {
            this.#move();
            this.#draw_circle();
        }
        else {
            this.#move();
            this.#draw_AA();
        }
    }
}
/**
 * @constructor
 * @param {Array} star
 * @param {Number} count
 **/


class galaxy {
    constructor(option = {}) {
        this.count = option.count;
        this.stars = [];
        this.col = option.color;
        this.char = option.style;
        this.center_x = option.center_x;
        this.center_y = option.center_y;
        this.sgnx = option.sgnx;
        this.sgny = option.sgny;
    };

    make_galaxy() {
        for (let i = 0; i < this.count; i++) {
            this.make_a_star();
        }
    }

    fixed_draw() {
        this.stars.map(e => e.fixed_draw());
    };

    following_mouse_draw(mouse_x, mouse_y) {
        this.stars.map(e => e.following_mouse_draw(mouse_x, mouse_y));
    };
}


// is-a 関係なので継承をつかう
class RAY_galaxy extends galaxy {
    constructor(option) {
        super(option);
    }
    make_a_star() {
        let Rad = Math.random() * 150;
        let size = Math.random() * 10;
        let theta = Math.random() * Math.PI * 2;
        let speed = Math.random() / 50;
        this.stars.push(new RAY_star({ center_x: this.center_x, center_y: this.center_y, rad: Rad, size: size, color: this.col(), theta: theta, speed: speed, sgnx: this.sgnx, sgny: this.sgny, style: this.char() }));
    }
}

class DOT_galaxy extends galaxy {
    constructor(option) {
        super(option);
    }
    make_a_star() {
        let Rad = Math.random() * 150;
        let size = Math.random() * 10;
        let theta = Math.random() * Math.PI * 2;
        let speed = Math.random() / 50;
        this.stars.push(new DOT_star({ center_x: this.center_x, center_y: this.center_y, rad: Rad, size: size, color: this.col(), theta: theta, speed: speed, sgnx: this.sgnx, sgny: this.sgny, style: this.char() }));
    }
}

class AA_galaxy extends galaxy {
    constructor(option) {
        super(option);
    }
    make_a_star() {
        let Rad = Math.random() * 150;
        let size = Math.random() * 10;
        let theta = Math.random() * Math.PI * 2;
        let speed = Math.random() / 50;
        this.stars.push(new AA_star({ center_x: this.center_x, center_y: this.center_y, rad: Rad, size: size, color: this.col(), theta: theta, speed: speed, sgnx: this.sgnx, sgny: this.sgny, style: this.char() }));
    }
}

class RandomColor_RAY_galaxy extends RAY_galaxy {
    constructor(option) {
        const option_req = Object.assign({}, option);
        option_req.color = get_random_color;
        option_req.style = get_random_char;
        super(option_req);
        this.make_galaxy();
    }
}

class FixedColor_RAY_galaxy extends RAY_galaxy {
    constructor(option) {
        const option_req = Object.assign({}, option);
        option_req.color = () => { return option.color; };
        option_req.style = get_random_char;
        super(option_req);
        this.make_galaxy();
    }
}

class RandomColor_DOT_galaxy extends DOT_galaxy {
    constructor(option) {
        const option_req = Object.assign({}, option);
        option_req.color = get_random_color;
        option_req.style = get_random_char;
        super(option_req);
        this.make_galaxy();
    }
}

class FixedColor_DOT_galaxy extends DOT_galaxy {
    constructor(option) {
        const option_req = Object.assign({}, option);
        option_req.color = () => { return option.color; };
        option_req.style = get_random_char;
        super(option_req);
        this.make_galaxy();
    }
}

class RandomColor_RandomChar_galaxy extends AA_galaxy {
    constructor(option) {
        const option_req = Object.assign({}, option);
        option_req.color = get_random_color;
        option_req.style = get_random_char;
        super(option_req);
        this.make_galaxy();
    }
}

class RandomColor_FixedChar_galaxy extends AA_galaxy {
    constructor(option) {
        const option_req = Object.assign({}, option);
        option_req.color = get_random_color;
        option_req.style = () => { return option.style; };
        super(option_req);
        this.make_galaxy();
    }
}

class FixedColor_RandomChar_galaxy extends AA_galaxy {
    constructor(option) {
        const option_req = Object.assign({}, option);
        option_req.color = () => { return option.color; };
        option_req.style = get_random_char;
        super(option_req);
        this.make_galaxy();
    }
}

class FixedColor_FixedChar_galaxy extends AA_galaxy {
    constructor(option) {
        const option_req = Object.assign({}, option);
        option_req.color = () => { return option.color; };
        option_req.style = () => { return option.style; };
        super(option_req);
        this.make_galaxy();
    }
}

/** 
 * @constructor
 * @param {Number} x position x
 * @param {Number} y position y
 * @param {Number} rad radius
 * @param {Number} size star size
 * @param {String} color color
 * @param {Number} speed speed
 * @param {String} char charactor
 * @param {Number} style style
 * @param {Number} center_x center x
 * @param {Number} center_y center y
**/

class star {
    constructor(option = {}) {
        this.size = option.size;
        this.center_x = option.center_x;
        this.center_y = option.center_y;
        this.color = option.color;
        this.theta = option.theta;
        this.speed = option.speed;
        this.rad = option.rad;
        this.char = option.style;
        this.x = this.center_x + Math.cos(this.theta) * this.rad;
        this.y = this.center_y + Math.sin(this.theta) * this.rad;
        this.sgnx = option.sgnx;
        this.sgny = option.sgny;
        this.linex = (Math.abs(this.sgnx) <= 1);
        this.liney = (Math.abs(this.sgny) <= 1);
    }

    #move_x() {
        if (this.linex) this.x = (canvas.width + (this.center_x + this.rad + this.sgnx * (this.theta) * 150) % canvas.width) % canvas.width;
        else this.x = this.center_x + Math.cos(this.theta) * this.rad;
    }

    #move_y() {
        if (this.liney) this.y = (canvas.height + (this.center_y + this.rad + this.sgny * (this.theta) * 150) % canvas.height) % canvas.height;
        else this.y = this.center_y + Math.sin(this.theta) * this.rad;
    }

    move() {
        this.theta += this.speed;
        this.#move_x();
        this.#move_y();
    }

    set_pos(x, y) {
        this.center_x = x;
        this.center_y = y;
    }

    fixed_draw() {
        this.draw();
    }

    following_mouse_draw(x, y) {
        this.set_pos(x, y);
        this.draw();
    }
}

class RAY_star extends star {
    constructor(option) {
        super(option)
    }
    draw() {
        this.move();
        context.beginPath();
        context.lineWidth = this.size;
        context.strokeStyle = this.color;
        context.moveTo(this.x, this.y);
        this.move();
        context.lineTo(this.x, this.y);
        context.stroke();
        context.closePath();
    }
}

class DOT_star extends star {
    constructor(option) {
        super(option)
    }
    draw() {
        this.move();
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    }
}

class AA_star extends star {
    constructor(option) {
        super(option)
    }
    draw() {
        this.move();
        context.fillStyle = this.color;
        context.font = `${AA_size}px`;
        context.fillText(this.char, _mod(this.x), _mod(this.y));
    }
}
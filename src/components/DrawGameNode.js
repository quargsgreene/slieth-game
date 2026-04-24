const LEFT_CHILD = 0;
const RIGHT_CHILD = 1;

export default class DrawGameNode {
    constructor(value, index) {
        this.value = value;
        this.index = index;
        this.pos = {x: 0, y: 0};
        this.parent = null;
        this.children = [];
        this.r = 20;
    }

    get left() {
        return this.children[LEFT_CHILD];
    }

    set left(value) {
        value.parent = this;
        this.children[LEFT_CHILD] = value;
    }

    get right() {
        return this.children[RIGHT_CHILD];
    }

    set right(value) {
        value.parent = this;
        this.children[RIGHT_CHILD] = value; 
    }

    get position() {
        return this.pos;
    }

    set position(position) {
        this.pos = position;
    }

    set radius(radius) {
        this.r = radius;
    }

    get radius() {
        return this.r;
    }

}
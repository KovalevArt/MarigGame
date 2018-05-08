export default class SpriteSheet {
    constructor(image, width = 16, height = 16) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }

    define(name, x, y, width, height) {
        const buffer = document.createElement('canvas');
        buffer.height = height;
        buffer.width = width;
        buffer
            .getContext('2d')
            .drawImage(
                this.image,
                x,
                y,
                width,
                height,
                0,
                0,
                width,
                height);
        this.tiles.set(name, buffer);
    }

    defineTile(name, x, y){
        this.define(name, x* this.width, y * this.height, this.width, this.height);
    }

    draw(name, ctx, x, y) {
        const buffer = this.tiles.get(name);
        ctx.drawImage(buffer, x, y);
    }

    drawTile (name, ctx, x, y) {
        this.draw (name, ctx, x * this.width, y * this.height);
    }
}
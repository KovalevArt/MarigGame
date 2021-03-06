function drawBackground(backgrounds, ctx, sprites) {
    backgrounds.ranges.forEach(([x1,x2,y1,y2])=>{
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(backgrounds.tile, ctx, x, y);
            }
        }
    });
}


export function createBackgroundLayer(backgrounds, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;   

    backgrounds.forEach(background=> {
        drawBackground(background,buffer.getContext('2d'), sprites);
    });
    return function drawBackgroundLayer(ctx) {
        ctx.drawImage(buffer,0,0);
        
    }
}

export function createSpriteLayer(entities) {
    return function drawSpriteLayer(ctx) {   
    	entities.forEach(entity=>{
    		entity.draw(ctx);
    	});
        
    };    
}
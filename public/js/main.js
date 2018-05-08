import { loadLevel} from './loaders.js';

import {createMario} from './entities.js';
import Entity from './Entity.js';
import Timer from './Timer.js';
import Compositor from './Compositor.js';


import KeyboardState from './KeyboardState.js';


//window.addEventListener('keydown', event => {
//    event.preventDefault();
//    console.log(event);
//});

const canvas = document.getElementById('screen');
const ctx = canvas.getContext("2d");

Promise.all([
    createMario(),
    loadLevel('1-1'),
    ])
.then(([mario, level])=>{
    

    const gravity = 2000;
    mario.pos.set(64, 180);
    //mario.vel.set(200, -600);
    level.entities.add(mario);

    const SPACE = 32;
    const input = new KeyboardState();
    input.addMapping(SPACE, keyState=> {
        if(keyState) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
        console.log(keyState);
    });
    input.listenTo(window);



    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        //mario.update(deltaTime);
        level.comp.draw(ctx);
        mario.vel.y += gravity * deltaTime;
    }
   timer.start();

});

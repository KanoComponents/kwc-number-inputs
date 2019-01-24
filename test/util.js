import {
    makeSoloTouchEvent,
    touchstart,
    middleOfNode,
    touchend,
} from '../node_modules/@polymer/iron-test-helpers/mock-interactions.js';

export function touchmove(node, fromXY, toXY, steps) {
    const theSteps = steps || 5;
    const dx = Math.round((fromXY.x - toXY.x) / theSteps);
    const dy = Math.round((fromXY.y - toXY.y) / theSteps);
    const xy = { 
        x: fromXY.x,
        y: fromXY.y,
    };
    for (let i = theSteps; i > 0; i -= 1) {
        makeSoloTouchEvent('touchmove', xy, node);
        xy.x += dx;
        xy.y += dy;
    }
    makeSoloTouchEvent('touchmove', {
        x: toXY.x,
        y: toXY.y,
    }, node);
}

export function touchtrack(target, dx, dy, steps) {
    const dX = dx | 0;
    const dY = dy | 0;
    const theSteps = steps || 5;
    touchstart(target);
    const xy = middleOfNode(target);
    const xy2 = {
        x: xy.x + dX,
        y: xy.y + dY,
    };
    touchmove(target, xy, xy2, theSteps);
    touchend(target, xy2);
}

export default {
    touchmove,
    touchtrack,
};

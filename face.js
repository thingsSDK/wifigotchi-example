'use strict';

let state = "unknown";
let graphics;
let matrix;
let render;
let isBlinking = false;

export const FACE_TYPES = {
    UNKOWN: "unknown",
    SMILE: "smile",
    FROWN: "frown",
    NEUTRAL: "neutral"
};

export function init(context, renderFunction) {
    graphics = context;
    render = renderFunction;
    startAnimations();
}

function startAnimations() {
    setInterval(renderFace, 1000 / 16);
    setTimeout(blink, nextBlinkTime());
}

function blink() {
    isBlinking = true;
    setTimeout(openEyes, eyeCloseTime());
}

function openEyes() {
    isBlinking = false;
    setTimeout(blink, nextBlinkTime());
}

function nextBlinkTime() {
    if (Math.floor(Math.random() * 3) === 1) {
        return eyeCloseTime();
    } else {
        return 5000 + ((Math.random() - 0.5) * 2000);
    }
}

function eyeCloseTime() {
    return 250 + ((Math.random() - 0.5) * 200);
}

function eyes() {
    //eyes
    if (!isBlinking) {
        graphics.setPixel(2, 2);
        graphics.setPixel(5, 2);
    }
}

function smile() {
    //mouth
    graphics.drawLine(2, 4, 4, 5);
    graphics.drawLine(5, 4, 3, 5);
}

function frown() {
    //mouth
    graphics.drawLine(3, 4, 2, 5);
    graphics.drawLine(4, 4, 5, 5);
}

function neutralMouth() {
    //mouth
    graphics.drawLine(2, 4, 5, 4);
}

function roundFace() {
    //face top
    graphics.drawLine(0, 2, 2, 0);
    graphics.drawLine(5, 0, 7, 2);
    graphics.drawLine(3, 0, 5, 0);

    //face left
    graphics.drawLine(0, 2, 0, 4);
    //face right
    graphics.drawLine(7, 2, 7, 4);

    //face bottom
    graphics.drawLine(0, 5, 2, 7);
    graphics.drawLine(5, 7, 7, 5);
    graphics.drawLine(3, 7, 5, 7);
}


function smilyFace() {
    graphics.clear();
    roundFace();
    smile();
    eyes();
}

function frownyFace() {
    graphics.clear();
    roundFace();
    frown();
    eyes();
}

function neutralFace() {
    graphics.clear();
    roundFace();
    neutralMouth();
    eyes();
}

function renderFace() {
    switch (state) {
        case FACE_TYPES.UNKOWN:
            roundFace();
            break;
        case FACE_TYPES.SMILE:
            smilyFace();
            break;
        case FACE_TYPES.FROWN:
            frownyFace();
            break;
        case FACE_TYPES.NEUTRAL:
            neutralFace();
            break;
        default:
            smilyFace();
            break;
    }
    render();
}

export function setState(newState) {
    state = newState;
}
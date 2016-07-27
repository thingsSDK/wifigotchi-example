'use strict';
import {rotate} from './utils';

export let context;
let address; 

/**
* Constructor for an Adafruit 8 x 8 LED Matrix Backpack.
* Provides drawing capabilities like the Adafruit Arduino Library API.
*
* @param options. An object literal with the keys of `scl` and `sda` for the clock and data I2C pins. The option `address`
* is a hexadecimal address of the device. A 7-bit address between 0x70-0x77. The key `brightness` is a number 0 through 15.
* @constructor
*/
export function init(options){
    if(typeof options.scl === "undefined" ||
        typeof options.sda === "undefined" ||
        typeof options.brightness === "undefined" ||
        typeof options.address === "undefined") {
        throw new Error("Required option of `scl`, `sda`, `brightness` and/or `address` is missing.");
    }
    address = options.address;
    I2C1.setup({scl: options.scl, sda: options.sda });
    I2C1.writeTo(address, 0x21); // turn on oscillator
    I2C1.writeTo(address, 0x81); // disp on
    setBrightness(options.brightness);
    context = Graphics.createArrayBuffer(16,8,1);
}

/**
* Set the brightnes of the LEDs. A number 0 through 15.
* @param brightness
*/
export function setBrightness(brightness) {
    // brightness 0-15
    I2C1.writeTo(address, 0xE0 | brightness);
}

/**
* Renders buffer/graphics context to the display.
*/
export function render() {
    I2C1.writeTo(address, 0,
        //Because of how the 8x8 Matrix is wired you need to rotate right by one bit
        (new Uint8Array(context.buffer)).map(rotate)
    );
}


/**
* Clears graphics buffer.
*/
export function clear() {
    context.clear();
}

/**
* Same as `render()`.
*/
export function writeDisplay (){
        render();
    }

/**
* Writes an array of 8 8-bit values to the display graphics context
* @param uint8array
*/
export function drawBitmap(uint8array){
    var array = [];
    uint8array.forEach(function(i){
        array.push(i);
        array.push(i);
    });
    context.buffer = new Uint8Array(array);
}

/**
* Draws a pixel at the co-ordinates.
* @param x is the x co-ordinate. 0-7.
* @param y is the y co-ordinate. 0-7.
* @param state. 1 for on. 0 for off.
*/
export function drawPixel(x, y, state) {
    context.setPixel(x, y, state);
}

/**
* Draws a line from one set of co-ordinates to another
*
* @param x1 is the x value for the first set of co-ordinates
* @param y1 is the y value for the first set of co-ordinates
* @param x2 is the x value for the second set of co-ordinates
* @param y2 is the y value for the second set of co-ordinates
*/
export function drawLine(x1, y1, x2, y2) {
    context.drawLine(x1, y1, x2, y2);
}

/**
* Draws a rectangle at a set of co-ordinates of a given width and height
*
* @param x is the x value where you want to start
* @param y is the y value where you want to start
* @param width is the width of the rectangle
* @param height is the height of the rectangle
*/
export function drawRect(x, y, width, height) {
    context.drawRect(x, y,  x + width - 1, y + height - 1);
}

/**
* Draws a filled in rectangle at a set of co-ordinates of a given width and height
* @param x is the x value where you want to start
* @param y is the y value where you want to start
* @param width is the width of the rectangle
* @param height is the height of the rectangle
*/
export function fillRect(x, y, width, height) {
    context.fillRect(x, y, x + width - 1, y + height - 1);   
}
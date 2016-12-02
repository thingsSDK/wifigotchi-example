'use strict';

import {init as matrix, context, render} from 'thingssdk-adafruit-matrix';
import {init as face, setState as setFaceState} from './face';
import {init as wifimanager} from './wifimanager';
import {request} from './api';
import credentials from './credentials.json';

function main() {

matrix({scl:5, sda:4, address:0x70, brightness: 0});

face(context, render);

wifimanager({
    credentials, 
    onConnect: () => request(setFaceState)
});

}
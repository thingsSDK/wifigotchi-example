'use strict';

import {init as matrix, context, render} from 'thingssdk-adafruit-matrix';
import {init as face, setState as setFaceState} from './face';
import {init as wifimanager} from './wifimanager';
import {request} from './api';

matrix({scl:5, sda:4, address:0x70, brightness: 0});

face(context, render);

wifimanager({
    credentials: {
        "SSID": "PASSWORD",
        "ANOTHER_SSID": "THAT_OTHER_PASSWORD"
    },
    onConnect: () => request(setFaceState)
});

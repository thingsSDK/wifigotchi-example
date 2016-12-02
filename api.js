'use strict';

export function request(updateState) {
    require("http").get("http://wifigotchi.herokuapp.com/state", function (res) {
        var faceState = "";
        res.on('data', data => {
            faceState += data;
        });
        res.on('close', () => {
            updateState(faceState);
            setTimeout(() => {
                request(updateState);
            }, 1000);
        });
    });
}
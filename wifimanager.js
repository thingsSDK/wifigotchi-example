'use strict';
let wifi = require('Wifi');

let credentials;
let availableSSIDS = [];
let onConnect;

export function init(options) {
    //Initialization
    credentials = options.credentials;
    onConnect = options.onConnect;
    connect();
}

function reset() { 
    wifi.reset(handleReset);
}

function callCallback(){
    if(onConnect) {
        onConnect();
    }
}

function connect() {
    var ssid = nextSSID();
    var passphrase = credentials[ssid];

    while(passphrase === undefined) {
        ssid = nextSSID();
        passphrase = credentials[ssid];
        if(ssid === undefined) {
            break;
        }
    }

    if(ssid === undefined) {
        getAPs();
    } else {
        console.log("Connecting to..", ssid);
        wifi.connect(
            ssid,
            {password: passphrase},
            handleConnect);
    }
}

function handleReset(error){
    if(error){
        console.log("handleReset(): ", error);
    } else {
        console.log("WiFi Reset...");
        getAPs();
    }
}

function getAPs(){
    console.log("Getting List of Access Points...");
    wifi.scan(handleGetAPs);
}

function handleGetAPs(aps){
    availableSSIDS = aps.map(function(ap){ return ap.ssid; });
    connect();
}

function handleConnect(error) {
    if(error) {
        console.log("handleConnect(): ", error);
        connect();
    } else {
        console.log("Connected to WiFi...");
        wifi.getIP(handleGetIP);
        callCallback();
    }
}

function handleGetIP(error, ipAddress) {
    if(error) {
        console.log("handleGetIP(): ", error);
    } else {
        console.log("Current IP Address: ", ipAddress);
    }
}

function nextSSID(){
    return availableSSIDS.shift();
}
# wifigotchi-example

This is an example of the [Wifigotchi](http://wifigotchi.com) running on the JavaScript runtime [Espruino](http://espruino.com) on an ESP8266 based board, the [Adafruit Feather HUZZAH](https://www.adafruit.com/products/2821).

## Bill of Materials

* [Adafruit Feather HUZZAH](https://www.adafruit.com/products/282)1 or any ESP12 based ESP8266 boards
* [8x8 LED Matrix](https://www.adafruit.com/products/1857) Any color, as long as it has the 
* [Breadboard](https://www.adafruit.com/products/64) 
* [Breadboarding wire](https://www.adafruit.com/products/153)
* 
## Software

* [Flasher.js](http://forefront.io/a/introducing-flasher-js/) (To installer/flash Espruino on your ESP8266 board)
* Node.js / npm

## Wiring

![Wifigotchi wiring](images/wiring.png)

## Run the Code!

Make sure you've flashed the Espruino runtime using the one-click flasher utility, [Flasher.js](http://forefront.io/a/introducing-flasher-js/). You only need to do this once.

![Flasher.js 2x speed](http://forefront.io/attachments/flasher.js.gif)

Clone or download the project.

```
$ git clone https://github.com/thingsSDK/wifigotchi-example.git
```

Install the dependancies.

```
$ npm install
```

Modify `devices.json` with your COM/serial port. Replace `COM7` to your port.

Modify `main.js` with your wifi connectivity settings.

```javascript
    {
        "SSID": "PASSWORD",
        "ANOTHER_SSID": "THAT_OTHER_PASSWORD"
    }
```

For example, if your home wifi network was `NETGEAR52` and your password was `LetMeIn` change the code to this.

```javascript
    {
        "NETGEAR52": "LetMeIn"
    }
```

If you wanted your device to connect to your work network `WORK` aswell, you can add another entry to the credentials.

```javascript
    {
        "NETGEAR52": "LetMeIn",
        "WORK": "dadada"
    }
```

When you're done run the push command to deploy it to your device.

```
$ npm run push
```

Then visit [http://wifigotchi.com](http://wifigotchi.com) and click a face and watch your internet enabled Wifigotchi change it's face!

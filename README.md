# Basic IoT Project: node-ionic-bluetooth
This is a basic IoT "Internet of Things" project. After setting up this project, you will be able to turn a LED ON and OFF using the Ionic app from your IOS or Android device.

The Raspberry Pi serves as the "slave" or peripheral device using a node script. The Raspberry Pi must have a USB Bluetooth dongle installed.

The mobile app, built with Ionic, serves as the "controller" or central device.

## Slave Device: Setting Up The Raspberry Pi with Bleno
### Run the following Commands to Setup the Device:

```
sudo apt-get update
sudo apt-get install node
npm install node-gyp
npm install bleno
npm install gpio
```

Place the light.js file, found in /node-device/, in a directory on the Raspberry Pi.
Run light.js from the Rapsberry Pi command line with the following command:

```
sudo node light.js
```

## Controller Device: Run Ionic on Mobile Device
After you have installed Ionic on your computer you can run the following commands in the project directory depending on if you have an android or IOS device:

```
ionic platform add ios
ionic build ios
ionic run ios --device
```

or for android

```
ionic platform add android
ionic build android
ionic run android
```

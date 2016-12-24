# node-ionic-bluetooth
This is a node server making use of Bleno. It also contains Ionic code to interface with it. It is my first "Internet of Things" project.

## Setting Up The Raspberry Pi with Bleno
### Run the following Commands:

```
sudo apt-get update
sudo apt-get install node
npm install node-gyp
```

Place the light.js file, found in node-device, in a directory on the Rapsberry Pi.
Run light.js with the following command:

```
sudo node light.js
```

## Run Ionic on Mobile Device
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

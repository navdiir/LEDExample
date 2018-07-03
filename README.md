# LEDExample

An example how to paid a LED to turn it on for some IOTAs

> This example is made in JavaScript, be sure that you have NodeJS and npm installed

## Installation 

Clone this repository and then execute
```
npm i
```

## Edit

This example used an Arduino with Johnny-five library. You should edit these lines:

```
8.   const seedLed = ''
11.  port: 'COM10'
48.  let led = new five.Led(13)
```

## Getting Started

After you've successfully installed and edit with your preference, now you can execute index for a simple user experience

```
node index.js
```

var bleno = require('bleno');

var gpio = require("gpio");

var buf;

var gpio4 = gpio.export(4, {
  direction: "out",
  ready: function() {
    gpio4.set(0);
  }
});


function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

var attendees = [];
var settings = {
  service_id: '12ab',
  characteristic_id: '34cd'
};

bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    bleno.startAdvertising('AttendanceApp', ['12ab']);
    console.log("Bluetooth On");
  } else {
    bleno.stopAdvertising();
  }
});


// Notify the console that we've accepted a connection
bleno.on('accept', function(clientAddress) {
  console.log("Accepted connection from address: " + clientAddress);
});


// Notify the console that we have disconnected from a client
bleno.on('disconnect', function(clientAddress) {
  console.log("Disconnected from address: " + clientAddress);
});

bleno.on('advertisingStart', function(error) {
  console.log("Advertising Started");
  if (error) {
    // error on advertise start
    console.log("Error: " + error);
  } else {
    console.log('started...');

    //console.log(bleno);

    bleno.setServices([

      new bleno.PrimaryService({
        uuid: settings.service_id,
        characteristics: [
          new bleno.Characteristic({
            value: null,
            uuid: settings.characteristic_id,
            properties: ['notify', 'read', 'write'],

            onWriteRequest: function(data, offset, withoutResponse, callback) {
              //withoutResponse = false;
              console.log(withoutResponse);

              this.value = ab2str(data).replace(/[^\w\s]/gi, '');

              //console.log("Length: " + this.value.length);
              console.log("Data: " + this.value);

              if (this.value == 'on') {
                gpio4.set(1);
                buf = [111, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110]; // -> onnnn
              }

              if (this.value == 'off') {
                gpio4.set(0);
                buf = [111, 102, 102, 125, 93, 58, 40, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33]; // -> offff
              }

              var result = this.RESULT_SUCCESS;
              callback(result);
            },

            onReadRequest: function(offset, callback) {

              var result = this.RESULT_SUCCESS;

              // CREATE BUFFER FROM TYPED ARRAY
              var data = new Buffer(new Uint8Array(buf));

              callback(result, data);
            }


          })
        ]
      })

    ]);


  }
});

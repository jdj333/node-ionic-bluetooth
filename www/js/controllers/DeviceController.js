(function() {
  angular.module('starter').controller('DeviceController', ['$scope', '$state', '$stateParams', 'DeviceFactory', DeviceController]);

  function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint16Array(ab);
    for (var i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
    }
    return ab;
  }

  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  }


  function DeviceController($scope, $state, $stateParams, DeviceFactory) {

    var me = this;

    var service_id = '12ab';
    var characteristic_id = '34cd';

    me.attendee = {
      firstname: '',
      lastname: ''
    }

    $scope.init = function() {
      $scope.device = DeviceFactory.getDevice($stateParams.id);
    }

    //LED ON Event
    $scope.led_on = function() {
      ble.isEnabled(
        function() {
          //alert("bluetooth is available");
        }
      );

      var buf = [111, 110]; // -> on
      var data = new Uint16Array(buf);

      ble.write($stateParams.id, service_id, characteristic_id, data.buffer,

        function(response) {

          //response = ab2str(response);

          //alert("response: " + response);

          if (response == 'OK') {
            ble.disconnect($stateParams.id);
            $state.go('home');
          } else {
            //alert("response NOT OK");
          }
        },

        function(err) {
          alert("Error occured. Please try again.");
        }
      );

      ble.read($stateParams.id, service_id, characteristic_id,
        function(success) {

          alert("Success: " + ab2str(success));
          console.log(success);
        },
        function(err) {
          alert("Error occured. Please try again.");
        }
      );


    }

    //LED Off Event
    $scope.led_off = function() {

      var buf = [111, 102, 102]; // -> off
      var data = new Uint16Array(buf);

      ble.write($stateParams.id, service_id, characteristic_id, data.buffer,

        function(response) {
          if (response == 'OK') {
            //alert("Your attendance is recorded!");
            ble.disconnect($stateParams.id);
            $state.go('home');
          } else {
            //alert("response NOT OK");
          }
        },

        function(err) {
          alert("Error occured. Please try again.");
        }
      );

      ble.read($stateParams.id, service_id, characteristic_id,
        function(success) {

          alert("Success: " + ab2str(success));
          console.log(success);
        },
        function(err) {
          alert("Error occured. Please try again.");
        }
      );

    }


    $scope.backToHome = function() {
      $state.go('home');
      ble.disconnect($stateParams.id);
    }

  }

})();

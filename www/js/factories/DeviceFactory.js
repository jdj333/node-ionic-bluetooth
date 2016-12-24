(function(){
  angular.module('starter')
  .factory('DeviceFactory', [DeviceFactory]);

  function DeviceFactory(){
    var devices = [];
    return {
      addDevice: function(device){
        devices.push(device);
      },

      getDevices: function(){
        return devices;
      },

      getDevice: function(id){
        var device_found = devices.filter(function(device){
          return device.id == id;
        });
        return device_found[0];
      },

      reset: function(){
        devices = [];
      }

    };
  }

})();

(function(){
  angular.module('starter')
  .controller('HomeController', ['$scope', '$state', 'DeviceFactory', HomeController]);

  function HomeController($scope, $state, DeviceFactory){

    $scope.devices = []; // the devices listed in the page

    $scope.scan = function(){

      DeviceFactory.reset();
      ble.startScan(
        [],
        function(device){
          if(device.name){
            DeviceFactory.addDevice({ 'id': device.id, 'name': device.name });
          }
        },
        function(err){
          alert('Scanning failed. Please try again.');
        }
      );

      setTimeout(
          ble.stopScan,
          1500,
          function(){
            $scope.$apply(function(){
              $scope.devices = DeviceFactory.getDevices();
            });
          },
          function(){
            // Stopping scan failed
          }
      );

    }

    $scope.connect = function(device_id){
      ble.connect(
        device_id,
        function(res){
          $state.go('device', { 'id': device_id });
        },
        function(err){
          alert('Something went wrong while trying to connect. Please try again');
        }
      );
    }

  }

})();

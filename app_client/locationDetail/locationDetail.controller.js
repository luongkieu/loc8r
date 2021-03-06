(function () {

  angular
    .module('loc8rApp')
    .controller('locationDetailCtrl', locationDetailCtrl);

  locationDetailCtrl.$inject = ['$routeParams', '$uibModal', 'loc8rData'];
  function locationDetailCtrl ($routeParams, $uibModal, loc8rData) {
    var vm = this;
    vm.locationid = $routeParams.locationid;

    loc8rData.locationById(vm.locationid)
      .then(function successcallback (data) {
        vm.data = { location: data.data };
        vm.pageHeader = {
          title: vm.data.location.name
        };
      }), (function errocallback(e) {
        console.log(e);
      });

    vm.popupReviewForm = function () {
      var ModalInstance = $uibModal.open({
        templateUrl: '/reviewModal/reviewModal.view.html',
        controller: 'reviewModalCtrl as vm',
        resolve : {
          locationData : function () {
            return {
              locationid : vm.locationid,
              locationName : vm.data.location.name
            };
          }
        }
      });
      ModalInstance.result.then(function (data) {
      	vm.data.location.reviews.push(data);
      });

    };

  }

})();
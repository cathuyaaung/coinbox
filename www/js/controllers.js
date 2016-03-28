angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, ngFB, $state) {
    $scope.fbLogin = function () {
        ngFB.login({scope: 'email'})
            .then(function (response) {
                if (response.status === 'connected') {
                    console.log('facebook login success');
                    $state.go('tab.dash');
                }else{
                    alert('Facebook login failed');
                }
            });
    };
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, ngFB, $state) {
    ngFB.api({
        path: '/me',
        params: {fields: 'id,name,email,gender,location,hometown'}
    }).then(
        function (user) {
            $scope.user = user;
            console.log(user);
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        }
    );

    $scope.fbLogout = function () {
        $state.go('login')
    };
  $scope.settings = {
    enableFriends: true
  };
})



;

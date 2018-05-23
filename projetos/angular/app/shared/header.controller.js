app.controller("HeaderController", function ($scope, $location) {
    $scope.navItens = [{
            text: 'Home',
            url: '/'
        }, {
            text: 'Tracks',
            url: '/tracks'
        }, {
            text: 'Artists',
            url: '/artists'
        }, {
            text: 'Albuns',
            url: '/albuns'
        }
    ];
    
    $scope.isActive = function(url) {
        return url == $location.path();
    };
});
app.directive('carouselPlaylists', function () {
    return {
        scope: {
            playlists: '=',
            onSlide: '&'
        },
        controller: 'CarouselPlaylistsController',
        templateUrl: 'app/directives/carousel-playlists/carousel-playlists.partial.html',
        link: function (scope, element, attrs) {
            setTimeout(function () {
                var instances = M.Carousel.init($$('.carousel'), {
                    numVisible: 5,
                    dist: -10,
                    shift: 10,
                    padding: 5,
                    indicators: true,
                    noWrap: true,
                    onCycleTo: function (elem) {
                        scope.$apply(function () {
                            scope.focusedElem = elem;
                        });                        
                    }
                });
            }, 100);
        }
    };
});
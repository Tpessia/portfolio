app.directive('materializePag', function () {
    return {
        scope: {
            maxPage: '=maxPage',
            pageChangeFunc: '&pageChangeFunc'
        },
        templateUrl: 'app/directives/pagination.partial.html'
    };
});
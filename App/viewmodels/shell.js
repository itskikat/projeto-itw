define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', title:'Início', moduleId: 'viewmodels/welcome', nav: false },
                { route: 'Laureados', moduleId: 'viewmodels/laureates', nav: true },
                { route: 'Premios', moduleId: 'viewmodels/prizes', nav: true },
                { route: 'curiosidades', moduleId: 'viewmodels/curiosidades', nav: true },
                { route: 'quiz', moduleId: 'viewmodels/quiz', nav: true },
                { route: 'laureateDetails/:id', moduleId: 'viewmodels/laureateDetails', nav: false },
                { route: 'prizesDetails/:id', moduleId: 'viewmodels/prizesDetails', nav: false},
                { route: 'info', moduleId: 'viewmodels/info', nav: false},
            ]).buildNavigationModel();
            
            return router.activate();
        }
        
    };
});
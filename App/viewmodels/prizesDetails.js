define(['plugins/router', 'knockout'], function (router, ko) {
    var ctor = function () {
        console.log('ViewModel initiated...')
        var self = this;
        var baseUri = 'http://192.168.160.40/nobel/api/PremioNobels/';
        this.displayName = 'Informações do Prémio';
        this.premioURI
        var premioId = router.activeInstruction().params[0];
        baseUri += premioId;
        //---Variáveis locais
        self.error = ko.observable();
        self.prizesDetails = ko.observable();
        //--- Internal functions
        function ajaxHelper(uri, method, data) {
            self.error(''); // Clear error message
            return $.ajax({
                type: method,
                url: uri,
                dataType: 'json',
                contentType: 'application/json',
                data: data ? JSON.stringify(data) : null,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + uri + "] Fail...");
                    self.error(errorThrown);
                }
            })
        }
        getPrizes = function () {
            console.log('CALL: getPrizes...')
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.prizesDetails(data);
                if (self.prizesDetails().length == 0)
                    alert('No Prizes found...');
            });
        };
        //--- Externel functions (accessible outside)
        parseDate = function (theDate) {
            return theDate.split('T')[0];
        };

        // formatação do nome
        parseName = function (text) {
            return text.slice(0, -5);
        };

        start = function () {
            console.log('CALL: start...');
            getPrizes();
        };
        start();
    };

    return ctor;
});
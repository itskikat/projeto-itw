define(['plugins/router', 'knockout'], function (router, ko) {
    var ctor = function () {
        console.log('ViewModel initiated...')
        var self = this;
        var baseUri = 'http://192.168.160.40/nobel/api/LaureadoIndividuos/';
        this.displayName = 'Informações do Laureado';
        this.laureadosURI
        var laureadoId = router.activeInstruction().params[0];
        baseUri += laureadoId;
        //---Variáveis locais
        self.error = ko.observable();
        self.laureateDetails = ko.observable();
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
        getLaureate = function () {
            console.log('CALL: getLaureate...')
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.laureateDetails(data);
                if (self.laureateDetails().length == 0)
                    alert('No Laureate found...');
            });
        };
        //--- Externel functions (accessible outside)

        // formatação data
        parseDate = function (theDate) {
            return theDate.split('T')[0];
        };

        // formatação titulo do premio (retira ano no final)
        parseName = function (text) {
            return text.slice(0, -5);
        };


        // Mostra / esconde mapa Cidade/Pais nascimento
        birthMap = function(){
            if ($("#mapaN").attr('hidden')){
                $("#mapaN").removeAttr('hidden');
            }
            else{
                $("#mapaN").attr('hidden', true);
            }

        };

        // Mostra / esconde mapa Cidade/Pais morte (se for o caso)
        deathMap = function(){
            if ($("#mapaM").attr('hidden')){
                $("#mapaM").removeAttr('hidden');
            }
            else{
                $("#mapaM").attr('hidden', true);
            }

        };

        start = function () {
            console.log('CALL: start...');
            getLaureate();
        };
        start();
    };

    return ctor;
});
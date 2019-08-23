define(['knockout'], function (ko) {
    var vm = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var baseUri = 'http://192.168.160.40/nobel/api/LaureadoIndividuos?';
        self.className = 'Indivíduos Laureados';
        self.description = 'This page aims to demonstrate the use of the Nobel web API for laureates and the interconnection with other entities.<br>Called method(s): <ul><li>' + baseUri + '</li></ul>';
        self.error = ko.observable();
        self.laureates = ko.observableArray([]);
        self.city = ko.observableArray([]);
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

        //--- External functions (accessible outside)
        getLaureates = function () {
            console.log('CALL: LaureadoIndividuos...')
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.laureates(data);
                // cópia dos dados
                self.temporaryLaureates(data);
            });
        };

        // formatação da data
        parseDate = function (theDate) {
            if (theDate != null )
                return theDate.split('T')[0];
            return "----";
        };

        var n = 1

        self.countPrevious = ko.observable(false);
        self.countNext = ko.observable(true);

        // função avançar página
        self.nextPage = function(){
            n += 1
            if (n==1){

                self.countPrevious(false);
            }
            copyUri = baseUri
            copyUri += '&page=' + n
            // página sem dados
            copyUri_invalid = baseUri
            copyUri_invalid += '&page=' + (n+1)
            // mostra página seguinte se existirem dados
            ajaxHelper(copyUri, 'GET').done(function (data) {
                if (data != null){
                    self.laureates(data);
                    if (n>1){
                        self.countPrevious(true);
                    }
                }
            });
            // não deixa avançar por não haver dados
            ajaxHelper(copyUri_invalid, 'GET').done(function (data) {
                console.log(data);
                if (data.length == 0) {
                    self.countNext(false);
                    if (n>1){
                        self.countPrevious(true);
                    }
                }
            });
        }

        // função recuar página
        self.previousPage = function(){
            n -= 1
            copyUri = baseUri
            copyUri += '&page=' + n
            // página sem dados
            copyUri_invalid = baseUri
            copyUri_invalid += '&page=' + (n-1)
            // mostra página anterior, caso contenha dados
            ajaxHelper(copyUri, 'GET').done(function (data) {
                if (data != null){
                    self.countPrevious(true);
                    self.laureates(data);
                    self.countNext(true);
                }
                // é possível retroceder em todas as páginas excecto primeira
                if (n != 1){
                    self.countPrevious(true);
                }
                // primeira página, não é possível retroceder
                else {
                    self.countPrevious(false);
                }
            });
            ajaxHelper(copyUri_invalid, 'GET').done(function (data) {
                if (data == null){
                    self.countPrevious(false);
                }
            });  
        }

        // função devolve tamanho do objeto
        function getSize(obj){
            var tamanho = 0;
            for(x in obj){
                if(obj.hasOwnProperty(x))
                tamanho ++;      
            }
            return tamanho;
        }

        // função procura por nobels (SEM CLICAR)
        self.temporaryLaureates = ko.observable();
        self.searchText = ko.observable();
        searchLaureates = function () {
            var thedata = new Array();
            if (self.searchText().length >= 3) {
                for(k = 0; k < getSize(self.temporaryLaureates()); k++){
                    var nome = self.temporaryLaureates()[k].Nome.toLowerCase();
                    console.log(nome)
                    var procura = self.searchText().toLowerCase();
                    if (nome.includes(procura)){
                        thedata.push(self.temporaryLaureates()[k])
                    }
                }
            } 
            if(self.searchText().length==0){
                self.laureates(self.temporaryLaureates())
            }
            self.laureates(thedata)
        }

        // função filtragem por sexo masculino
       self.filterM = function(){
            baseUri = 'http://192.168.160.40/nobel/api/LaureadoIndividuos' + '?Gender=M';
            n=0;
            self.nextPage();
        }

        // função filtragem por sexo feminino
        self.filterF = function(){
            baseUri = 'http://192.168.160.40/nobel/api/LaureadoIndividuos' + '?Gender=F';
            n=0;
            self.nextPage();
        }

        // função pesquisa/filtragem por cidade
        self.filterCity = function(){
            var city = $("#scidade").val();
            baseUri = 'http://192.168.160.40/nobel/api/LaureadoIndividuos';
            baseUri += '?City=' + city;
            n=0;
            self.nextPage();
        }

        // função pesquisa/filtragem por país
       self.filterpais = function(){
            var pais = $("#spais").val();
            baseUri = 'http://192.168.160.40/nobel/api/LaureadoIndividuos';
            baseUri += '?Country=' + pais;
            n=0;
            self.nextPage();
        }

        //---- initial call
        getLaureates();

    };
    return vm;
});

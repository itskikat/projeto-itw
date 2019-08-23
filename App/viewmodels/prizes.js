define(['knockout'], function (ko) {
    var vm = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var baseUri = 'http://192.168.160.40/nobel/api/PremioNobels';
        self.className = 'Prémios Nobel';
        self.description = 'This page aims to demonstrate the use of the Nobel web API for prizes and the interconnection with other entities.<br>Called method(s): <ul><li>' + baseUri + '</li></ul>';
        self.error = ko.observable();
        self.prizes = ko.observableArray([]);
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

        //--- Externel functions (accessible outside)
        getPrizes = function () {
            console.log('CALL: PremioNobels...')
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.prizes(data);
                // cópia dos dados
                self.temporaryPrizes(data);
            });
        };

        // formatação nome prémio (retira ano) 
        parseName = function (text) {
            return text.slice(0, -5);
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
                    self.prizes(data);
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
                    self.prizes(data);
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
        self.temporaryPrizes = ko.observable();
        self.searchText = ko.observable();
        searchPrizes = function () {
            var thedata = new Array();
            if (self.searchText().length >= 3) {
                for(k = 0; k < getSize(self.temporaryPrizes()); k++){
                    var titulo = self.temporaryPrizes()[k].Titulo.toLowerCase();
                    console.log(titulo)
                    var procura = self.searchText().toLowerCase();
                    if (titulo.includes(procura)){
                        thedata.push(self.temporaryPrizes()[k])
                    }
                }
            } 
            if(self.searchText().length==0){
                self.prizes(self.temporaryPrizes())
            }
            self.prizes(thedata)
        }

        // função filtragem Chemistry
        self.filterChem = function(){
            baseUri = 'http://192.168.160.40/nobel/api/PremioNobels' + '?Category=Chemistry';
            n=0;
            self.nextPage();
        }

        // função filtragem Literatura
        self.filterLit = function(){
            baseUri = 'http://192.168.160.40/nobel/api/PremioNobels' + '?Category=Literature';
            n=0;
            self.nextPage();
        }

        // função filtragem Medicina
        self.filterMed = function(){
            baseUri = 'http://192.168.160.40/nobel/api/PremioNobels' + '?Category=Medicine';
            n=0;
            self.nextPage();
        }

        // função filtragem Paz
        self.filterPea = function(){
            baseUri = 'http://192.168.160.40/nobel/api/PremioNobels' + '?Category=Peace';
            n=0;
            self.nextPage();
        }

        // função filtragem Chemistry
        self.filterPhy = function(){
            baseUri = 'http://192.168.160.40/nobel/api/PremioNobels' + '?Category=Physics';
            n=0;
            self.nextPage();
        }

        //---- initial call
        getPrizes();
    };
    return vm;
});

define(['durandal/app'], function (app) {
    var ctor = function () {
        this.displayName = 'Bem-vindo ao Durandal ITW Starter Kit!';
        this.description = 'Esta plataforma servirá para o desenvolvimento de aplcações móveis na unidade curricular de Introdução às tecnologias Web(ITW) no ano letivo de 2018 / 19.';
        this.features = [
            'Clean MV* Architecture',
            'JS & HTML Modularity',
            'Simple App Lifecycle',
            'Eventing, Modals, Message Boxes, etc.',
            'Navigation & Screen State Management',
            'Consistent Async Programming w/ Promises',
            'App Bundling and Optimization',
            'Use any Backend Technology',
            'Built on top of jQuery, Knockout & RequireJS',
            'Integrates with other libraries such as SammyJS & Bootstrap',
            'Make jQuery & Bootstrap widgets templatable and bindable (or build your own widgets).'
        ];
    };
    function makeTimer() {

			var endTime = new Date("10 December 2019 0:0:00 GMT+01:00");
			endTime = (Date.parse(endTime) / 1000);

			var now = new Date();
			now = (Date.parse(now) / 1000);

			var timeLeft = endTime - now;

			var days = Math.floor(timeLeft / 86400);
			var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
			var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
			var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

			if (hours < "10") { hours = "0" + hours; }
			if (minutes < "10") { minutes = "0" + minutes; }
			if (seconds < "10") { seconds = "0" + seconds; }

			$("#days").html(days + "<span id='span_color' >Days</span>");
			$("#hours").html(hours + "<span id='span_color' >Hours</span>");
			$("#minutes").html(minutes + "<span id='span_color'>Minutes</span>");
			$("#seconds").html(seconds + "<span id='span_color'>Seconds</span>");

	}

	setInterval(function() { makeTimer(); }, 1000);

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //This pattern is also recognized by Durandal so that it can create instances on demand.
    //If you wish to create a singleton, you should export an object instead of a function.
    //See the "flickr" module for an example of object export.

    return ctor;
});
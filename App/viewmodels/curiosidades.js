define(function () {
    return {
        displayName: 'curiosidades'

    }
});

    $().ready(function() {

        setTimeout(function(){
        $(".brown").css(({"font-size": "200%", "color": "#993300"}));
        $(".brown_title").css(({"color": "#993300"}));
        $(".text").css(({"font-size": "105%"}));


        var mostrarChar = 108;
        var text = "...";
        var moretext = "more";
        var lesstext = "less";


            $('.more').each(function () {
            var content = $(this).html();

            if (content.length > mostrarChar) {

                var c = content.substr(0, mostrarChar);
                var h = content.substr(mostrarChar - 1, content.length - mostrarChar);

                var html = c + '<span class="moreellipses">' + text + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

                $(this).html(html);
            }

        });

        $(".morelink").click(function () {
            if ($(this).hasClass("less")) {
                $(this).removeClass("less");
                $(this).html(moretext);
            } else {
                $(this).addClass("less");
                $(this).html(lesstext);
            }
            $(this).parent().prev().toggle();
            $(this).prev().toggle();
            return false;
        });

    }, 1200);

});

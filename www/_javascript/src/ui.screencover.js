NB.Ui.screencover = {
		show:function(){
        $("#screen_cover").fadeTo('fast',0.8);
        $('embed').hide();
    },
		hide:function(){
        $("#screen_cover").fadeOut('slow');
        $('embed').show();
        //window.scroll(0,0);
    },
		dismiss:function(){
        $('#signupin').removeClass('alert');
        NB.Ui.screencover.hide();
    }
}

/*
NB.Tools.diff = {
  versions: function(){
   $('#tool_diffversions').toggleClass('on');
    var p = NB.Enface.get_target(NB.p.current);
     if($('#tool_diffversions').hasClass('on')){
        NB.Tools.diffversions.on(p);
     } else {
        NB.Tools.diffversions.off(p);
     }
  	 NB.Cookie.write('tool_diffversions_on',$('#tool_diffversions').hasClass('on'),NB.crumb.path);
  	 NB.Nav.track(1,'Tools',($('#tool_diffversions').hasClass('on')?'on':'off'),'tool_diffversions');
  }
}

/******************************************************************************

$('#container').delegate('#tool_diffversions','click',NB.Tools.diff);
$('#container').delegate('.tool_diffversions_extra','click',NB.Tools.diff);
*/
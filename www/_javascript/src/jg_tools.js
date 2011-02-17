NB.Tools = {
  	help: function() {
         var yield = $('yield');
         if($('tool_help').hasClassName('on')){
          yield.morph('margin-top:14em',{duration:0.4});
  				 Effect.SlideDown('help_main', { duration: 1 });
				 } else {
  				 Effect.SlideUp('help_main', { duration: 0.4 });
           yield.morph('margin-top:0',{duration:1});
         }
    },
    colorize: function() {
         if($('tool_colorize').hasClassName('on')){
            NB.W.Paragraphs.colorize(NB.W.Paragraphs.get_target_element_from_sequence(NB.p.current));
         } else {
            NB.W.Paragraphs.uncolorize(NB.W.Paragraphs.get_target_element_from_sequence(NB.p.current));
         }
    },
    diffversions: function() {
      return;
    },
		interlinear:function(){
// 		  NB.W.Paragraphs.remove_editors();
  		if ($('tool_interlinear').hasClassName('on')){
        NB.W.Interlinear.off.play();
      } else {
        NB.W.Interlinear.on.play();
      }
// 		  NB.W.Paragraphs.add_editors();
		},
		interlinear_quick:function(){
			$('content').toggleClassName('interlinear');
		}
};

NB.W.Interlinear = {};

NB.W.Interlinear.on = new Effect.Transform([
  { "#content .text": "width:120%;" },
  { "#content .target": "left:0%;padding-top:1.75em;" },
  { "#content .source .margin": "left:70%; padding-top:2.5em;" },
  { "#content .source p": "color:#990000;line-height:4;" },
  { "#content .target p": "line-height:4;" }
],{ duration: 0.8 });

NB.W.Interlinear.off = new Effect.Transform([
  { "#content .text": "width:93%" },
  { "#content .target": "left:53.5%;padding-top:0.0001em;" },
  { "#content .source p": "color:#000000;line-height:1.3;" },
  { "#content .source .margin": "left:46%;padding-top:0.0001em;" },
  { "#content .target p": "line-height:1.3;" }
],{ duration: 0.8 });

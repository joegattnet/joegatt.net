NB.W.Slider = Class.create({
		initialize: function (sequence) {
  	  this.element = $('paragraphs_slider');
  		this.handle = this.element.down('.handle');
//  		this.info = this.element.down('.info');
//  		this.info.update(sequence);
      this.object =  new Control.Slider(this.handle, this.element, {
          axis: 'horizontal',
    			range: $R(1, NB.p.count),
          sliderValue: sequence,
    			onSlide: function(value) {
    			  $('paragraphs_slider').addClassName('sliding');
            NB.W.navigator.update(Math.round(value));
          }, 
          onChange: function(value) {
    			  $('paragraphs_slider').removeClassName('sliding');
    			  var goto = Math.round(value);
    				NB.App.content(goto);
            _gaq.push(['_trackEvent','Navigator', 'Slider', 'Random-access', goto]);
          }
    		});
		}
});

//THESE TWO SHOULD BE CONSOLIDATED

NB.W.navigator = {
  update: function(p,limit){
    $$('.navigator .info').each(function(item){
      item.setValue(p);
    });
    $$('.navigator .first').each(function(item){
      if(p<=1){
        item.up('li').addClassName('off');
        p=1;
      } else {
        item.up('li').removeClassName('off');
      }
    });
    $$('.navigator .previous').each(function(item){
      if(p<=1){
        item.up('li').addClassName('off');
        item.href = NB.crumb.path + 1;
      } else {
        item.up('li').removeClassName('off');
        item.href = NB.crumb.path + (p-1);
      }
    });
    $$('.navigator .next').each(function(item){
      if(p>=limit){
        item.up('li').addClassName('off');
        item.href = NB.crumb.path + limit;
      } else {
        item.up('li').removeClassName('off');
        item.href = NB.crumb.path + (p+1);
      }
    });
    $$('.navigator .next_page').each(function(item){
      if(p>=limit){
        item.up('li').addClassName('off');
      } else {
        item.up('li').removeClassName('off');
      }
    });
    $$('.navigator .last').each(function(item){
      if(p>=limit){
        item.up('li').addClassName('off');
      } else {
        item.up('li').removeClassName('off');
      }
    });
  }
}
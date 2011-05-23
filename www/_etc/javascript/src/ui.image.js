NB.Ui.image = {
  open: function(event,smallWidth,smallHeight,largeWidth,largeHeight,smallCols,largeCols,smallMarginLeft,smallMarginBottom,largeMarginLeft,largeMarginBottom,paraElement,paraSmallState,paraLargeState){
    if(paraElement){
      $(paraElement).animate(paraLargeState,NB.S.speed.fastest);    
    }
    var j = $(event.target);
    NB.Ui.image.scroll(j,largeHeight);
    j.animate({
      width: largeWidth,
      height: largeHeight,
      marginLeft: largeMarginLeft,
      marginBottom: largeMarginBottom
    },NB.S.speed.fast,function(){
      j.addClass('open');
    });
    j.attr('src', j.attr('src').replace('-wb-'+smallCols,'-wb-'+largeCols));
    j.unbind('click');
    j.bind('click',function(event){NB.Ui.image.close(event,smallWidth,smallHeight,largeWidth,largeHeight,smallCols,largeCols,smallMarginLeft,smallMarginBottom,largeMarginLeft,largeMarginBottom,paraElement,paraSmallState,paraLargeState);return false;});
//    var scrollTo = Math.round(j.offset().top) + (301 + 10);
//    $('html,body').scrollTop(scrollTo);
    return false;
  },
  close: function(event,smallWidth,smallHeight,largeWidth,largeHeight,smallCols,largeCols,smallMarginLeft,smallMarginBottom,largeMarginLeft,largeMarginBottom,paraElement,paraSmallState,paraLargeState){
    if(paraElement){
      $(paraElement).animate(paraSmallState,NB.S.speed.fastest);    
    }
    var j = $(event.target);
    NB.Ui.image.scroll(j);
    j.animate({
      width: smallWidth,
      height: smallHeight,
      marginLeft: smallMarginLeft,
      marginBottom: smallMarginBottom
    },NB.S.speed.faster,function(){
      j.removeClass('open');
    });
    j.attr('src', j.attr('src').replace('-wb-'+largeCols,'-wb-'+smallCols));
    j.unbind('click');
    j.bind('click',function(event){NB.Ui.image.open(event,smallWidth,smallHeight,largeWidth,largeHeight,smallCols,largeCols,smallMarginLeft,smallMarginBottom,largeMarginLeft,largeMarginBottom,paraElement,paraSmallState,paraLargeState);return false;});
    return false;
  },
  scroll: function(j,largeHeight){
//    $(window).scroll(j.offset().top+largeHeight);
    return; 
  }
}

/******************************************************************************/

$('.prefix_1 .notes-list img[src*="-wb-3-0-"],.prefix_1 .notes-list img[src*="-fw-220-0-"]').live('click',function(event){
  NB.Ui.image.open(event,'220px','123px','540px','303px',3,7,0,'7px','-80px','7px');
  return false;
});

$('#notes_index .notes-list img[src*="-wb-3-0-"],#tags_page .notes-list img[src*="-wb-3-0-"],#notes_index .notes-list img[src*="-fw-220-0-"],#tags_page .notes-list img[src*="-fw-220-0-"]').live('click',function(event){
  NB.Ui.image.open(event,'220px','123px','538px','303px',3,7,0,'7px',0,'7px');
  return false;
});

$('.suffix_1 .notes-list img[src*="-wb-4-0-"]').live('click',function(event){
  NB.Ui.image.open(event,'300px','168px','460px','258px',4,6,0,'12px',0,'7px');
  return false;
});

$('#notes_page img[src*="-wb-6-0-"],#notes_page img[src*="-fw-460-0-"]').live('click',function(event){
  NB.Ui.image.open(event,'460px','258px','940px','528px',6,12,0,'12px','-480px','12px','#content .text',{marginTop:0},{marginTop:'540px'});
  return false;
});

$('#notes_page img[src*="-wb-7-0-"]').live('click',function(event){
  NB.Ui.image.open(event,'540px','303px','940px','528px',7,12,0,'7px','-400px','12px','#content .text',{marginTop:0},{marginTop:'540px'});
  return false;
});

/*
$('.prefix_1 .notes-list img[src*="-wb-3-1-"]').live('click',function(event){
  NB.Ui.image.open(event,'218px','121px','538px','301px',3,7,0,'7px','-80px','7px');
  return false;
});

$('#notes_index .notes-list img[src*="-wb-3-1-"],#tags_page .notes-list src*="-wb-3-1-"').live('click',function(event){
  NB.Ui.image.open(event,'218px','121px','538px','301px',3,7,0,'7px',0,'7px');
  return false;
});

$('.suffix_1 .notes-list img[src*="-wb-4-1-"]').live('click',function(event){
  NB.Ui.image.open(event,'298px','166px','458px','256px',4,6,0,'12px',0,'7px');
  return false;
});

$('#notes_page img[src*="-wb-6-1-"]').live('click',function(event){
  NB.Ui.image.open(event,'458px','256px','938px','526px',6,12,0,'12px','-480px','12px','#content .text',{marginTop:0},{marginTop:'540px'});
  return false;
});

$('#notes_page img[src*="-wb-7-1-"]').live('click',function(event){
  NB.Ui.image.open(event,'538px','301px','938px','526px',7,12,0,'7px','-400px','12px','#content .text',{marginTop:0},{marginTop:'540px'});
  return false;
});

*/
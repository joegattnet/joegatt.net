NB.Tools.interlinear = {
  toggle: function () {
    NB.Tools.toggle('interlinear') ? NB.Tools.interlinear.on() :  NB.Tools.interlinear.off();
  }, 
  on: function () {
    $('.target', '#content').css({position:'absolute', left:'0'});
    $('#nav_end_container').css({position:'relative'});
    $('#nav_end, #nav_end_page', '#yield').css({position:'absolute'});
    $('#scholia', '#yield').css({position:'absolute', top:'444px'});
    $('.target', '#content').css({position:'absolute', marginLeft:'390px'});
    $('.extra_out', '#content').css({textAlign:'left'});
    $('#content').animate({marginTop:'-10px', marginBottom:'1.8em'}, NB.S.speed.fast);
    $('p', '#content').animate({lineHeight:'40px'}, NB.S.speed.slow);
    $('.extra_out', '#content').animate({left:'0', top:'0'}, NB.S.speed.fast);
    $('.target', '#content').animate({width:'460px', marginLeft:'80px', paddingTop:'20px'}, NB.S.speed.slow);
    $('.source', '#content').animate({width:'460px', marginLeft:'80px'}, NB.S.speed.slow);
    $('.ends_epigraph', '#content').animate({paddingLeft:'80px'}, NB.S.speed.fast);
    $('.ends_section, .ends', '#content').animate({paddingLeft:'240px'}, NB.S.speed.fast);
    $('#toolbar_top', '#yield').animate({marginLeft:'-160px'}, NB.S.speed.slower);
    $('#scholia', '#yield').animate({left:'160px', top:'0'}, NB.S.speed.slow);
    $('#nav_end', '#yield').animate({height:'54px'}, NB.S.speed.fast);
    $('#nav_end_page', '#yield').animate({top:'-15px', left:'12px'}, NB.S.speed.fast);
    $('.source p', '#content').animate({
      color:NB.S.color.source
      }, NB.S.speed.slower, function () {
      $('#yield').addClass('interlinear');
    });
  }, 
  off: function () {
    $('.extra_out', '#content').css({textAlign:'right'});
    $('.extra_out', '#content').animate({left:'-35px', top:'0'}, NB.S.speed.fast);
    $('#content').animate({marginTop:'0', marginBottom:'0'}, NB.S.speed.fast);
    $('p', '#content').animate({lineHeight:'20px'}, NB.S.speed.slow);
    $('.target', '#content').animate({width:'380px', marginLeft:'390px', paddingTop:'0'}, NB.S.speed.slow, function () {
      $('.target', '#content').css({position:'static', marginLeft:'10px'});
    });
    $('.source, .ends_section, .ends_paragraph, .ends', '#content').animate({width:'380px', marginLeft:'0'}, NB.S.speed.fast);
    $('.ends_epigraph', '#content').animate({paddingLeft:'160px'}, NB.S.speed.fast);
    $('.ends_section, .ends', '#content').animate({paddingLeft:'320px'}, NB.S.speed.fast);
    $('#toolbar_top', '#yield').animate({marginLeft:'0'}, NB.S.speed.faster);
    $('#scholia', '#yield').animate({left:'0', top:'444px'}, NB.S.speed.slow, function () {
      $('#scholia', '#yield').css({position:'relative', top:'0'});
    });
    $('#nav_end_page', '#yield').animate({left:'0', top:'0'}, NB.S.speed.slow);
    $('#nav_end, #nav_end_page', '#yield').css({position:'relative'});
    $('.source p', '#content').animate({
      color:NB.S.color.text
      }, NB.S.speed.slower, function () {
      $('#yield').removeClass('interlinear');
    });
  }
}

/******************************************************************************/

$('#container').delegate('#tool_interlinear', 'click', NB.Tools.interlinear.toggle);
$('#container').delegate('.tool_interlinear_extra', 'click', NB.Tools.interlinear.toggle);

NB.loaded_scripts.add(false, function () {
	 if (NB.Cookie.read('tool_interlinear_on')  === 'true') {
     NB.Tools.interlinear.on()
  	 $('#tool_interlinear').addClass('on');
	 }
});


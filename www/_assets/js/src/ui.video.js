NB.Ui.video = function () {

  //Put these in sprite
  $.YTPlayer.controls.play= "<img src='/_assets/images/static/ytplayer/play.png'> ";
  $.YTPlayer.controls.pause= "<img src='/_assets/images/static/ytplayer/pause.png'> ";
  $.YTPlayer.controls.mute= "<img src='/_assets/images/static/ytplayer/mute.png'> ";
  $.YTPlayer.controls.unmute= "<img src='/_assets/images/static/ytplayer/unmute.png'> ";

  $('.video-yt').each(function () {
    $(this).mb_YTPlayer();
  });
}

/******************************************************************************/

$('body').bind('minor.loaded', NB.Ui.video);

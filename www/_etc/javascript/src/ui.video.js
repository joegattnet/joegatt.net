NB.Ui.video = function () {

  //Put these in sprite
  $.YTPlayer.controls.play= "<img src='/_etc/images/ytplayer/play.png'> ";
  $.YTPlayer.controls.pause= "<img src='/_etc/images/ytplayer/pause.png'> ";
  $.YTPlayer.controls.mute= "<img src='/_etc/images/ytplayer/mute.png'> ";
  $.YTPlayer.controls.unmute= "<img src='/_etc/images/ytplayer/unmute.png'> ";

  $('.video-yt').each(function () {
    $(this).mb_YTPlayer();
  });
}

/******************************************************************************/

$('body').bind('minor.loaded', NB.Ui.video);

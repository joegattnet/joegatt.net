NB.User.me = function () {
  $('input[name*=user_id]').val(NB.User.id);
  $('.user-name').each(function () {
    var name = $(this).data('username');
    if (name === NB.User.name) {
      $(this).text('me');
    } else {
      $(this).text(name);
    }
  });
  //$('[rel=*u=*]').not('[rel=*u=' + NB.User.id + ']').each(function .... .fetch)
}

/******************************************************************************/

$('body').bind('signedin.user signedout.user minor.loaded', NB.User.me);

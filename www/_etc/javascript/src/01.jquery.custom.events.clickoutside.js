(function($){
  var elems = $([]);
  $.event.special.clickoutside = {
    setup: function(){
      elems = elems.add( this );
      if ( elems.length === 1 ) {
        $(document).bind( 'click', handle_event );
      }
    },
    teardown: function(){
      elems = elems.not( this );
      if ( elems.length === 0 ) {
        $(document).unbind( 'click', handle_event );
      }
    },
    add: function( handleObj ) {
      var old_handler = handleObj.handler;
      handleObj.handler = function( event, elem ) {
        event.target = elem;
        old_handler.apply( this, arguments );
      };
    }
  };
  function handle_event( event ) {
    $(elems).each(function(){
      var elem = $(this);
      if ( this !== event.target && !elem.has(event.target).length ) {
        elem.triggerHandler( 'clickoutside', [ event.target ] );
      }
    });
  };
})(jQuery);

/*******************************************************************************

See http://benalman.com/news/2010/03/jquery-special-events/#add-and-remove-clickoutside
NB changed bind/unbind to live/die.

*/
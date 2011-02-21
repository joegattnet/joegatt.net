NB.Ui.error = function(error, url, line) {
  //NB.Nav.track(2,'Javascript error', error, url, line);
  return (!location.host=='joegatt.net');
}

/******************************************************************************/

window.onerror = NB.Ui.error;

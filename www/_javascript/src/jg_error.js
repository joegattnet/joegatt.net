NB.Error = {
  gaq_report:function(error, url, line) {
    _gaq.push(['_trackEvent','Javascript error', error, url, line]);
    //return false to hide errors
    return (!location.host=='joegatt.net');
  }
}

window.onerror = NB.Error.gaq_report;
jQuery.extend(
  jQuery.expr[ ":" ],
  {
    external: function(obj, index, meta, stack) {
      return /:\/\//.test($(obj).attr("href"));
    },
    internal: function(obj, index, meta, stack) {
      return !(/\:\/\/|code\/www|\.jpg$|\.png$|\.gif$|\.zip$|\.pdf$|javascript\:|^\#$/.test($(obj).attr("href")) || $(obj).attr("target"));
    },
    document: function(obj, index, meta, stack) {
      return /\.pdf$/.test($(obj).attr("href"));
    },
    download: function(obj, index, meta, stack) {
      return /\.zip$|\.pdf$/.test($(obj).attr("href"));
    },
    unfilled: function(obj, index, meta, stack) {
      return $(obj).val()=='';
    },
    sometext: function(obj, index, meta, stack) {
      return $(obj).text().length>0;
    },
    notext: function(obj, index, meta, stack) {
      return $(obj).text().length==0;
    }
  }
);

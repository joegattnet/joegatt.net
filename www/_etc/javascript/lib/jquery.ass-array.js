jQuery.assArray = {
  join: function(array,joiner) {
    var joiner = joiner || '';
    var temp = '';
    for(var i in array) {
        temp += i+ '='+ array[i] + joiner;
    }
    return temp.substring(0,temp.length);
  },
  sort: function(array) {
    var keys = [];
    for (key in array) {
        keys.push(key);
    }
    keys.sort();
    var temp = {};
    for(i=0;i<keys.length;i++) {
      temp[keys[i]] = array[keys[i]];
    }
    return temp;
  },
  with: function(array,find) {
    var temp = {};
    for(var i in array) {
      if (i.match(find)) {
        temp[i] = array[i];
      };
    }
    return temp;
  },
  without: function(array,find) {
    var temp = {};
    for(var i in array) {
      if (i.match(find)==null) {
        temp[i] = array[i];
      };
    }
    return temp;
  }
}

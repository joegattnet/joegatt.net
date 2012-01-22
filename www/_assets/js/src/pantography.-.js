NB.Pantography = function (p) {
  this.alphabetString = NB.S.pantography.alphabetString;
  this.alphabet = this.alphabetString.split('');
  this.alphabetNoSpaceString = this.alphabetString.replace(' ', '');
  this.alphabetNoSpace = this.alphabetNoSpaceString.split('');
  this.phraseLength = NB.S.pantography.phraseLength;
  this.frequency = NB.S.pantography.frequency;
  this.siderealYearInDays = NB.S.pantography.siderealYearInDays;
  this.dateFirstTx = NB.S.pantography.dateFirstTx;
  this.username = NB.S.pantography.username;
  this.firstLetter = this.alphabet[0];
  this.lastLetter = this.alphabet[this.alphabet.length - 1];
  this.firstPhrase = this.firstLetter;
  this.lastPhrase = this.getLastPhrase();
  this.totalToTweet = this.getTotalToTweet();
  this.timeToTweetYears = this.getTimeToTweetYears();
  this.percentage = 0;
  this.textInfoBuffer = false;
  // avoidHash Hack
  NB.p.current = this.desanitize(NB.p.current);
  this.initialize(p);
};

NB.Pantography.prototype.getLastPhrase = function () {
  var i, p = '';
  for (i = 0; i < this.phraseLength; i++) {
    p = p + this.lastLetter;
  }
  return p;
};

NB.Pantography.prototype.keyup = function (event) {
  var p = $(event.target).text().toLowerCase();
  //If letter is not in this.alphabet, return false
  if (p.length > 140 || 
      (this.alphabetString.indexOf(String.fromCharCode(event.which)) === -1 && 
      event.which !== NB.keycodes.BAK && event.which !== NB.keycodes.DEL &&
      event.which < 37 && event.which > 40)) {
    return false;
  } else {
    this.setP(p);
    return true;
  }
};

NB.Pantography.prototype.previous = function () {
  var p = this.previousPhrase(NB.p.current);
  this.setP(p);
  return false;    
};

NB.Pantography.prototype.next = function () {
  var p = this.nextPhrase(NB.p.current);
  this.setP(p);
  return false;    
};

NB.Pantography.prototype.first = function () {
  var p = this.firstPhrase;
  this.setP(p);
  return false;    
};

NB.Pantography.prototype.last = function () {
  var p = this.lastPhrase;
  this.setP(p);
  return false;    
};

NB.Pantography.prototype.getPrevious = function (p) {
  return encodeURIComponent(this.previousPhrase(p));
};

NB.Pantography.prototype.getNext = function (p) {
  return encodeURIComponent(this.nextPhrase(p));
};

NB.Pantography.prototype.goto = function (value) {
// slider should be a new object: this.slider = new Nav.Slider
//then pick up den here:
  this.percentage = value;
  this.setP(this.percentageToPhrase(value), value);
};

NB.Pantography.prototype.slide = function (value) {
  this.percentage = value;
  this.showPhrase(this.percentageToPhrase(value), true);
};

NB.Pantography.prototype.focus = function () {
  $('.app').focus();
};

NB.Pantography.prototype.getTotalToTweet = function () {
  return Math.pow(this.alphabet.length, this.phraseLength) - 1;
};

NB.Pantography.prototype.getTimeToTweetYears = function () {
  return (this.totalToTweet / (((60 * 60) / this.frequency)  * 24 * this.siderealYearInDays));
};

NB.Pantography.prototype.numToPhrase = function (sNumber) {
  var pw3 = this.alphabet.length,
    tag = 0,
    drust = '',
    num1 = sNumber - Math.pow(pw3, tag);
  while (num1 >= 0) {
    tag = tag + 1;
    num1 = sNumber - Math.pow(pw3, tag);
  }
  var tow4 = tag - 1;
  var sumleft = sNumber;
  for (i = 1; i < tag; i++) {
    var dig1 = Math.floor(sumleft / Math.pow(pw3, tow4));
    drust = drust + this.alphabet[dig1];
    sumleft = sumleft - (dig1 * Math.pow(pw3, tow4));
    tow4 = tow4 - 1;
  }
  drust = drust + sumleft;
  drust = drust.substring(0, this.phraseLength);
  return drust;
};

// Separate class!!!
NB.Pantography.prototype.phraseToNum = function (phrase) {
  var radix = this.alphabet.length,
    position = 0,
    decimal = 0,
    useRadix = radix;
  for(i = phrase.length -1; i >= 0; i--) {
    // This is to eliminate all instances of duplicate spaces
    // Duplicate spaces appear every 1 + base^1 + base^2 + base^3
    // Reducing the radix by 1 (seems) equivalent
    useRadix = radix - 1;
    decimal += (this.alphabetString.indexOf(phrase.charAt(i)) + 1 )  
      * Math.pow(useRadix, position);
    position++;
  }
  return decimal;
};

NB.Pantography.prototype.percentageToPhrase = function (percentage) {
  var phrase;
   if(percentage === 100) {
    phrase = this.lastPhrase;
   } else {
    phrase = (percentage * this.phraseToNum(this.lastPhrase)) / 100;
   }
   return this.numToPhrase(phrase);
};

NB.Pantography.prototype.phraseToPercentage = function (phrase) {
   //var percentage = (this.phraseToNum(phrase) * 100) / this.totalToTweet;
   var percentage = (this.phraseToNum(phrase) * 100) / this.phraseToNum(this.lastPhrase);
    //console.log('PERCENTAGE: ', percentage);
    return percentage;
};

NB.Pantography.prototype.showPhrase = function (phrase, noInfo) {
  var schedule;
  if ($('#phrase').text().toLowerCase() !== phrase.toLowerCase()) {
    $('#phrase').text(phrase);
  }
  if (this.phraseGreater(phrase, NB.p.furthest)) {
   $('#phrase').addClass('scheduled');
  } else {
   $('#phrase').removeClass('scheduled');
  }
  schedule = 'Scheduled for ' + this.scheduledDate(phrase);
  $('#info').html(schedule);   
  $('#info-percentage').text(this.percentage.toFixed(2) + '%');   
  $('#info-percentage').attr('title', this.percentage + '%');   
  $('#info-length').text(phrase.length + '/140 ch');
  if(!noInfo) {
    this.textInfoBuffer = {
        phrase: phrase, 
        schedule: schedule
      };
  }  
};

NB.Pantography.prototype.textInfo = function (phrase, forSchedule) {
  var info, username = this.username;
  $.getJSON(NB.root + '_etc/exe/pantography/textinfo.pl?q=' + this.sanitize(phrase) + 
    '&jsoncallback=?', function(data) {
    if (data.exists) {
  		info = $('#info').html();
      if (info === forSchedule) {
        info = info + ' (tweeted ';
        if (data.username !== username) {
          info = info + 'by <a href="http://twitter.com/' + data.username + 
            '" title="@' + data.username + '">' + data.realname  + '</a>, ';
        }
        info = info + '<a href="http://twitter.com/' + data.username + 
          '/status/' + data.statusId + '"><time datetime="' + data.time + 
          '" class="timeago" title="' + data.timeFormatted + '">' + 
          data.timeFormatted + '</time></a>)';
        $('#info').html(info);
        $('#phrase').removeClass('scheduled');
        $('body').trigger('minor.loaded');
      }
  	}
  });
};

NB.Pantography.prototype.nextPhrase = function (phrase) {
  var firstLetter = this.alphabet[0]; // should this & alphabet, etc be called unit or digit?
  var lastLetter = this.alphabet[this.alphabet.length - 1];
  var letters = phrase.split('');
  var solved = false;
  var position = letters.length - 1;
    while(!solved) {
       if(letters[position] == lastLetter) {
         letters[position] = firstLetter;
         if(position > 0) {
           position--;
         } else {
           letters.unshift(firstLetter);
           solved = true;
         }
       } else {
         //Condition to avoid leading, trailing and multiple spaces
         if (position === 0 || position === letters.length - 1 || 
          letters[position -1] === ' ') {
          letters[position] = this.alphabetNoSpace[this.alphabetNoSpaceString.indexOf(letters[position]) + 1];
         } else {
          letters[position] = 
          this.alphabet[this.alphabetString.indexOf(letters[position]) + 1];
         }
         solved = true;
       }
    }
    return letters.join('');            
};

NB.Pantography.prototype.previousPhrase = function (phrase) {
  var firstLetter = this.firstLetter;
  var lastLetter = this.lastLetter;
  var letters = phrase.split('');
  var solved = false;
  var position = letters.length - 1;
    while(!solved) {
       if(letters[position] == firstLetter) {
         letters[position] = lastLetter;
         if(position > 0) {
           position--;
         } else {
           letters.shift();
           solved = true;
         }
       } else {
         letters[position] = 
          this.alphabet[this.alphabetString.indexOf(letters[position]) - 1];
         solved = true;
       }
    }
    return letters.join('');            
};

NB.Pantography.prototype.phraseGreater = function (phraseA, phraseB) {
  return ((phraseA.length > phraseB.length) || 
    (this.phraseToNum(phraseA) > this.phraseToNum(phraseB)));
};

NB.Pantography.prototype.scheduledDate = function (phrase) {
  var sequence = this.phraseToNum(phrase);
  var expectedDate = new Date(this.dateFirstTx);
  expectedDate.setTime(expectedDate.getTime() + this.frequency * 1000 * sequence);
  expectedDate = expectedDate.toUTCString();
  if (expectedDate === 'Invalid Date' || expectedDate === 'Infinity') {
    return 'the year ' + (2011 + Math.round(sequence * 
      (this.timeToTweetYears / this.totalToTweet))).toString().replace('e+', '<sup>') + 
      '</sup> CE';
  } else {
    return expectedDate.replace('GMT', 'UTC');
  } 
};

NB.Pantography.prototype.setP = function (p, percentage) {
  this.percentage = percentage || this.phraseToPercentage(p);
  NB.p.current = p;
  NB.Nav.arrows(p);
  NB.Nav.crumb.load('/pantography/pantographs/' + encodeURIComponent(this.sanitize(p)));
  this.showPhrase(p);
  $('.ui-slider').slider('value', this.percentage * 10); //get this directly from slider variable den
  return false;
};

NB.Pantography.prototype.initialize = function (p) {
  this.textInfoInterval = setInterval(function() {
    if(NB.crumb.page_app === 'pantography') {
      if(NB.App.textInfoBuffer != false) {
        NB.App.textInfo(NB.App.textInfoBuffer.phrase, NB.App.textInfoBuffer.schedule);
        NB.App.textInfoBuffer = false;
      }
    } else {
      clearInterval(NB.App.textInfoInterval);
    }
  }, 1000);
//  this.followButton();
  this.setP(p);
};

NB.Pantography.prototype.sanitize = function (q) {
  return q.replace(/#/g, '|');
};

NB.Pantography.prototype.desanitize = function (q) {
  return q.replace(/\|/g, '#');
};

//Rewrite - put in UI; go through all of them and get name from data
//NB.Pantography.prototype.followButton = function () {
  NB.loaded_scripts.add(true, function () {
      $('#twitter-follow-pantography').html('');
      twttr.anywhere(function (T) {
        T('#twitter-follow-pantography').followButton('pantography');
      });
    $('body').bind('content.loaded', function () {
      $('#twitter-follow-pantography').html('');
      twttr.anywhere(function (T) {
        T('#twitter-follow-pantography').followButton('pantography');
      });
     });
  });
//};

/******************************************************************************/

$('#container').delegate('.app', 'keyup.app', function (event) {
  return NB.App.keyup(event);
});

$('#container').delegate('.set_p', 'click', function (event) {
  NB.App.setP($(event.target).text());
  return false;
});

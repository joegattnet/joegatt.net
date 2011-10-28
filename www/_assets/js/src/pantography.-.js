NB.Pantography = function (p) {
  this.alphabetString = NB.SETTINGS.pantography.alphabetString;
  this.alphabet = this.alphabetString.split('');
  this.alphabetNoSpaceString = 
    NB.SETTINGS.pantography.alphabetString.replace(' ', '');
  this.alphabetNoSpace = this.alphabetNoSpaceString.split('');
  this.messageLength = NB.SETTINGS.pantography.messageLength;
  this.frequency = NB.SETTINGS.pantography.frequency;
  this.siderealYearInDays = NB.SETTINGS.pantography.siderealYearInDays;
  this.dateFirstTx = NB.SETTINGS.pantography.dateFirstTx;
  this.username = NB.SETTINGS.pantography.username;
  this.firstLetter = this.alphabet[0];
  this.lastLetter = this.alphabet[this.alphabet.length - 1];
  this.firstMessage = this.firstLetter;
  this.lastMessage = this.getLastMessage();
  this.totalToTweet = this.getTotalToTweet();
  this.timeToTweetYears = this.getTimeToTweetYears();
  this.percentage = 0;
  this.textInfoBuffer = false;
  // avoidHash Hack
  NB.p.current = this.desanitize(NB.p.current);
  this.initialize(p);
};

NB.Pantography.prototype.getLastMessage = function () {
  var i, p = '';
  for (i = 0; i < this.messageLength; i++) {
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
  var p = this.firstMessage;
  this.setP(p);
  return false;    
};

NB.Pantography.prototype.last = function () {
  var p = this.lastMessage;
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
  this.setP(this.percentageToWord(value), value);
};

NB.Pantography.prototype.slide = function (value) {
  this.percentage = value;
  this.showMessage(this.percentageToWord(value), true);
};

NB.Pantography.prototype.getTotalToTweet = function () {
  return Math.pow(this.alphabet.length, this.messageLength) - 1;
};

NB.Pantography.prototype.getTimeToTweetYears = function () {
  return (this.totalToTweet / (((60 * 60) / this.frequency)  * 24 * this.siderealYearInDays));
};

NB.Pantography.prototype.numToWord = function (sNumber) {
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
  drust = drust.substring(0, this.messageLength);
  return drust;
};

// Separate class!!!
NB.Pantography.prototype.wordToNum = function (phrase) {
  var radix = this.alphabet.length,
    position = 0,
    decimal = 0;
  for(i=phrase.length -1; i >= 0;i--) {
    decimal += this.alphabet.indexOf(phrase.charAt(i)) 
      * Math.pow(radix, position);  
    position++;
  }
  return decimal;
};


NB.Pantography.prototype.percentageToWord = function (percentage) {
  var word;
   if(percentage === 100) {
    word = this.lastMessage;
   } else {
    word = (percentage * this.wordToNum(this.lastMessage)) / 100;
   }
   return this.numToWord(word);
};

NB.Pantography.prototype.wordToPercentage = function (phrase) {
   //var percentage = (this.wordToNum(phrase) * 100) / this.totalToTweet;
   var percentage = (this.wordToNum(phrase) * 100) / this.wordToNum(this.lastMessage);
    console.log('PERCENTAGE: ', percentage);
    return percentage;
};

NB.Pantography.prototype.showMessage = function (message, noInfo) {
  var schedule;
  if ($('#message').text().toLowerCase() !== message.toLowerCase()) {
    $('#message').text(message);
  }
  if (this.phraseGreater(message, NB.p.furthest)) {
   $('#message').addClass('scheduled');
  } else {
   $('#message').removeClass('scheduled');
  }
  schedule = 'Scheduled for ' + this.scheduledDate(message);
  $('#info').html(schedule);   
  $('#info-percentage').text(this.percentage.toFixed(2) + '%');   
  $('#info-percentage').attr('title', this.percentage + '%');   
  $('#info-length').text(message.length + '/140 ch');
  if(!noInfo) {
    this.textInfoBuffer = {
        message: message, 
        schedule: schedule
      };
  }  
};

NB.Pantography.prototype.textInfo = function (message, forSchedule) {
  var info, username = this.username;
  $.getJSON(NB.root + '_etc/exe/pantography/textinfo.pl?q=' + this.sanitize(message) + 
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
        $('#message').removeClass('scheduled');
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
    (this.wordToNum(phraseA) > this.wordToNum(phraseB)));
};

NB.Pantography.prototype.scheduledDate = function (message) {
  var sequence = this.wordToNum(message);
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
  this.percentage = percentage || this.wordToPercentage(p);
  NB.p.current = p;
  NB.Nav.arrows(p);
  NB.Nav.crumb.load('/pantography/pantographs/' + encodeURIComponent(this.sanitize(p)));
  this.showMessage(p);
  $('.ui-slider').slider('value', this.percentage * 10); //get this directly from slider variable den
  return false;
};

NB.Pantography.prototype.initialize = function (p) {
  this.textInfoInterval = setInterval(function() {
    if(NB.crumb.page_app === 'pantography') {
      if(NB.App.textInfoBuffer != false) {
        NB.App.textInfo(NB.App.textInfoBuffer.message, NB.App.textInfoBuffer.schedule);
        NB.App.textInfoBuffer = false;
      }
    } else {
      clearInterval(NB.App.textInfoInterval);
    }
  }, 1000);
  this.setP(p);
};

NB.Pantography.prototype.sanitize = function (q) {
  return q.replace(/#/g, '|');
};

NB.Pantography.prototype.desanitize = function (q) {
  return q.replace(/\|/g, '#');
};

/******************************************************************************/

$('#container').delegate('.app', 'keyup.app', function (event) {
  return NB.App.keyup(event);
});

$('#container').delegate('.set_p', 'click', function (event) {
  NB.App.setP($(event.target).text());
  return false;
});

NB.loaded_scripts.add(true, function () {
  twttr.anywhere(function (T) {
    T('#twitter-follow-pantography').followButton('pantography');
  });
});

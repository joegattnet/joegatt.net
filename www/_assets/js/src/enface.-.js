NB.Enface = function (p) {
  this.invoked = true;
  this.lengthTolerance = 7; 
  this.lengthThreshold = 50; 
  this.changesTolerancePercentage = 10; 
  this.changesTolerancemin = 5; 
  this.changesToleranceMax = 100; 
  this.selectFlag = false; 
  this.invoked = false;
// Maybe should set some default methods
// using inheritance
// this.goto = function () {return true;};
  this.slide = function () {return true;};
  this.initialize(p);
};

//NB.Enface.prototype = new NB.DefaultApp();

NB.Enface.prototype.blur = function(event){
  var e = event.target;
  var j = $(e);
  j.removeClass('focused');
  var p = j.data('p');
  NB.Tools.colorize.undo(e);
  if (j.data('dirty')){
    var error_status = j.data('error_status');
    var score = this.anagram.snap - this.anagram.total;
    this.anagram.score = score;
    var current_text_raw = j.text();
    var current_text = NB.Url.encode(current_text_raw);
    if ((error_status==0&&score>0)||NB.User.level>1) {
     var new_version_number = NB.versions['p'+j.data('id')].version + 1;
     //var new_version_number_display = this.anagram.total_version(this.anagram.total);
     j.data('p_text',current_text_raw);
     var pending = "NB.Ajax.html('post','#hidden','/_etc/exe/enface/save.pl','score="+score+"&score_total="+this.anagram.total+"&username='+NB.User.name+'&user_level='+NB.User.level+'&u='+NB.User.id+'&b="+NB.book.id+"&p="+p+"&p_id="+e.id+"&version="+(new_version_number)+"&text="+current_text+"',false);NB.Nav.track(2,'Enface', 'Saved', '+"+score+"', " + p + ");";
     if (NB.User.id==0){
		 	 NB.User.pending.add(pending,10);
       NB.User.popup('save your changes');
     } else {
      eval(pending);
     	 $('#alert').text('Saving paragraph '+p+'...');
       if (!j.hasClass('version')){
     	  j.animate({color:NB.S.color.ok},500);
     	 }
     }
    } else {
     var alert = j.data('alert');
     $('#alert').html('<span class="neg">Paragraph ' + p + ' not saved. </span><br/>'+alert);
     NB.Nav.track(2,'Enface', 'Not saved', alert.replace(/(<([^>]+)>)/g,''), p);
     if (!j.hasClass('version')){
        j.animate({color:NB.S.color.error},NB.S.speed.slower,function(){
          //Should be called more elegantly; assign variable at top
          NB.App.reset(e,false);
          j.animate({color:NB.S.color.text},NB.S.speed.fast);
       });
      } else {
        this.reset(e,false);
      }
    }
  } else {
     $('#alert').text('');
  }
  return e;
};

NB.Enface.prototype.check_text = function(e){
  var j = $(e);
  var elementContent = j.html();
  var elementContentStripped = NB.String.strip(elementContent.replace(/<del>.*?<\/del>/g,''));
  var targetLength = elementContentStripped.replace(/[^0-9a-zA-Z]/g,'').length;
  var difference = j.data('sourcelength') - targetLength;
  var alertMessage = '';
  var error_status = 0;
  if (/([a-zA-Z])\1\1+/.test(elementContent)){
    alertMessage = '<span class="neg">Contains gibberish.</span>';
    error_status = 2;
    j.html(elementContent.replace(/([a-zA-Z])\1\1+/g,'<span class="gibberish">$&</span>'));
  } else if (difference > this.lengthTolerance) {
    alertMessage = '<span class="neg">Too short (-'+difference+' letters).</span>';
    error_status = 3;
  } else if (targetLength>this.lengthThreshold&&(difference < this.lengthTolerance*-1)) {
    alertMessage = '<span class="neg">Too long (+'+(difference*-1)+' letters).</span>';
    error_status = 4;
  } else {
    var beforeText = NB.String.truncate(j.data('p_text'),500,'');
    var afterText = NB.String.truncate(elementContent,500,'');
    var changes = NB.String.levenshtein(beforeText,afterText);
    var changesTolerance = parseInt(targetLength*(this.changesTolerancePercentage/100));
    changesTolerance = NB.Number.range(changesTolerance,this.changesTolerancemin,this.changesToleranceMax);
    if (changes > changesTolerance) {
        alertMessage = '<span class="neg">Too many changes ('+changes+'/'+changesTolerance+').</span>';
        error_status = 1;
    }
  }
  j.data('error_status',error_status);
  j.data('alert',alertMessage);
  return alertMessage;      
};

NB.Enface.prototype.focus = function (event) {
  var e = event.target,
    j = $(e);
  if (!j.hasClass('focused')) {
    var p = parseInt(j.data('p'));
    var new_path = location.pathname;
    if (p) {
      NB.Nav.track(0, 'P:', p);
      NB.p.current = p;
      var new_path = NB.root + NB.crumb.section + '/' + p;
//      if (NB.p.current!=NB.p.top) {
        NB.Nav.refresh();
//      }
      NB.Versions.display(j.data('id'));
      NB.Nav.slider(NB.p.current);
      NB.Nav.arrows(NB.p.current);
      var paragraph_text = j.text();
		  j.data('p_text', paragraph_text);
		  NB.Nav.crumb.last(p, new_path);
    }
    this.anagram.snap = this.anagram.total;
    NB.Tools.colorize.colorize(this.getTarget(NB.p.current));
    j.addClass('focused');
    j.focus();
  }
  return e;
};

NB.Enface.prototype.getTarget = function (p) {
  return $('.app', '#p_' + p);
};

NB.Enface.prototype.goto = function (p) {
  // Maybe should set some default methods
  // using inheritance
  // this.goto = function () {return true;};
  NB.Nav.fetch(NB.crumb.path + p);
};

NB.Enface.prototype.initialize = function (p) {
  var j, anagram; 
    this.anagram = new NB.Anagram();
    anagram = this.anagram;
  anagram.get();
  anagram.snap = anagram.total_calc();
  $('.app').each(function (i, e) {
     NB.Editors.add(e);
     j = $(e);
		 j.data('alert', '');
		 j.data('dirty', false);
		 j.data('error_status', 0);
		 anagram.origArray[p + i] = j.text().toLowerCase().split('');
		});
  this.getTarget(p).focus();
  anagram.total_update();
  NB.Nav.track(1, 'NB.Enface invoked.');
};

NB.Enface.prototype.keyup = function (event) {
  if (event.which === NB.keycodes.ESC) {
    this.reset(event.target);
    return false;
  } else {
    this.anagram.letter(event.target, event.which);
  }
};

NB.Enface.prototype.reset = function (e, focus) {
  var focus = focus || true;
  NB.Tools.colorize.undo(e);
  NB.Versions.unversion(e);
  NB.Editors.add(e);
  $('.app').data('dirty', false);
  if (this.anagram.score!=0) {
    $('#total').animate({color:NB.S.color.neutral}, NB.S.speed.fast);
    this.anagram.total_update();
    $('#change').text('');
    this.anagram.score = 0;
    this.anagram.dirty = false;
  }
  if (focus) {
    $(e).focus();
  }
  return e;
};

NB.Enface.prototype.source = function (e) {
  return $('.source p', $(e).closest('.pair'));
};

NB.Enface.prototype.getTarget = function (p) {
  return $('.app', '#p_' + p);
};

NB.Enface.prototype.word_score = function (word) {
  var anagram = this.anagram;
  var letterValues = $.map(word.toLowerCase().split(''), function (letter) {
    return anagram.anagram[$.inArray(letter, NB.alphanumArray)];
  });
  var acc = 0;
  var score = $.map(letterValues, function (letter) {
    return acc + letter * -1 / Math.abs(letter * -1);
  });
  return $.richArray.sum(score);
};

//Hacked - the default action should just be passed
//Or Should be in app default
NB.Enface.prototype.previous = function () {
  NB.Nav.fetch($('.previous').attr('href'));    
};

NB.Enface.prototype.next = function () {
  NB.Nav.fetch($('.next').attr('href'));    
};

NB.Enface.prototype.first = function () {
  NB.Nav.fetch($('.first').attr('href'));    
};

NB.Enface.prototype.last = function () {
  NB.Nav.fetch($('.last').attr('href'));    
};

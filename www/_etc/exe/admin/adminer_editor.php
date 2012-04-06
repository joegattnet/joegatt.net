<?php
/** Adminer Editor - Compact database editor
* @link http://www.adminer.org/
* @author Jakub Vrana, http://www.vrana.cz/
* @copyright 2009 Jakub Vrana
* @license http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0
* @license http://www.gnu.org/licenses/gpl-2.0.html GNU General Public License, version 2 (one or other)
* @version 3.3.1
*/error_reporting(6135);$hb=(!ereg('^(unsafe_raw)?$',ini_get("filter.default")));if($hb||ini_get("filter.default_flags")){foreach(array('_GET','_POST','_COOKIE','_SERVER')as$a){$tc=filter_input_array(constant("INPUT$a"),FILTER_UNSAFE_RAW);if($tc){$$a=$tc;}}}if(isset($_GET["file"])){header("Expires: ".gmdate("D, d M Y H:i:s",time()+365*24*60*60)." GMT");if($_GET["file"]=="favicon.ico"){header("Content-Type: image/x-icon");echo
base64_decode("AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AAAA/wBhTgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAERERAAAAAAETMzEQAAAAATERExAAAAABMRETEAAAAAExERMQAAAAATERExAAAAABMRETEAAAAAEzMzMREREQATERExEhEhABEzMxEhEREAAREREhERIRAAAAARIRESEAAAAAESEiEQAAAAABEREQAAAAAAAAAAD//9UAwP/VAIB/AACAf/AAgH+kAIB/gACAfwAAgH8AAIABAACAAf8AgAH/AMAA/wD+AP8A/wAIAf+B1QD//9UA");}elseif($_GET["file"]=="default.css"){header("Content-Type: text/css; charset=utf-8");echo'body{color:#000;background:#fff;font:90%/1.25 Verdana,Arial,Helvetica,sans-serif;margin:0;}a{color:blue;}a:visited{color:navy;}a:hover{color:red;}h1{font-size:150%;margin:0;padding:.8em 1em;border-bottom:1px solid #999;font-weight:normal;color:#777;background:#eee;}h2{font-size:150%;margin:0 0 20px -18px;padding:.8em 1em;border-bottom:1px solid #000;color:#000;font-weight:normal;background:#ddf;}h3{font-weight:normal;font-size:130%;margin:1em 0 0;}form{margin:0;}table{margin:1em 20px 0 0;border:0;border-top:1px solid #999;border-left:1px solid #999;font-size:90%;}td,th{border:0;border-right:1px solid #999;border-bottom:1px solid #999;padding:.2em .3em;}th{background:#eee;text-align:left;}thead th{text-align:center;}thead td,thead th{background:#ddf;}fieldset{display:inline;vertical-align:top;padding:.5em .8em;margin:.8em .5em 0 0;border:1px solid #999;}p{margin:.8em 20px 0 0;}img{vertical-align:middle;border:0;}td img{max-width:200px;max-height:200px;}code{background:#eee;}tr:hover td,tr:hover th{background:#ddf;}pre{margin:1em 0 0;}input[type=image]{vertical-align:middle;}.version{color:#777;font-size:67%;}.js .hidden,.nojs .jsonly{display:none;}.nowrap td,.nowrap th,td.nowrap{white-space:pre;}.wrap td{white-space:normal;}.error{color:red;background:#fee;}.error b{background:#fff;font-weight:normal;}.message{color:green;background:#efe;}.error,.message{padding:.5em .8em;margin:1em 20px 0 0;}.char{color:#007F00;}.date{color:#7F007F;}.enum{color:#007F7F;}.binary{color:red;}.odd td{background:#F5F5F5;}.time{color:silver;font-size:70%;}.function{text-align:right;}.number{text-align:right;}.datetime{text-align:right;}.type{width:15ex;width:auto\\9;}.options select{width:20ex;width:auto\\9;}.active{font-weight:bold;}.sqlarea{width:98%;}#menu{position:absolute;margin:10px 0 0;padding:0 0 30px 0;top:2em;left:0;width:19em;overflow:auto;overflow-y:hidden;white-space:nowrap;}#menu p{padding:.8em 1em;margin:0;border-bottom:1px solid #ccc;}#content{margin:2em 0 0 21em;padding:10px 20px 20px 0;}#lang{position:absolute;top:0;left:0;line-height:1.8em;padding:.3em 1em;}#breadcrumb{white-space:nowrap;position:absolute;top:0;left:21em;background:#eee;height:2em;line-height:1.8em;padding:0 1em;margin:0 0 0 -18px;}#loader{position:fixed;top:0;left:18em;z-index:1;}#h1{color:#777;text-decoration:none;font-style:italic;}#version{font-size:67%;color:red;}#schema{margin-left:60px;position:relative;}#schema .table{border:1px solid silver;padding:0 2px;cursor:move;position:absolute;}#schema .references{position:absolute;}.rtl h2{margin:0 -18px 20px 0;}.rtl p,.rtl table,.rtl .error,.rtl .message{margin:1em 0 0 20px;}.rtl #content{margin:2em 21em 0 0;padding:10px 0 20px 20px;}.rtl #breadcrumb{left:auto;right:21em;margin:0 -18px 0 0;}.rtl #lang,.rtl #menu{left:auto;right:0;}@media print{#lang,#menu{display:none;}#content{margin-left:1em;}#breadcrumb{left:1em;}.nowrap td,.nowrap th,td.nowrap{white-space:normal;}}';}elseif($_GET["file"]=="functions.js"){header("Content-Type: text/javascript; charset=utf-8");?>
function toggle(id){var el=document.getElementById(id);el.className=(el.className=='hidden'?'':'hidden');return true;}
function cookie(assign,days){var date=new Date();date.setDate(date.getDate()+days);document.cookie=assign+'; expires='+date;}
function verifyVersion(){cookie('adminer_version=0',1);var script=document.createElement('script');script.src=location.protocol+'//www.adminer.org/version.php';document.body.appendChild(script);}
function selectValue(select){var selected=select.options[select.selectedIndex];return((selected.attributes.value||{}).specified?selected.value:selected.text);}
function formCheck(el,name){var elems=el.form.elements;for(var i=0;i<elems.length;i++){if(name.test(elems[i].name)){elems[i].checked=el.checked;}}}
function formUncheck(id){document.getElementById(id).checked=false;}
function formChecked(el,name){var checked=0;var elems=el.form.elements;for(var i=0;i<elems.length;i++){if(name.test(elems[i].name)&&elems[i].checked){checked++;}}
return checked;}
function tableClick(event){var el=event.target||event.srcElement;while(!/^tr$/i.test(el.tagName)){if(/^(table|a|input|textarea)$/i.test(el.tagName)){return;}
el=el.parentNode;}
el=el.firstChild.firstChild;el.click&&el.click();el.onclick&&el.onclick();}
function setHtml(id,html){var el=document.getElementById(id);if(el){if(html==undefined){el.parentNode.innerHTML='&nbsp;';}else{el.innerHTML=html;}}}
function nodePosition(el){var pos=0;while(el=el.previousSibling){pos++;}
return pos;}
function pageClick(href,page,event){if(!isNaN(page)&&page){href+=(page!=1?'&page='+(page-1):'');if(!ajaxSend(href)){location.href=href;}}}
function selectAddRow(field){field.onchange=function(){};var row=field.parentNode.cloneNode(true);var selects=row.getElementsByTagName('select');for(var i=0;i<selects.length;i++){selects[i].name=selects[i].name.replace(/[a-z]\[\d+/,'$&1');selects[i].selectedIndex=0;}
var inputs=row.getElementsByTagName('input');if(inputs.length){inputs[0].name=inputs[0].name.replace(/[a-z]\[\d+/,'$&1');inputs[0].value='';inputs[0].className='';}
field.parentNode.parentNode.appendChild(row);}
function bodyKeydown(event,button){var target=event.target||event.srcElement;if(event.ctrlKey&&(event.keyCode==13||event.keyCode==10)&&!event.altKey&&!event.metaKey&&/select|textarea|input/i.test(target.tagName)){target.blur();if(!ajaxForm(target.form,(button?button+'=1':''))){if(button){target.form[button].click();}else{target.form.submit();}}
return false;}
return true;}
function editingKeydown(event){if((event.keyCode==40||event.keyCode==38)&&event.ctrlKey&&!event.altKey&&!event.metaKey){var target=event.target||event.srcElement;var sibling=(event.keyCode==40?'nextSibling':'previousSibling');var el=target.parentNode.parentNode[sibling];if(el&&(/^tr$/i.test(el.tagName)||(el=el[sibling]))&&/^tr$/i.test(el.tagName)&&(el=el.childNodes[nodePosition(target.parentNode)])&&(el=el.childNodes[nodePosition(target)])){el.focus();}
return false;}
if(event.shiftKey&&!bodyKeydown(event,'insert')){eventStop(event);return false;}
return true;}
function functionChange(select){var input=select.form[select.name.replace(/^function/,'fields')];if(selectValue(select)){if(input.origMaxLength===undefined){input.origMaxLength=input.maxLength;}
input.removeAttribute('maxlength');}else if(input.origMaxLength>=0){input.maxLength=input.origMaxLength;}}
function ajax(url,callback,data){var xmlhttp=(window.XMLHttpRequest?new XMLHttpRequest():(window.ActiveXObject?new ActiveXObject('Microsoft.XMLHTTP'):false));if(xmlhttp){xmlhttp.open((data?'POST':'GET'),url);if(data){xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');}
xmlhttp.setRequestHeader('X-Requested-With','XMLHttpRequest');xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4){callback(xmlhttp);}};xmlhttp.send(data);}
return xmlhttp;}
function ajaxSetHtml(url){return ajax(url,function(xmlhttp){if(xmlhttp.status){var data=eval('('+xmlhttp.responseText+')');for(var key in data){setHtml(key,data[key]);}}});}
var originalFavicon;function replaceFavicon(href){var favicon=document.getElementById('favicon');if(favicon){favicon.href=href;favicon.parentNode.appendChild(favicon);}}
var ajaxState=0;function ajaxSend(url,data,popState,noscroll){if(!history.pushState){return false;}
var currentState=++ajaxState;onblur=function(){if(!originalFavicon){originalFavicon=(document.getElementById('favicon')||{}).href;}
replaceFavicon(location.pathname+'?file=loader.gif&amp;version=3.3.1');};setHtml('loader','<img src="'+location.pathname+'?file=loader.gif&amp;version=3.3.1" alt="">');return ajax(url,function(xmlhttp){if(currentState==ajaxState){var title=xmlhttp.getResponseHeader('X-AJAX-Title');if(title){document.title=decodeURIComponent(title);}
var redirect=xmlhttp.getResponseHeader('X-AJAX-Redirect');if(redirect){return ajaxSend(redirect,'',popState);}
onblur=function(){};replaceFavicon(originalFavicon);if(!xmlhttp.status){setHtml('loader','');}else{if(!popState){if(data||url!=location.href){history.pushState(data,'',url);}}
if(!noscroll){scrollTo(0,0);}
setHtml('content',xmlhttp.responseText);var content=document.getElementById('content');var scripts=content.getElementsByTagName('script');var length=scripts.length;for(var i=0;i<length;i++){var script=document.createElement('script');script.text=scripts[i].text;content.appendChild(script);}
var as=document.getElementById('menu').getElementsByTagName('a');var href=location.href.replace(/(&(sql=|dump=|(select|table)=[^&]*)).*/,'$1');for(var i=0;i<as.length;i++){as[i].className=(href==as[i].href?'active':'');}
var dump=document.getElementById('dump');if(dump){var match=/&(select|table)=([^&]+)/.exec(href);dump.href=dump.href.replace(/[^=]+$/,'')+(match?match[2]:'');}
if(window.jush){jush.highlight_tag('code',0);}}}},data);}
onpopstate=function(event){if((ajaxState||event.state)&&!/#/.test(location.href)){ajaxSend(location.href,(event.state&&confirm(areYouSure)?event.state:''),1);}else{ajaxState++;}};function ajaxForm(form,data,noscroll){if((/&(database|scheme|create|view|sql|user|dump|call)=/.test(location.href)&&!/\./.test(data))||(form.onsubmit&&form.onsubmit()===false)){return false;}
var params=[];for(var i=0;i<form.elements.length;i++){var el=form.elements[i];if(/file/i.test(el.type)&&el.value){return false;}else if(el.name&&(!/checkbox|radio|submit|file/i.test(el.type)||el.checked)){params.push(encodeURIComponent(el.name)+'='+encodeURIComponent(/select/i.test(el.tagName)?selectValue(el):el.value));}}
if(data){params.push(data);}
if(form.method=='post'){return ajaxSend((/\?/.test(form.action)?form.action:location.href),params.join('&'),noscroll);}
return ajaxSend((form.action||location.href).replace(/\?.*/,'')+'?'+params.join('&'),noscroll);}
function selectDblClick(td,event,text){if(/input|textarea/i.test(td.firstChild.tagName)){return;}
var original=td.innerHTML;var input=document.createElement(text?'textarea':'input');input.onkeydown=function(event){if(!event){event=window.event;}
if(event.keyCode==27&&!(event.ctrlKey||event.shiftKey||event.altKey||event.metaKey)){td.innerHTML=original;}};var pos=event.rangeOffset;var value=td.firstChild.alt||td.textContent||td.innerText;input.style.width=Math.max(td.clientWidth-14,20)+'px';if(text){var rows=1;value.replace(/\n/g,function(){rows++;});input.rows=rows;}
if(value=='\u00A0'||td.getElementsByTagName('i').length){value='';}
if(document.selection){var range=document.selection.createRange();range.moveToPoint(event.clientX,event.clientY);var range2=range.duplicate();range2.moveToElementText(td);range2.setEndPoint('EndToEnd',range);pos=range2.text.length;}
td.innerHTML='';td.appendChild(input);input.focus();if(text==2){return ajax(location.href+'&'+encodeURIComponent(td.id)+'=',function(xmlhttp){if(xmlhttp.status){input.value=xmlhttp.responseText;input.name=td.id;}});}
input.value=value;input.name=td.id;input.selectionStart=pos;input.selectionEnd=pos;if(document.selection){var range=document.selection.createRange();range.moveEnd('character',-input.value.length+pos);range.select();}}
function bodyClick(event,db,ns){if(event.button||event.ctrlKey||event.shiftKey||event.altKey||event.metaKey){return;}
if(event.getPreventDefault?event.getPreventDefault():event.returnValue===false||event.defaultPrevented){return false;}
var el=event.target||event.srcElement;if(/^a$/i.test(el.parentNode.tagName)){el=el.parentNode;}
if(/^a$/i.test(el.tagName)&&!/:|#|&download=/i.test(el.getAttribute('href'))&&/[&?]username=/.test(el.href)){var match=/&db=([^&]*)/.exec(el.href);var match2=/&ns=([^&]*)/.exec(el.href);return!(db==(match?match[1]:'')&&ns==(match2?match2[1]:'')&&ajaxSend(el.href));}
if(/^input$/i.test(el.tagName)&&/image|submit/.test(el.type)){return!ajaxForm(el.form,(el.name?encodeURIComponent(el.name)+(el.type=='image'?'.x':'')+'=1':''),el.type=='image');}
return true;}
function eventStop(event){if(event.stopPropagation){event.stopPropagation();}else{event.cancelBubble=true;}}
function bodyLoad(version){if(history.state!==undefined){onpopstate(history);}}
function whisperClick(event,field){var el=event.target||event.srcElement;if(/^a$/i.test(el.tagName)&&!(event.button||event.ctrlKey||event.shiftKey||event.altKey||event.metaKey)){field.value=el.firstChild.data;field.previousSibling.value=decodeURIComponent(el.href.replace(/.*=/,''));field.nextSibling.style.display='none';eventStop(event);return false;}}
function whisper(url,field){if(field.orig!=field.value){field.orig=field.value;field.previousSibling.value=field.value;return ajax(url+encodeURIComponent(field.value),function(xmlhttp){if(xmlhttp.status&&field.orig==field.value){field.nextSibling.innerHTML=xmlhttp.responseText;field.nextSibling.style.display='';var a=field.nextSibling.firstChild;if(a&&a.firstChild.data==field.value){field.previousSibling.value=decodeURIComponent(a.href.replace(/.*=/,''));a.className='active';}}});}}<?php
}else{header("Content-Type: image/gif");switch($_GET["file"]){case"plus.gif":echo
base64_decode("R0lGODdhEgASAKEAAO7u7gAAAJmZmQAAACwAAAAAEgASAAACIYSPqcvtD00I8cwqKb5v+q8pIAhxlRmhZYi17iPE8kzLBQA7");break;case"cross.gif":echo
base64_decode("R0lGODdhEgASAKEAAO7u7gAAAJmZmQAAACwAAAAAEgASAAACI4SPqcvtDyMKYdZGb355wy6BX3dhlOEx57FK7gtHwkzXNl0AADs=");break;case"up.gif":echo
base64_decode("R0lGODdhEgASAKEAAO7u7gAAAJmZmQAAACwAAAAAEgASAAACIISPqcvtD00IUU4K730T9J5hFTiKEXmaYcW2rgDH8hwXADs=");break;case"down.gif":echo
base64_decode("R0lGODdhEgASAKEAAO7u7gAAAJmZmQAAACwAAAAAEgASAAACIISPqcvtD00I8cwqKb5bV/5cosdMJtmcHca2lQDH8hwXADs=");break;case"arrow.gif":echo
base64_decode("R0lGODlhCAAKAIAAAICAgP///yH5BAEAAAEALAAAAAAIAAoAAAIPBIJplrGLnpQRqtOy3rsAADs=");break;case"loader.gif":echo
base64_decode("R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==");break;}}exit;}function
connection(){global$g;return$g;}function
idf_unescape($aa){$Sb=substr($aa,-1);return
str_replace($Sb.$Sb,$Sb,substr($aa,1,-1));}function
escape_string($a){return
substr(q($a),1,-1);}function
remove_slashes($ra,$hb=false){if(get_magic_quotes_gpc()){while(list($c,$a)=each($ra)){foreach($a
as$W=>$o){unset($ra[$c][$W]);if(is_array($o)){$ra[$c][stripslashes($W)]=$o;$ra[]=&$ra[$c][stripslashes($W)];}else{$ra[$c][stripslashes($W)]=($hb?$o:stripslashes($o));}}}}}function
bracket_escape($aa,$ad=false){static$Kc=array(':'=>':1',']'=>':2','['=>':3');return
strtr($aa,($ad?array_flip($Kc):$Kc));}function
h($F){return
htmlspecialchars(str_replace("\0","",$F),ENT_QUOTES);}function
nbsp($F){return(trim($F)!=""?h($F):"&nbsp;");}function
nl_br($F){return
str_replace("\n","<br>",$F);}function
checkbox($f,$i,$bb,$Sc="",$qb="",$Zc=false){static$z=0;$z++;$b="<input type='checkbox' name='$f' value='".h($i)."'".($bb?" checked":"").($qb?' onclick="'.h($qb).'"':'').($Zc?" class='jsonly'":"")." id='checkbox-$z'>";return($Sc!=""?"<label for='checkbox-$z'>$b".h($Sc)."</label>":$b);}function
optionlist($Z,$Xc=null,$oc=false){$b="";foreach($Z
as$W=>$o){$dc=array($W=>$o);if(is_array($o)){$b.='<optgroup label="'.h($W).'">';$dc=$o;}foreach($dc
as$c=>$a){$b.='<option'.($oc||is_string($c)?' value="'.h($c).'"':'').(($oc||is_string($c)?(string)$c:$a)===$Xc?' selected':'').'>'.h($a);}if(is_array($o)){$b.='</optgroup>';}}return$b;}function
html_select($f,$Z,$i="",$za=true){if($za){return"<select name='".h($f)."'".(is_string($za)?' onchange="'.h($za).'"':"").">".optionlist($Z,$i)."</select>";}$b="";foreach($Z
as$c=>$a){$b.="<label><input type='radio' name='".h($f)."' value='".h($c)."'".($c==$i?" checked":"").">".h($a)."</label>";}return$b;}function
confirm($Qc="",$xd=false){return" onclick=\"".($xd?"eventStop(event); ":"")."return confirm('".'Are you sure?'.($Qc?" (' + $Qc + ')":"")."');\"";}function
print_fieldset($z,$Dd,$Ed=false,$qb=""){echo"<fieldset><legend><a href='#fieldset-$z' onclick=\"".h($qb)."return !toggle('fieldset-$z');\">$Dd</a></legend><div id='fieldset-$z'".($Ed?"":" class='hidden'").">\n";}function
bold($Fd){return($Fd?" class='active'":"");}function
odd($b=' class="odd"'){static$n=0;if(!$b){$n=-1;}return($n++%
2?$b:'');}function
js_escape($F){return
addcslashes($F,"\r\n'\\/");}function
json_row($c,$a=null){static$da=true;if($da){echo"{";}if($c!=""){echo($da?"":",")."\n\t\"".addcslashes($c,"\r\n\"\\").'": '.(isset($a)?'"'.addcslashes($a,"\r\n\"\\").'"':'undefined');$da=false;}else{echo"\n}\n";$da=true;}}function
ini_bool($Cd){$a=ini_get($Cd);return(eregi('^(on|true|yes)$',$a)||(int)$a);}function
sid(){static$b;if(!isset($b)){$b=(SID&&!($_COOKIE&&ini_bool("session.use_cookies")));}return$b;}function
q($F){global$g;return$g->quote($F);}function
get_vals($l,$H=0){global$g;$b=array();$k=$g->query($l);if(is_object($k)){while($d=$k->fetch_row()){$b[]=$d[$H];}}return$b;}function
get_key_vals($l,$pa=null){global$g;if(!is_object($pa)){$pa=$g;}$b=array();$k=$pa->query($l);if(is_object($k)){while($d=$k->fetch_row()){$b[$d[0]]=$d[1];}}return$b;}function
get_rows($l,$pa=null,$v="<p class='error'>"){global$g;if(!is_object($pa)){$pa=$g;}$b=array();$k=$pa->query($l);if(is_object($k)){while($d=$k->fetch_assoc()){$b[]=$d;}}elseif(!$k&&$g->error&&$v&&defined("PAGE_HEADER")){echo$v.error()."\n";}return$b;}function
unique_array($d,$G){foreach($G
as$S){if(ereg("PRIMARY|UNIQUE",$S["type"])){$b=array();foreach($S["columns"]as$c){if(!isset($d[$c])){continue
2;}$b[$c]=$d[$c];}return$b;}}$b=array();foreach($d
as$c=>$a){if(!preg_match('~^(COUNT\\((\\*|(DISTINCT )?`(?:[^`]|``)+`)\\)|(AVG|GROUP_CONCAT|MAX|MIN|SUM)\\(`(?:[^`]|``)+`\\))$~',$c)){$b[$c]=$a;}}return$b;}function
where($p){global$la;$b=array();foreach((array)$p["where"]as$c=>$a){$b[]=idf_escape(bracket_escape($c,1)).(ereg('\\.',$a)||$la=="mssql"?" LIKE ".exact_value(addcslashes($a,"%_\\")):" = ".exact_value($a));}foreach((array)$p["null"]as$c){$b[]=idf_escape($c)." IS NULL";}return
implode(" AND ",$b);}function
where_check($a){parse_str($a,$mc);remove_slashes(array(&$mc));return
where($mc);}function
where_link($n,$H,$i,$Bd="="){return"&where%5B$n%5D%5Bcol%5D=".urlencode($H)."&where%5B$n%5D%5Bop%5D=".urlencode((isset($i)?$Bd:"IS NULL"))."&where%5B$n%5D%5Bval%5D=".urlencode($i);}function
cookie($f,$i){global$cb;$Ya=array($f,(ereg("\n",$i)?"":$i),time()+2592000,preg_replace('~\\?.*~','',$_SERVER["REQUEST_URI"]),"",$cb);if(version_compare(PHP_VERSION,'5.2.0')>=0){$Ya[]=true;}return
call_user_func_array('setcookie',$Ya);}function
restart_session(){if(!ini_bool("session.use_cookies")){session_start();}}function&get_session($c){return$_SESSION[$c][DRIVER][SERVER][$_GET["username"]];}function
set_session($c,$a){$_SESSION[$c][DRIVER][SERVER][$_GET["username"]]=$a;}function
auth_url($wb,$E,$D){global$va;preg_match('~([^?]*)\\??(.*)~',remove_from_uri(implode("|",array_keys($va))."|username|".session_name()),$m);return"$m[1]?".(sid()?SID."&":"").($wb!="server"||$E!=""?urlencode($wb)."=".urlencode($E)."&":"")."username=".urlencode($D).($m[2]?"&$m[2]":"");}function
is_ajax(){return($_SERVER["HTTP_X_REQUESTED_WITH"]=="XMLHttpRequest");}function
redirect($I,$X=null){if(isset($X)){restart_session();$_SESSION["messages"][preg_replace('~^[^?]*~','',(isset($I)?$I:$_SERVER["REQUEST_URI"]))][]=$X;}if(isset($I)){if($I==""){$I=".";}header((is_ajax()?"X-AJAX-Redirect":"Location").": $I");exit;}}function
query_redirect($l,$I,$X,$lb=true,$_d=true,$nc=false){global$g,$v,$j;if($_d){$nc=!$g->query($l);}$Fb="";if($l){$Fb=$j->messageQuery("$l;");}if($nc){$v=error().$Fb;return
false;}if($lb){redirect($I,$X.$Fb);}return
true;}function
queries($l=null){global$g;static$cc=array();if(!isset($l)){return
implode(";\n",$cc);}$cc[]=(ereg(';$',$l)?"DELIMITER ;;\n$l;\nDELIMITER ":$l);return$g->query($l);}function
apply_queries($l,$ga,$cd='table'){foreach($ga
as$h){if(!queries("$l ".$cd($h))){return
false;}}return
true;}function
queries_redirect($I,$X,$lb){return
query_redirect(queries(),$I,$X,$lb,false,!$lb);}function
remove_from_uri($ja=""){return
substr(preg_replace("~(?<=[?&])($ja".(SID?"":"|".session_name()).")=[^&]*&~",'',"$_SERVER[REQUEST_URI]&"),0,-1);}function
pagination($_,$Ad){return" ".($_==$Ad?$_+1:'<a href="'.h(remove_from_uri("page").($_?"&page=$_":"")).'">'.($_+1)."</a>");}function
get_file($c,$Ob=false){$T=$_FILES[$c];if(!$T||$T["error"]){return$T["error"];}$b=file_get_contents($Ob&&ereg('\\.gz$',$T["name"])?"compress.zlib://$T[tmp_name]":($Ob&&ereg('\\.bz2$',$T["name"])?"compress.bzip2://$T[tmp_name]":$T["tmp_name"]));if($Ob){$fc=substr($b,0,3);if(function_exists("iconv")&&ereg("^\xFE\xFF|^\xFF\xFE",$fc,$Qd)){$b=iconv("utf-16","utf-8",$b);}elseif($fc=="\xEF\xBB\xBF"){$b=substr($b,3);}}return$b;}function
upload_error($v){$xc=($v==UPLOAD_ERR_INI_SIZE?ini_get("upload_max_filesize"):null);return($v?'Unable to upload a file.'.($xc?" ".sprintf('Maximum allowed file size is %sB.',$xc):""):'File does not exist.');}function
repeat_pattern($L,$Za){return
str_repeat("$L{0,65535}",$Za/65535)."$L{0,".($Za
%
65535)."}";}function
is_utf8($a){return(preg_match('~~u',$a)&&!preg_match('~[\\0-\\x8\\xB\\xC\\xE-\\x1F]~',$a));}function
shorten_utf8($F,$Za=80,$Kd=""){if(!preg_match("(^(".repeat_pattern("[\t\r\n -\x{FFFF}]",$Za).")($)?)u",$F,$m)){preg_match("(^(".repeat_pattern("[\t\r\n -~]",$Za).")($)?)",$F,$m);}return
h($m[1]).$Kd.(isset($m[2])?"":"<i>...</i>");}function
friendly_url($a){return
preg_replace('~[^a-z0-9_]~i','-',$a);}function
hidden_fields($ra,$Id=array()){while(list($c,$a)=each($ra)){if(is_array($a)){foreach($a
as$W=>$o){$ra[$c."[$W]"]=$o;}}elseif(!in_array($c,$Id)){echo'<input type="hidden" name="'.h($c).'" value="'.h($a).'">';}}}function
hidden_fields_get(){echo(sid()?'<input type="hidden" name="'.session_name().'" value="'.h(session_id()).'">':''),(SERVER!==null?'<input type="hidden" name="'.DRIVER.'" value="'.h(SERVER).'">':""),'<input type="hidden" name="username" value="'.h($_GET["username"]).'">';}function
column_foreign_keys($h){global$j;$b=array();foreach($j->foreignKeys($h)as$na){foreach($na["source"]as$a){$b[$a][]=$na;}}return$b;}function
enum_input($ua,$J,$e,$i,$Jb=null){global$j;preg_match_all("~'((?:[^']|'')*)'~",$e["length"],$R);$b=(isset($Jb)?"<label><input type='$ua'$J value='$Jb'".((is_array($i)?in_array($Jb,$i):$i===0)?" checked":"")."><i>".'empty'."</i></label>":"");foreach($R[1]as$n=>$a){$a=stripcslashes(str_replace("''","'",$a));$bb=(is_int($i)?$i==$n+1:(is_array($i)?in_array($n+1,$i):$i===$a));$b.=" <label><input type='$ua'$J value='".($n+1)."'".($bb?' checked':'').'>'.h($j->editVal($a,$e)).'</label>';}return$b;}function
input($e,$i,$x){global$Ba,$j,$la;$f=h(bracket_escape($e["field"]));echo"<td class='function'>";$rc=($la=="mssql"&&$e["auto_increment"]);if($rc&&!$_POST["save"]){$x=null;}$ca=(isset($_GET["select"])||$rc?array("orig"=>'original'):array())+$j->editFunctions($e);$J=" name='fields[$f]'";if($e["type"]=="enum"){echo
nbsp($ca[""])."<td>".$j->editInput($_GET["edit"],$e,$J,$i);}else{$da=0;foreach($ca
as$c=>$a){if($c===""||!$a){break;}$da++;}$za=($da?" onchange=\"var f = this.form['function[".h(js_escape(bracket_escape($e["field"])))."]']; if ($da > f.selectedIndex) f.selectedIndex = $da;\"":"");$J.=$za;echo(count($ca)>1?html_select("function[$f]",$ca,!isset($x)||in_array($x,$ca)||isset($ca[$x])?$x:"","functionChange(this);"):nbsp(reset($ca))).'<td>';$Uc=$j->editInput($_GET["edit"],$e,$J,$i);if($Uc!=""){echo$Uc;}elseif($e["type"]=="set"){preg_match_all("~'((?:[^']|'')*)'~",$e["length"],$R);foreach($R[1]as$n=>$a){$a=stripcslashes(str_replace("''","'",$a));$bb=(is_int($i)?($i>>$n)&1:in_array($a,explode(",",$i),true));echo" <label><input type='checkbox' name='fields[$f][$n]' value='".(1<<$n)."'".($bb?' checked':'')."$za>".h($j->editVal($a,$e)).'</label>';}}elseif(ereg('blob|bytea|raw|file',$e["type"])&&ini_bool("file_uploads")){echo"<input type='file' name='fields-$f'$za>";}elseif(ereg('text|lob',$e["type"])){echo"<textarea ".($la!="sqlite"||ereg("\n",$i)?"cols='50' rows='12'":"cols='30' rows='1' style='height: 1.2em;'")."$J>".h($i).'</textarea>';}else{$Hb=(!ereg('int',$e["type"])&&preg_match('~^(\\d+)(,(\\d+))?$~',$e["length"],$m)?((ereg("binary",$e["type"])?2:1)*$m[1]+($m[3]?1:0)+($m[2]&&!$e["unsigned"]?1:0)):($Ba[$e["type"]]?$Ba[$e["type"]]+($e["unsigned"]?0:1):0));echo"<input value='".h($i)."'".($Hb?" maxlength='$Hb'":"").(ereg('char|binary',$e["type"])&&$Hb>20?" size='40'":"")."$J>";}}}function
process_input($e){global$j;$aa=bracket_escape($e["field"]);$x=$_POST["function"][$aa];$i=$_POST["fields"][$aa];if($e["type"]=="enum"){if($i==-1){return
false;}if($i==""){return"NULL";}return+$i;}if($e["auto_increment"]&&$i==""){return
null;}if($x=="orig"){return($e["on_update"]=="CURRENT_TIMESTAMP"?idf_escape($e["field"]):false);}if($x=="NULL"){return"NULL";}if($e["type"]=="set"){return
array_sum((array)$i);}if(ereg('blob|bytea|raw|file',$e["type"])&&ini_bool("file_uploads")){$T=get_file("fields-$aa");if(!is_string($T)){return
false;}return
q($T);}return$j->processInput($e,$i,$x);}function
search_tables(){global$j,$g;$_GET["where"][0]["op"]="LIKE %%";$_GET["where"][0]["val"]=$_POST["query"];$Cb=false;foreach(table_status()as$h=>$B){$f=$j->tableName($B);if(isset($B["Engine"])&&$f!=""&&(!$_POST["tables"]||in_array($h,$_POST["tables"]))){$k=$g->query("SELECT".limit("1 FROM ".table($h)," WHERE ".implode(" AND ",$j->selectSearchProcess(fields($h),array())),1));if($k->fetch_row()){if(!$Cb){echo"<ul>\n";$Cb=true;}echo"<li><a href='".h(ME."select=".urlencode($h)."&where[0][op]=".urlencode($_GET["where"][0]["op"])."&where[0][val]=".urlencode($_GET["where"][0]["val"]))."'>$f</a>\n";}}}echo($Cb?"</ul>":"<p class='message'>".'No tables.')."\n";}function
dump_headers($fb,$Gc=false){global$j;$b=$j->dumpHeaders($fb,$Gc);$_a=$_POST["output"];if($_a!="text"){header("Content-Disposition: attachment; filename=".friendly_url($fb!=""?$fb:(SERVER!=""?SERVER:"localhost")).".$b".($_a!="file"&&!ereg('[^0-9a-z]',$_a)?".$_a":""));}session_write_close();return$b;}function
dump_csv($d){foreach($d
as$c=>$a){if(preg_match("~[\"\n,;\t]~",$a)||$a===""){$d[$c]='"'.str_replace('"','""',$a).'"';}}echo
implode(($_POST["format"]=="csv"?",":($_POST["format"]=="tsv"?"\t":";")),$d)."\r\n";}function
apply_sql_function($x,$H){return($x?($x=="unixepoch"?"DATETIME($H, '$x')":($x=="count distinct"?"COUNT(DISTINCT ":strtoupper("$x("))."$H)"):$H);}function
password_file(){$kb=ini_get("upload_tmp_dir");if(!$kb){if(function_exists('sys_get_temp_dir')){$kb=sys_get_temp_dir();}else{$Ea=@tempnam("","");if(!$Ea){return
false;}$kb=dirname($Ea);unlink($Ea);}}$Ea="$kb/adminer.key";$b=@file_get_contents($Ea);if($b){return$b;}$Wb=@fopen($Ea,"w");if($Wb){$b=md5(uniqid(mt_rand(),true));fwrite($Wb,$b);fclose($Wb);}return$b;}function
is_mail($Fa){$yc='[-a-z0-9!#$%&\'*+/=?^_`{|}~]';$ab='[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])';$L="$yc+(\\.$yc+)*@($ab?\\.)+$ab";return
preg_match("(^$L(,\\s*$L)*\$)i",$Fa);}function
is_url($F){$ab='[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])';return(preg_match("~^(https?)://($ab?\\.)+$ab(:\\d+)?(/.*)?(\\?.*)?(#.*)?\$~i",$F,$m)?strtolower($m[1]):"");}global$j,$g,$va,$hd,$Rb,$v,$ca,$ud,$cb,$zc,$la,$rd,$Rd,$_b,$Bc,$ea,$Nd,$Ba,$qd,$Bb;if(!isset($_SERVER["REQUEST_URI"])){$_SERVER["REQUEST_URI"]=$_SERVER["ORIG_PATH_INFO"].($_SERVER["QUERY_STRING"]!=""?"?$_SERVER[QUERY_STRING]":"");}$cb=$_SERVER["HTTPS"]&&strcasecmp($_SERVER["HTTPS"],"off");@ini_set("session.use_trans_sid",false);if(!defined("SID")){session_name("adminer_sid");$Ya=array(0,preg_replace('~\\?.*~','',$_SERVER["REQUEST_URI"]),"",$cb);if(version_compare(PHP_VERSION,'5.2.0')>=0){$Ya[]=true;}call_user_func_array('session_set_cookie_params',$Ya);session_start();}remove_slashes(array(&$_GET,&$_POST,&$_COOKIE),$hb);if(function_exists("set_magic_quotes_runtime")){set_magic_quotes_runtime(false);}@set_time_limit(0);@ini_set("zend.ze1_compatibility_mode",false);@ini_set("precision",20);function
get_lang(){return'en';}function
lang($pd,$Dc){$od=($Dc==1?0:1);return
sprintf($pd[$od],$Dc);}if(extension_loaded('pdo')){class
Min_PDO
extends
PDO{var$_result,$server_info,$affected_rows,$error;function
__construct(){}function
dsn($wd,$D,$O,$vd='auth_error'){set_exception_handler($vd);parent::__construct($wd,$D,$O);restore_exception_handler();$this->setAttribute(13,array('Min_PDOStatement'));$this->server_info=$this->getAttribute(4);}function
query($l,$Ma=false){$k=parent::query($l);if(!$k){$nd=$this->errorInfo();$this->error=$nd[2];return
false;}$this->store_result($k);return$k;}function
multi_query($l){return$this->_result=$this->query($l);}function
store_result($k=null){if(!$k){$k=$this->_result;}if($k->columnCount()){$k->num_rows=$k->rowCount();return$k;}$this->affected_rows=$k->rowCount();return
true;}function
next_result(){return$this->_result->nextRowset();}function
result($l,$e=0){$k=$this->query($l);if(!$k){return
false;}$d=$k->fetch();return$d[$e];}}class
Min_PDOStatement
extends
PDOStatement{var$_offset=0,$num_rows;function
fetch_assoc(){return$this->fetch(2);}function
fetch_row(){return$this->fetch(3);}function
fetch_field(){$d=(object)$this->getColumnMeta($this->_offset++);$d->orgtable=$d->table;$d->orgname=$d->name;$d->charsetnr=(in_array("blob",$d->flags)?63:0);return$d;}}}$va=array();$va=array("server"=>"MySQL")+$va;if(!defined("DRIVER")){$fd=array("MySQLi","MySQL","PDO_MySQL");define("DRIVER","server");if(extension_loaded("mysqli")){class
Min_DB
extends
MySQLi{var$extension="MySQLi";function
Min_DB(){parent::init();}function
connect($E,$D,$O){mysqli_report(MYSQLI_REPORT_OFF);list($ed,$yb)=explode(":",$E,2);$b=@$this->real_connect(($E!=""?$ed:ini_get("mysqli.default_host")),($E.$D!=""?$D:ini_get("mysqli.default_user")),($E.$D.$O!=""?$O:ini_get("mysqli.default_pw")),null,(is_numeric($yb)?$yb:ini_get("mysqli.default_port")),(!is_numeric($yb)?$yb:null));if($b){if(method_exists($this,'set_charset')){$this->set_charset("utf8");}else{$this->query("SET NAMES utf8");}}return$b;}function
result($l,$e=0){$k=$this->query($l);if(!$k){return
false;}$d=$k->fetch_array();return$d[$e];}function
quote($F){return"'".$this->escape_string($F)."'";}}}elseif(extension_loaded("mysql")){class
Min_DB{var$extension="MySQL",$server_info,$affected_rows,$error,$_link,$_result;function
connect($E,$D,$O){$this->_link=@mysql_connect(($E!=""?$E:ini_get("mysql.default_host")),("$E$D"!=""?$D:ini_get("mysql.default_user")),("$E$D$O"!=""?$O:ini_get("mysql.default_password")),true,131072);if($this->_link){$this->server_info=mysql_get_server_info($this->_link);if(function_exists('mysql_set_charset')){mysql_set_charset("utf8",$this->_link);}else{$this->query("SET NAMES utf8");}}else{$this->error=mysql_error();}return(bool)$this->_link;}function
quote($F){return"'".mysql_real_escape_string($F,$this->_link)."'";}function
select_db($Xa){return
mysql_select_db($Xa,$this->_link);}function
query($l,$Ma=false){$k=@($Ma?mysql_unbuffered_query($l,$this->_link):mysql_query($l,$this->_link));if(!$k){$this->error=mysql_error($this->_link);return
false;}if($k===true){$this->affected_rows=mysql_affected_rows($this->_link);$this->info=mysql_info($this->_link);return
true;}return
new
Min_Result($k);}function
multi_query($l){return$this->_result=$this->query($l);}function
store_result(){return$this->_result;}function
next_result(){return
false;}function
result($l,$e=0){$k=$this->query($l);if(!$k||!$k->num_rows){return
false;}return
mysql_result($k->_result,0,$e);}}class
Min_Result{var$num_rows,$_result,$_offset=0;function
Min_Result($k){$this->_result=$k;$this->num_rows=mysql_num_rows($k);}function
fetch_assoc(){return
mysql_fetch_assoc($this->_result);}function
fetch_row(){return
mysql_fetch_row($this->_result);}function
fetch_field(){$b=mysql_fetch_field($this->_result,$this->_offset++);$b->orgtable=$b->table;$b->orgname=$b->name;$b->charsetnr=($b->blob?63:0);return$b;}function
__destruct(){mysql_free_result($this->_result);}}}elseif(extension_loaded("pdo_mysql")){class
Min_DB
extends
Min_PDO{var$extension="PDO_MySQL";function
connect($E,$D,$O){$this->dsn("mysql:host=".str_replace(":",";unix_socket=",preg_replace('~:(\\d)~',';port=\\1',$E)),$D,$O);$this->query("SET NAMES utf8");return
true;}function
select_db($Xa){return$this->query("USE ".idf_escape($Xa));}function
query($l,$Ma=false){$this->setAttribute(1000,!$Ma);return
parent::query($l,$Ma);}}}function
idf_escape($aa){return"`".str_replace("`","``",$aa)."`";}function
table($aa){return
idf_escape($aa);}function
connect(){global$j;$g=new
Min_DB;$Tb=$j->credentials();if($g->connect($Tb[0],$Tb[1],$Tb[2])){$g->query("SET sql_quote_show_create = 1");return$g;}return$g->error;}function
get_databases($dd=true){global$g;$b=&get_session("dbs");if(!isset($b)){if($dd){restart_session();ob_flush();flush();}$b=get_vals($g->server_info>=5?"SELECT SCHEMA_NAME FROM information_schema.SCHEMATA":"SHOW DATABASES");}return$b;}function
limit($l,$p,$C,$vc=0,$sa=" "){return" $l$p".(isset($C)?$sa."LIMIT $C".($vc?" OFFSET $vc":""):"");}function
limit1($l,$p){return
limit($l,$p,1);}function
db_collation($ta,$id){global$g;$b=null;$gb=$g->result("SHOW CREATE DATABASE ".idf_escape($ta),1);if(preg_match('~ COLLATE ([^ ]+)~',$gb,$m)){$b=$m[1];}elseif(preg_match('~ CHARACTER SET ([^ ]+)~',$gb,$m)){$b=$id[$m[1]][-1];}return$b;}function
engines(){$b=array();foreach(get_rows("SHOW ENGINES")as$d){if(ereg("YES|DEFAULT",$d["Support"])){$b[]=$d["Engine"];}}return$b;}function
logged_user(){global$g;return$g->result("SELECT USER()");}function
tables_list(){global$g;return
get_key_vals("SHOW".($g->server_info>=5?" FULL":"")." TABLES");}function
count_tables($ka){$b=array();foreach($ka
as$ta){$b[$ta]=count(get_vals("SHOW TABLES IN ".idf_escape($ta)));}return$b;}function
table_status($f=""){$b=array();foreach(get_rows("SHOW TABLE STATUS".($f!=""?" LIKE ".q(addcslashes($f,"%_")):""))as$d){if($d["Engine"]=="InnoDB"){$d["Comment"]=preg_replace('~(?:(.+); )?InnoDB free: .*~','\\1',$d["Comment"]);}if(!isset($d["Rows"])){$d["Comment"]="";}if($f!=""){return$d;}$b[$d["Name"]]=$d;}return$b;}function
is_view($B){return!isset($B["Rows"]);}function
fk_support($B){return
eregi("InnoDB|IBMDB2I",$B["Engine"]);}function
fields($h){$b=array();foreach(get_rows("SHOW FULL COLUMNS FROM ".table($h))as$d){preg_match('~^([^( ]+)(?:\\((.+)\\))?( unsigned)?( zerofill)?$~',$d["Type"],$m);$b[$d["Field"]]=array("field"=>$d["Field"],"full_type"=>$d["Type"],"type"=>$m[1],"length"=>$m[2],"unsigned"=>ltrim($m[3].$m[4]),"default"=>($d["Default"]!=""||ereg("char",$m[1])?$d["Default"]:null),"null"=>($d["Null"]=="YES"),"auto_increment"=>($d["Extra"]=="auto_increment"),"on_update"=>(eregi('^on update (.+)',$d["Extra"],$m)?$m[1]:""),"collation"=>$d["Collation"],"privileges"=>array_flip(explode(",",$d["Privileges"])),"comment"=>$d["Comment"],"primary"=>($d["Key"]=="PRI"),);}return$b;}function
indexes($h,$pa=null){$b=array();foreach(get_rows("SHOW INDEX FROM ".table($h),$pa)as$d){$b[$d["Key_name"]]["type"]=($d["Key_name"]=="PRIMARY"?"PRIMARY":($d["Index_type"]=="FULLTEXT"?"FULLTEXT":($d["Non_unique"]?"INDEX":"UNIQUE")));$b[$d["Key_name"]]["columns"][]=$d["Column_name"];$b[$d["Key_name"]]["lengths"][]=$d["Sub_part"];}return$b;}function
foreign_keys($h){global$g,$_b;static$L='`(?:[^`]|``)+`';$b=array();$Hc=$g->result("SHOW CREATE TABLE ".table($h),1);if($Hc){preg_match_all("~CONSTRAINT ($L) FOREIGN KEY \\(((?:$L,? ?)+)\\) REFERENCES ($L)(?:\\.($L))? \\(((?:$L,? ?)+)\\)(?: ON DELETE (".implode("|",$_b)."))?(?: ON UPDATE (".implode("|",$_b)."))?~",$Hc,$R,PREG_SET_ORDER);foreach($R
as$m){preg_match_all("~$L~",$m[2],$Zb);preg_match_all("~$L~",$m[5],$Y);$b[idf_unescape($m[1])]=array("db"=>idf_unescape($m[4]!=""?$m[3]:$m[4]),"table"=>idf_unescape($m[4]!=""?$m[4]:$m[3]),"source"=>array_map('idf_unescape',$Zb[0]),"target"=>array_map('idf_unescape',$Y[0]),"on_delete"=>$m[6],"on_update"=>$m[7],);}}return$b;}function
view($f){global$g;return
array("select"=>preg_replace('~^(?:[^`]|`[^`]*`)*\\s+AS\\s+~isU','',$g->result("SHOW CREATE VIEW ".table($f),1)));}function
collations(){$b=array();foreach(get_rows("SHOW COLLATION")as$d){if($d["Default"]){$b[$d["Charset"]][-1]=$d["Collation"];}else{$b[$d["Charset"]][]=$d["Collation"];}}ksort($b);foreach($b
as$c=>$a){asort($b[$c]);}return$b;}function
information_schema($ta){global$g;return($g->server_info>=5&&$ta=="information_schema");}function
error(){global$g;return
h(preg_replace('~^You have an error.*syntax to use~U',"Syntax error",$g->error));}function
exact_value($a){return
q($a)." COLLATE utf8_bin";}function
create_database($ta,$Aa){set_session("dbs",null);return
queries("CREATE DATABASE ".idf_escape($ta).($Aa?" COLLATE ".q($Aa):""));}function
drop_databases($ka){set_session("dbs",null);return
apply_queries("DROP DATABASE",$ka,'idf_escape');}function
rename_database($f,$Aa){if(create_database($f,$Aa)){$Da=array();foreach(tables_list()as$h=>$ua){$Da[]=table($h)." TO ".idf_escape($f).".".table($h);}if(!$Da||queries("RENAME TABLE ".implode(", ",$Da))){queries("DROP DATABASE ".idf_escape(DB));return
true;}}return
false;}function
auto_increment(){$Yb=" PRIMARY KEY";if($_GET["create"]!=""&&$_POST["auto_increment_col"]){foreach(indexes($_GET["create"])as$S){if(in_array($_POST["fields"][$_POST["auto_increment_col"]]["orig"],$S["columns"],true)){$Yb="";break;}if($S["type"]=="PRIMARY"){$Yb=" UNIQUE";}}}return" AUTO_INCREMENT$Yb";}function
alter_table($h,$f,$q,$ld,$kd,$Rc,$Aa,$jb,$jd){$ha=array();foreach($q
as$e){$ha[]=($e[1]?($h!=""?($e[0]!=""?"CHANGE ".idf_escape($e[0]):"ADD"):" ")." ".implode($e[1]).($h!=""?" $e[2]":""):"DROP ".idf_escape($e[0]));}$ha=array_merge($ha,$ld);$Vc="COMMENT=".q($kd).($Rc?" ENGINE=".q($Rc):"").($Aa?" COLLATE ".q($Aa):"").($jb!=""?" AUTO_INCREMENT=$jb":"").$jd;if($h==""){return
queries("CREATE TABLE ".table($f)." (\n".implode(",\n",$ha)."\n) $Vc");}if($h!=$f){$ha[]="RENAME TO ".table($f);}$ha[]=$Vc;return
queries("ALTER TABLE ".table($h)."\n".implode(",\n",$ha));}function
alter_indexes($h,$ha){foreach($ha
as$c=>$a){$ha[$c]=($a[2]=="DROP"?"\nDROP INDEX ".idf_escape($a[1]):"\nADD $a[0] ".($a[0]=="PRIMARY"?"KEY ":"").($a[1]!=""?idf_escape($a[1])." ":"").$a[2]);}return
queries("ALTER TABLE ".table($h).implode(",",$ha));}function
truncate_tables($ga){return
apply_queries("TRUNCATE TABLE",$ga);}function
drop_views($Ta){return
queries("DROP VIEW ".implode(", ",array_map('table',$Ta)));}function
drop_tables($ga){return
queries("DROP TABLE ".implode(", ",array_map('table',$ga)));}function
move_tables($ga,$Ta,$Y){$Da=array();foreach(array_merge($ga,$Ta)as$h){$Da[]=table($h)." TO ".idf_escape($Y).".".table($h);}return
queries("RENAME TABLE ".implode(", ",$Da));}function
copy_tables($ga,$Ta,$Y){queries("SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO'");foreach($ga
as$h){$f=($Y==DB?table("copy_$h"):idf_escape($Y).".".table($h));if(!queries("DROP TABLE IF EXISTS $f")||!queries("CREATE TABLE $f LIKE ".table($h))||!queries("INSERT INTO $f SELECT * FROM ".table($h))){return
false;}}foreach($Ta
as$h){$f=($Y==DB?table("copy_$h"):idf_escape($Y).".".table($h));$yd=view($h);if(!queries("DROP VIEW IF EXISTS $f")||!queries("CREATE VIEW $f AS $yd[select]")){return
false;}}return
true;}function
trigger($f){$w=get_rows("SHOW TRIGGERS WHERE `Trigger` = ".q($f));return
reset($w);}function
triggers($h){$b=array();foreach(get_rows("SHOW TRIGGERS LIKE ".q(addcslashes($h,"%_")))as$d){$b[$d["Trigger"]]=array($d["Timing"],$d["Event"]);}return$b;}function
trigger_options(){return
array("Timing"=>array("BEFORE","AFTER"),"Type"=>array("FOR EACH ROW"),);}function
routine($f,$ua){global$g,$Rb,$zc,$Ba;$Gd=array("bool","boolean","integer","double precision","real","dec","numeric","fixed","national char","national varchar");$Pc="((".implode("|",array_merge(array_keys($Ba),$Gd)).")(?:\\s*\\(((?:[^'\")]*|$Rb)+)\\))?\\s*(zerofill\\s*)?(unsigned(?:\\s+zerofill)?)?)(?:\\s*(?:CHARSET|CHARACTER\\s+SET)\\s*['\"]?([^'\"\\s]+)['\"]?)?";$L="\\s*(".($ua=="FUNCTION"?"":$zc).")?\\s*(?:`((?:[^`]|``)*)`\\s*|\\b(\\S+)\\s+)$Pc";$gb=$g->result("SHOW CREATE $ua ".idf_escape($f),2);preg_match("~\\(((?:$L\\s*,?)*)\\)".($ua=="FUNCTION"?"\\s*RETURNS\\s+$Pc":"")."\\s*(.*)~is",$gb,$m);$q=array();preg_match_all("~$L\\s*,?~is",$m[1],$R,PREG_SET_ORDER);foreach($R
as$ja){$f=str_replace("``","`",$ja[2]).$ja[3];$q[]=array("field"=>$f,"type"=>strtolower($ja[5]),"length"=>preg_replace_callback("~$Rb~s",'normalize_enum',$ja[6]),"unsigned"=>strtolower(preg_replace('~\\s+~',' ',trim("$ja[8] $ja[7]"))),"full_type"=>$ja[4],"inout"=>strtoupper($ja[1]),"collation"=>strtolower($ja[9]),);}if($ua!="FUNCTION"){return
array("fields"=>$q,"definition"=>$m[11]);}return
array("fields"=>$q,"returns"=>array("type"=>$m[12],"length"=>$m[13],"unsigned"=>$m[15],"collation"=>$m[16]),"definition"=>$m[17],"language"=>"SQL",);}function
routines(){return
get_rows("SELECT * FROM information_schema.ROUTINES WHERE ROUTINE_SCHEMA = ".q(DB));}function
routine_languages(){return
array();}function
begin(){return
queries("BEGIN");}function
insert_into($h,$s){return
queries("INSERT INTO ".table($h)." (".implode(", ",array_keys($s)).")\nVALUES (".implode(", ",$s).")");}function
insert_update($h,$s,$tb){foreach($s
as$c=>$a){$s[$c]="$c = $a";}$ba=implode(", ",$s);return
queries("INSERT INTO ".table($h)." SET $ba ON DUPLICATE KEY UPDATE $ba");}function
last_id(){global$g;return$g->result("SELECT LAST_INSERT_ID()");}function
explain($g,$l){return$g->query("EXPLAIN $l");}function
types(){return
array();}function
schemas(){return
array();}function
get_schema(){return"";}function
set_schema($Od){return
true;}function
create_sql($h,$jb){global$g;$b=$g->result("SHOW CREATE TABLE ".table($h),1);if(!$jb){$b=preg_replace('~ AUTO_INCREMENT=\\d+~','',$b);}return$b;}function
truncate_sql($h){return"TRUNCATE ".table($h);}function
use_sql($Xa){return"USE ".idf_escape($Xa);}function
trigger_sql($h,$ub){$b="";foreach(get_rows("SHOW TRIGGERS LIKE ".q(addcslashes($h,"%_")),null,"-- ")as$d){$b.="\n".($ub=='CREATE+ALTER'?"DROP TRIGGER IF EXISTS ".idf_escape($d["Trigger"]).";;\n":"")."CREATE TRIGGER ".idf_escape($d["Trigger"])." $d[Timing] $d[Event] ON ".table($d["Table"])." FOR EACH ROW\n$d[Statement];;\n";}return$b;}function
show_variables(){return
get_key_vals("SHOW VARIABLES");}function
process_list(){return
get_rows("SHOW FULL PROCESSLIST");}function
show_status(){return
get_key_vals("SHOW STATUS");}function
support($Ld){global$g;return!ereg("scheme|sequence|type".($g->server_info<5.1?"|event|partitioning".($g->server_info<5?"|view|routine|trigger":""):""),$Ld);}$la="sql";$Ba=array();$Bc=array();foreach(array('Numbers'=>array("tinyint"=>3,"smallint"=>5,"mediumint"=>8,"int"=>10,"bigint"=>20,"decimal"=>66,"float"=>12,"double"=>21),'Date and time'=>array("date"=>10,"datetime"=>19,"timestamp"=>19,"time"=>10,"year"=>4),'Strings'=>array("char"=>255,"varchar"=>65535,"tinytext"=>255,"text"=>65535,"mediumtext"=>16777215,"longtext"=>4294967295),'Binary'=>array("bit"=>20,"binary"=>255,"varbinary"=>65535,"tinyblob"=>255,"blob"=>65535,"mediumblob"=>16777215,"longblob"=>4294967295),'Lists'=>array("enum"=>65535,"set"=>64),)as$c=>$a){$Ba+=$a;$Bc[$c]=array_keys($a);}$qd=array("unsigned","zerofill","unsigned zerofill");$Jd=array("=","<",">","<=",">=","!=","LIKE","LIKE %%","REGEXP","IN","IS NULL","NOT LIKE","NOT REGEXP","NOT IN","IS NOT NULL","");$ca=array("char_length","date","from_unixtime","hex","lower","round","sec_to_time","time_to_sec","upper");$ud=array("avg","count","count distinct","group_concat","max","min","sum");$hd=array(array("char"=>"md5/sha1/password/encrypt/uuid","binary"=>"md5/sha1/hex","date|time"=>"now",),array("int|float|double|decimal"=>"+/-","date"=>"+ interval/- interval","time"=>"addtime/subtime","char|text"=>"concat",));}define("SERVER",$_GET[DRIVER]);define("DB",$_GET["db"]);define("ME",preg_replace('~^[^?]*/([^?]*).*~','\\1',$_SERVER["REQUEST_URI"]).'?'.(sid()?SID.'&':'').(SERVER!==null?DRIVER."=".urlencode(SERVER).'&':'').(isset($_GET["username"])?"username=".urlencode($_GET["username"]).'&':'').(DB!=""?'db='.urlencode(DB).'&'.(isset($_GET["ns"])?"ns=".urlencode($_GET["ns"])."&":""):''));$Bb="3.3.1";class
Adminer{var$operators=array("<=",">=");var$_values=array();function
name(){return"<a href='http://www.adminer.org/editor/' id='h1'>".'Editor'."</a>";}function
credentials(){return
array(SERVER,$_GET["username"],get_session("pwds"));}function
permanentLogin(){return
password_file();}function
database(){global$g;$ka=get_databases(false);return(!$ka?$g->result("SELECT SUBSTRING_INDEX(CURRENT_USER, '@', 1)"):$ka[(information_schema($ka[0])?1:0)]);}function
headers(){return
true;}function
head(){return
true;}function
loginForm(){echo'<table cellspacing="0">
<tr><th>Username<td><input type="hidden" name="driver" value="server"><input type="hidden" name="server" value=""><input id="username" name="username" value="',h($_GET["username"]),'">
<tr><th>Password<td><input type="password" name="password">
</table>
<script type="text/javascript">
document.getElementById(\'username\').focus();
</script>
',"<p><input type='submit' value='".'Login'."'>\n",checkbox("permanent",1,$_COOKIE["adminer_permanent"],'Permanent login')."\n";}function
login($Sd,$O){global$g;$g->query("SET time_zone = ".q(substr_replace(@date("O"),":",-2,0)));return
true;}function
tableName($Wa){return
h($Wa["Comment"]!=""?$Wa["Comment"]:$Wa["Name"]);}function
fieldName($e,$V=0){return
h($e["comment"]!=""?$e["comment"]:$e["field"]);}function
selectLinks($Wa,$s=""){$r=$Wa["Name"];if(isset($s)){echo'<p class="tabs"><a href="'.h(ME.'edit='.urlencode($r).$s).'">'.'New item'."</a>\n";}echo"<a href='".h(remove_from_uri("page"))."&amp;page=last' title='".'Last page'."'>&gt;&gt;</a>\n";}function
foreignKeys($h){return
foreign_keys($h);}function
backwardKeys($h,$Md){$b=array();foreach(get_rows("SELECT TABLE_NAME, CONSTRAINT_NAME, COLUMN_NAME, REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = ".q($this->database())."
AND REFERENCED_TABLE_SCHEMA = ".q($this->database())."
AND REFERENCED_TABLE_NAME = ".q($h)."
ORDER BY ORDINAL_POSITION",null,"")as$d){$b[$d["TABLE_NAME"]]["keys"][$d["CONSTRAINT_NAME"]][$d["COLUMN_NAME"]]=$d["REFERENCED_COLUMN_NAME"];}foreach($b
as$c=>$a){$f=$this->tableName(table_status($c));if($f!=""){$Oc=preg_quote($Md);$sa="(:|\\s*-)?\\s+";$b[$c]["name"]=(preg_match("(^$Oc$sa(.+)|^(.+?)$sa$Oc\$)iu",$f,$m)?$m[2].$m[3]:$f);}else{unset($b[$c]);}}return$b;}function
backwardKeysPrint($Hd,$d){foreach($Hd
as$h=>$Nc){foreach($Nc["keys"]as$Ca){$t=ME.'select='.urlencode($h);$n=0;foreach($Ca
as$H=>$a){$t.=where_link($n++,$H,$d[$a]);}echo"<a href='".h($t)."'>".h($Nc["name"])."</a>";$t=ME.'edit='.urlencode($h);foreach($Ca
as$H=>$a){$t.="&set".urlencode("[".bracket_escape($H)."]")."=".urlencode($d[$a]);}echo"<a href='".h($t)."' title='".'New item'."'>+</a> ";}}}function
selectQuery($l){return"<!--\n".str_replace("--","--><!-- ",$l)."\n-->\n";}function
rowDescription($h){foreach(fields($h)as$e){if(ereg("varchar|character varying",$e["type"])){return
idf_escape($e["field"]);}}return"";}function
rowDescriptions($w,$Qa){$b=$w;foreach($w[0]as$c=>$a){if(list($h,$z,$f)=$this->_foreignColumn($Qa,$c)){$bc=array();foreach($w
as$d){$bc[$d[$c]]=exact_value($d[$c]);}$Qb=$this->_values[$h];if(!$Qb){$Qb=get_key_vals("SELECT $z, $f FROM ".table($h)." WHERE $z IN (".implode(", ",$bc).")");}foreach($w
as$y=>$d){if(isset($d[$c])){$b[$y][$c]=(string)$Qb[$d[$c]];}}}}return$b;}function
selectVal($a,$t,$e){$b=($a=="<i>NULL</i>"?"&nbsp;":$a);if(ereg('blob|bytea',$e["type"])&&!is_utf8($a)){$b=lang(array('%d byte','%d bytes'),strlen($a));if(ereg("^(GIF|\xFF\xD8\xFF|\x89PNG\x0D\x0A\x1A\x0A)",$a)){$b="<img src='$t' alt='$b'>";}}if(like_bool($e)&&$b!="&nbsp;"){$b='<img src="'.($a?"".h(preg_replace("~\\?.*~","",ME))."?file=plus.gif&amp;version=3.3.1":"".h(preg_replace("~\\?.*~","",ME))."?file=cross.gif&amp;version=3.3.1").'" alt="'.h($a).'">';}if($t){$b="<a href='$t'>$b</a>";}if(!$t&&!like_bool($e)&&ereg('int|float|double|decimal',$e["type"])){$b="<div class='number'>$b</div>";}elseif(ereg('date',$e["type"])){$b="<div class='datetime'>$b</div>";}return$b;}function
editVal($a,$e){if(ereg('date|timestamp',$e["type"])&&isset($a)){return
preg_replace('~^(\\d{2}(\\d+))-(0?(\\d+))-(0?(\\d+))~','$1-$3-$5',$a);}return(ereg("binary",$e["type"])?reset(unpack("H*",$a)):$a);}function
selectColumnsPrint($u,$A){}function
selectSearchPrint($p,$A,$G){$p=(array)$_GET["where"];echo'<fieldset><legend>'.'Search'."</legend><div>\n";$Ib=array();foreach($p
as$c=>$a){$Ib[$a["col"]]=$c;}$n=0;$q=fields($_GET["select"]);foreach($q
as$f=>$e){$ma=$A[$f];if(ereg("enum",$e["type"])&&$ma!=""){$c=$Ib[$f];$n--;echo"<div>".h($ma)."<input type='hidden' name='where[$n][col]' value='".h($f)."'>:",enum_input("checkbox"," name='where[$n][val][]'",$e,(array)$p[$c]["val"],($e["null"]?0:null)),"</div>\n";unset($A[$f]);}}foreach($A
as$f=>$ma){$Z=$this->_foreignKeyOptions($_GET["select"],$f);if(is_array($Z)){if($q[$f]["null"]){$Z[0]='('.'empty'.')';}$c=$Ib[$f];$n--;echo"<div>".h($ma)."<input type='hidden' name='where[$n][col]' value='".h($f)."'><input type='hidden' name='where[$n][op]' value='='>: <select name='where[$n][val]'>".optionlist($Z,$p[$c]["val"],true)."</select></div>\n";unset($A[$f]);}}$n=0;foreach($p
as$a){if(($a["col"]==""||$A[$a["col"]])&&"$a[col]$a[val]"!=""){echo"<div><select name='where[$n][col]'><option value=''>(".'anywhere'.")".optionlist($A,$a["col"],true)."</select>",html_select("where[$n][op]",array(-1=>"")+$this->operators,$a["op"]),"<input name='where[$n][val]' value='".h($a["val"])."'></div>\n";$n++;}}echo"<div><select name='where[$n][col]' onchange='selectAddRow(this);'><option value=''>(".'anywhere'.")".optionlist($A,null,true)."</select>",html_select("where[$n][op]",array(-1=>"")+$this->operators),"<input name='where[$n][val]'></div>\n","</div></fieldset>\n";}function
selectOrderPrint($V,$A,$G){$Nb=array();foreach($G
as$c=>$S){$V=array();foreach($S["columns"]as$a){$V[]=$A[$a];}if(count(array_filter($V,'strlen'))>1&&$c!="PRIMARY"){$Nb[$c]=implode(", ",$V);}}if($Nb){echo'<fieldset><legend>'.'Sort'."</legend><div>","<select name='index_order'>".optionlist(array(""=>"")+$Nb,($_GET["order"][0]!=""?"":$_GET["index_order"]),true)."</select>","</div></fieldset>\n";}if($_GET["order"]){echo"<div style='display: none;'>".hidden_fields(array("order"=>array(1=>reset($_GET["order"])),"desc"=>($_GET["desc"]?array(1=>1):array()),))."</div>\n";}}function
selectLimitPrint($C){echo"<fieldset><legend>".'Limit'."</legend><div>";echo
html_select("limit",array("","30","100"),$C),"</div></fieldset>\n";}function
selectLengthPrint($Pa){}function
selectActionPrint(){echo"<fieldset><legend>".'Action'."</legend><div>","<input type='submit' value='".'Select'."'>","</div></fieldset>\n";}function
selectCommandPrint(){return
true;}function
selectImportPrint(){return
true;}function
selectEmailPrint($sb,$A){if($sb){print_fieldset("email",'E-mail',$_POST["email_append"]);echo"<div onkeydown=\"eventStop(event); return bodyKeydown(event, 'email');\">\n","<p>".'From'.": <input name='email_from' value='".h($_POST?$_POST["email_from"]:$_COOKIE["adminer_email"])."'>\n",'Subject'.": <input name='email_subject' value='".h($_POST["email_subject"])."'>\n","<p><textarea name='email_message' rows='15' cols='75'>".h($_POST["email_message"].($_POST["email_append"]?'{$'."$_POST[email_addition]}":""))."</textarea>\n";echo"<p onkeydown=\"eventStop(event); return bodyKeydown(event, 'email_append');\">".html_select("email_addition",$A,$_POST["email_addition"])."<input type='submit' name='email_append' value='".'Insert'."'>\n";echo"<p>".'Attachments'.": <input type='file' name='email_files[]' onchange=\"this.onchange = function () { }; var el = this.cloneNode(true); el.value = ''; this.parentNode.appendChild(el);\">","<p>".(count($sb)==1?'<input type="hidden" name="email_field" value="'.h(key($sb)).'">':html_select("email_field",$sb)),"<input type='submit' name='email' value='".'Send'."' onclick=\"return this.form['delete'].onclick();\">\n","</div>\n","</div></fieldset>\n";}}function
selectColumnsProcess($A,$G){return
array(array(),array());}function
selectSearchProcess($q,$G){$b=array();foreach((array)$_GET["where"]as$c=>$p){$oa=$p["col"];$Oa=$p["op"];$a=$p["val"];if(($c<0?"":$oa).$a!=""){$Ra=array();foreach(($oa!=""?array($oa=>$q[$oa]):$q)as$f=>$e){if($oa!=""||is_numeric($a)||!ereg('int|float|double|decimal',$e["type"])){$f=idf_escape($f);if($oa!=""&&$e["type"]=="enum"){$Ra[]=(in_array(0,$a)?"$f IS NULL OR ":"")."$f IN (".implode(", ",array_map('intval',$a)).")";}else{$ec=ereg('char|text|enum|set',$e["type"]);$i=$this->processInput($e,(!$Oa&&$ec&&ereg('^[^%]+$',$a)?"%$a%":$a));$Ra[]=$f.($i=="NULL"?" IS".($Oa==">="?" NOT":"")." $i":(in_array($Oa,$this->operators)||$Oa=="="?" $Oa $i":($ec?" LIKE $i":" IN (".str_replace(",","', '",$i).")")));if($c<0&&$a=="0"){$Ra[]="$f IS NULL";}}}}$b[]=($Ra?"(".implode(" OR ",$Ra).")":"0");}}return$b;}function
selectOrderProcess($q,$G){$eb=$_GET["index_order"];if($eb!=""){unset($_GET["order"][1]);}if($_GET["order"]){return
array(idf_escape(reset($_GET["order"])).($_GET["desc"]?" DESC":""));}foreach(($eb!=""?array($G[$eb]):$G)as$S){if($eb!=""||$S["type"]=="INDEX"){$ma=false;foreach($S["columns"]as$a){if(ereg('date|timestamp',$q[$a]["type"])){$ma=true;break;}}$b=array();foreach($S["columns"]as$a){$b[]=idf_escape($a).($ma?" DESC":"");}return$b;}}return
array();}function
selectLimitProcess(){return(isset($_GET["limit"])?$_GET["limit"]:"30");}function
selectLengthProcess(){return"100";}function
selectEmailProcess($p,$Qa){if($_POST["email_append"]){return
true;}if($_POST["email"]){$kc=0;if($_POST["all"]||$_POST["check"]){$e=idf_escape($_POST["email_field"]);$db=$_POST["email_subject"];$X=$_POST["email_message"];preg_match_all('~\\{\\$([a-z0-9_]+)\\}~i',"$db.$X",$R);$w=get_rows("SELECT DISTINCT $e".($R[1]?", ".implode(", ",array_map('idf_escape',array_unique($R[1]))):"")." FROM ".table($_GET["select"])." WHERE $e IS NOT NULL AND $e != ''".($p?" AND ".implode(" AND ",$p):"").($_POST["all"]?"":" AND ((".implode(") OR (",array_map('where_check',(array)$_POST["check"]))."))"));$q=fields($_GET["select"]);foreach($this->rowDescriptions($w,$Qa)as$d){$Xb=array('{\\'=>'{');foreach($R[1]as$a){$Xb['{$'."$a}"]=$this->editVal($d[$a],$q[$a]);}$Fa=$d[$_POST["email_field"]];if(is_mail($Fa)&&send_mail($Fa,strtr($db,$Xb),strtr($X,$Xb),$_POST["email_from"],$_FILES["email_files"])){$kc++;}}}cookie("adminer_email",$_POST["email_from"]);redirect(remove_from_uri(),lang(array('%d e-mail has been sent.','%d e-mails have been sent.'),$kc));}return
false;}function
messageQuery($l){return"<!--\n".str_replace("--","--><!-- ",$l)."\n-->";}function
editFunctions($e){$b=array();if($e["null"]&&ereg('blob',$e["type"])){$b["NULL"]='empty';}$b[""]=($e["null"]||$e["auto_increment"]||like_bool($e)?"":"*");if(ereg('date|time',$e["type"])){$b["now"]='now';}if(eregi('_(md5|sha1)$',$e["field"],$m)){$b[]=strtolower($m[1]);}return$b;}function
editInput($h,$e,$J,$i){if($e["type"]=="enum"){return(isset($_GET["select"])?"<label><input type='radio'$J value='-1' checked><i>".'original'."</i></label> ":"").enum_input("radio",$J,$e,($i||isset($_GET["select"])?$i:0),($e["null"]?"":null));}$Z=$this->_foreignKeyOptions($h,$e["field"],$i);if(isset($Z)){return(is_array($Z)?"<select$J>".optionlist($Z,$i,true)."</select>":"<input value='".h($i)."'$J class='hidden'><input value='".h($Z)."' class='jsonly' onkeyup=\"whisper('".h(ME."script=complete&source=".urlencode($h)."&field=".urlencode($e["field"]))."&value=', this);\"><div onclick='return whisperClick(event, this.previousSibling);'></div>");}if(like_bool($e)){return'<input type="checkbox" value="'.h($i?$i:1).'"'.($i?' checked':'')."$J>";}$Ia="";if(ereg('time',$e["type"])){$Ia='HH:MM:SS';}if(ereg('date|timestamp',$e["type"])){$Ia='[yyyy]-mm-dd'.($Ia?" [$Ia]":"");}if($Ia){return"<input value='".h($i)."'$J> ($Ia)";}if(eregi('_(md5|sha1)$',$e["field"])){return"<input type='password' value='".h($i)."'$J>";}return'';}function
processInput($e,$i,$x=""){if($x=="now"){return"$x()";}$b=$i;if(ereg('date|timestamp',$e["type"])&&preg_match('(^'.str_replace('\\$1','(?P<p1>\\d*)',preg_replace('~(\\\\\\$([2-6]))~','(?P<p\\2>\\d{1,2})',preg_quote('$1-$3-$5'))).'(.*))',$i,$m)){$b=($m["p1"]!=""?$m["p1"]:($m["p2"]!=""?($m["p2"]<70?20:19).$m["p2"]:gmdate("Y")))."-$m[p3]$m[p4]-$m[p5]$m[p6]".end($m);}$b=($e["type"]=="bit"&&ereg('^[0-9]+$',$i)?$b:q($b));if($i==""&&($e["null"]||!ereg('char|text',$e["type"]))&&!like_bool($e)){$b="NULL";}elseif(ereg('^(md5|sha1)$',$x)){$b="$x($b)";}if(ereg("binary",$e["type"])){$b="unhex($b)";}return$b;}function
dumpOutput(){return
array();}function
dumpFormat(){return
array('csv'=>'CSV,','csv;'=>'CSV;','tsv'=>'TSV');}function
dumpTable(){echo"\xef\xbb\xbf";}function
dumpData($h,$ub,$l){global$g;$k=$g->query($l,1);if($k){while($d=$k->fetch_assoc()){if($ub=="table"){dump_csv(array_keys($d));$ub="INSERT";}dump_csv($d);}}}function
dumpHeaders($fb,$Gc=false){$zd="csv";header("Content-Type: text/csv; charset=utf-8");return$zd;}function
homepage(){return
true;}function
navigation($Sa){global$Bb,$ea;echo'<h1>
',$this->name(),' <span class="version">',$Bb,'</span>
<a href="http://www.adminer.org/editor/#download" id="version">',(version_compare($Bb,$_COOKIE["adminer_version"])<0?h($_COOKIE["adminer_version"]):""),'</a>
</h1>
';if($Sa=="auth"){$da=true;foreach((array)$_SESSION["pwds"]["server"][""]as$D=>$O){if(isset($O)){if($da){echo"<p onclick='eventStop(event);'>\n";$da=false;}echo"<a href='".h(auth_url("server","",$D))."'>".($D!=""?h($D):"<i>".'empty'."</i>")."</a><br>\n";}}}else{echo'<form action="" method="post">
<p class="logout">
<input type="submit" name="logout" value="Logout" onclick="eventStop(event);">
<input type="hidden" name="token" value="',$ea,'">
</p>
</form>
';if($Sa!="db"&&$Sa!="ns"){$B=table_status();if(!$B){echo"<p class='message'>".'No tables.'."\n";}else{$this->tablesPrint($B);}}}}function
tablesPrint($ga){echo"<p id='tables'>\n";foreach($ga
as$d){$f=$this->tableName($d);if(isset($d["Engine"])&&$f!=""){echo"<a href='".h(ME).'select='.urlencode($d["Name"])."'".bold($_GET["select"]==$d["Name"]).">$f</a><br>\n";}}}function
_foreignColumn($Qa,$H){foreach((array)$Qa[$H]as$ib){if(count($ib["source"])==1){$f=$this->rowDescription($ib["table"]);if($f!=""){$z=idf_escape($ib["target"][0]);return
array($ib["table"],$z,$f);}}}}function
_foreignKeyOptions($h,$H,$i=null){global$g;if(list($Y,$z,$f)=$this->_foreignColumn(column_foreign_keys($h),$H)){$b=&$this->_values[$Y];if(!isset($b)){$B=table_status($Y);$b=($B["Rows"]>1000?"":array(""=>"")+get_key_vals("SELECT $z, $f FROM ".table($Y)." ORDER BY 2"));}if(!$b&&isset($i)){return$g->result("SELECT $f FROM ".table($Y)." WHERE $z = ".q($i));}return$b;}}}$j=(function_exists('adminer_object')?adminer_object():new
Adminer);function
page_header($jc,$v="",$Va=array(),$ic=""){global$rd,$j,$g,$va;header("Content-Type: text/html; charset=utf-8");if($j->headers()){header("X-Frame-Options: deny");header("X-XSS-Protection: 0");}$hc=$jc.($ic!=""?": ".h($ic):"");$gc=strip_tags($hc.(SERVER!=""&&SERVER!="localhost"?h(" - ".SERVER):"")." - ".$j->name());if(is_ajax()){header("X-AJAX-Title: ".rawurlencode($gc));}else{echo'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en" dir="ltr">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Content-Script-Type" content="text/javascript">
<meta name="robots" content="noindex">
<title>',$gc,'</title>
<link rel="stylesheet" type="text/css" href="',h(preg_replace("~\\?.*~","",ME))."?file=default.css&amp;version=3.3.1",'">
<script type="text/javascript">
var areYouSure = \'Resend POST data?\';
</script>
<script type="text/javascript" src="',h(preg_replace("~\\?.*~","",ME))."?file=functions.js&amp;version=3.3.1",'"></script>
';if($j->head()){echo'<link rel="shortcut icon" type="image/x-icon" href="',h(preg_replace("~\\?.*~","",ME))."?file=favicon.ico&amp;version=3.3.1",'" id="favicon">
';if(file_exists("adminer.css")){echo'<link rel="stylesheet" type="text/css" href="adminer.css">
';}}echo'
<body class="ltr nojs"',($_POST?"":" onclick=\"return bodyClick(event, '".h(js_escape(DB)."', '".js_escape($_GET["ns"]))."');\"");echo' onkeydown="bodyKeydown(event);" onload="bodyLoad(\'',(is_object($g)?substr($g->server_info,0,3):""),'\');',(isset($_COOKIE["adminer_version"])?"":" verifyVersion();");?>">
<script type="text/javascript">
document.body.className = document.body.className.replace(/(^|\s)nojs(\s|$)/, '$1js$2');
</script>

<div id="content">
<?php
}if(isset($Va)){$t=substr(preg_replace('~(username|db|ns)=[^&]*&~','',ME),0,-1);echo'<p id="breadcrumb"><a href="'.h($t?$t:".").'">'.$va[DRIVER].'</a> &raquo; ';$t=substr(preg_replace('~(db|ns)=[^&]*&~','',ME),0,-1);$E=(SERVER!=""?h(SERVER):'Server');if($Va===false){echo"$E\n";}else{echo"<a href='".($t?h($t):".")."' accesskey='1' title='Alt+Shift+1'>$E</a> &raquo; ";if($_GET["ns"]!=""||(DB!=""&&is_array($Va))){echo'<a href="'.h($t."&db=".urlencode(DB).(support("scheme")?"&ns=":"")).'">'.h(DB).'</a> &raquo; ';}if(is_array($Va)){if($_GET["ns"]!=""){echo'<a href="'.h(substr(ME,0,-1)).'">'.h($_GET["ns"]).'</a> &raquo; ';}foreach($Va
as$c=>$a){$ma=(is_array($a)?$a[1]:$a);if($ma!=""){echo'<a href="'.h(ME."$c=").urlencode(is_array($a)?$a[0]:$a).'">'.h($ma).'</a> &raquo; ';}}}echo"$jc\n";}}echo"<span id='loader'></span>\n","<h2>$hc</h2>\n";restart_session();$lc=preg_replace('~^[^?]*~','',$_SERVER["REQUEST_URI"]);$pc=$_SESSION["messages"][$lc];if($pc){echo"<div class='message'>".implode("</div>\n<div class='message'>",$pc)."</div>\n";unset($_SESSION["messages"][$lc]);}$ka=&get_session("dbs");if(DB!=""&&$ka&&!in_array(DB,$ka,true)){$ka=null;}if($v){echo"<div class='error'>$v</div>\n";}define("PAGE_HEADER",1);}function
page_footer($Sa=""){global$j;if(!is_ajax()){echo'</div>

<div id="menu">
';$j->navigation($Sa);echo'</div>
';}}function
int32($y){while($y>=2147483648){$y-=4294967296;}while($y<=-2147483649){$y+=4294967296;}return(int)$y;}function
long2str($o,$Lb){$xa='';foreach($o
as$a){$xa.=pack('V',$a);}if($Lb){return
substr($xa,0,end($o));}return$xa;}function
str2long($xa,$Lb){$o=array_values(unpack('V*',str_pad($xa,4*ceil(strlen($xa)/4),"\0")));if($Lb){$o[]=strlen($xa);}return$o;}function
xxtea_mx($N,$Q,$U,$W){return
int32((($N>>5&0x7FFFFFF)^$Q<<2)+(($Q>>3&0x1FFFFFFF)^$N<<4))^int32(($U^$Q)+($W^$N));}function
encrypt_string($Ua,$c){if($Ua==""){return"";}$c=array_values(unpack("V*",pack("H*",md5($c))));$o=str2long($Ua,true);$y=count($o)-1;$N=$o[$y];$Q=$o[0];$Db=floor(6+52/($y+1));$U=0;while($Db-->0){$U=int32($U+0x9E3779B9);$Na=$U>>2&3;for($P=0;$P<$y;$P++){$Q=$o[$P+1];$ya=xxtea_mx($N,$Q,$U,$c[$P&3^$Na]);$N=int32($o[$P]+$ya);$o[$P]=$N;}$Q=$o[0];$ya=xxtea_mx($N,$Q,$U,$c[$P&3^$Na]);$N=int32($o[$y]+$ya);$o[$y]=$N;}return
long2str($o,false);}function
decrypt_string($Ua,$c){if($Ua==""){return"";}$c=array_values(unpack("V*",pack("H*",md5($c))));$o=str2long($Ua,false);$y=count($o)-1;$N=$o[$y];$Q=$o[0];$Db=floor(6+52/($y+1));$U=int32($Db*0x9E3779B9);while($U){$Na=$U>>2&3;for($P=$y;$P>0;$P--){$N=$o[$P-1];$ya=xxtea_mx($N,$Q,$U,$c[$P&3^$Na]);$Q=int32($o[$P]-$ya);$o[$P]=$Q;}$N=$o[$y];$ya=xxtea_mx($N,$Q,$U,$c[$P&3^$Na]);$Q=int32($o[0]-$ya);$o[0]=$Q;$U=int32($U-0x9E3779B9);}return
long2str($o,true);}$g='';$ea=$_SESSION["token"];if(!$_SESSION["token"]){$_SESSION["token"]=rand(1,1e6);}$wa=array();if($_COOKIE["adminer_permanent"]){foreach(explode(" ",$_COOKIE["adminer_permanent"])as$a){list($c)=explode(":",$a);$wa[$c]=$a;}}if(isset($_POST["server"])){session_regenerate_id();$_SESSION["pwds"][$_POST["driver"]][$_POST["server"]][$_POST["username"]]=$_POST["password"];if($_POST["permanent"]){$c=base64_encode($_POST["driver"])."-".base64_encode($_POST["server"])."-".base64_encode($_POST["username"]);$zb=$j->permanentLogin();$wa[$c]="$c:".base64_encode($zb?encrypt_string($_POST["password"],$zb):"");cookie("adminer_permanent",implode(" ",$wa));}if(count($_POST)==($_POST["permanent"]?5:4)||DRIVER!=$_POST["driver"]||SERVER!=$_POST["server"]||$_GET["username"]!==$_POST["username"]){redirect(auth_url($_POST["driver"],$_POST["server"],$_POST["username"]));}}elseif($_POST["logout"]){if($ea&&$_POST["token"]!=$ea){page_header('Logout','Invalid CSRF token. Send the form again.');page_footer("db");exit;}else{foreach(array("pwds","dbs","queries")as$c){set_session($c,null);}$c=base64_encode(DRIVER)."-".base64_encode(SERVER)."-".base64_encode($_GET["username"]);if($wa[$c]){unset($wa[$c]);cookie("adminer_permanent",implode(" ",$wa));}redirect(substr(preg_replace('~(username|db|ns)=[^&]*&~','',ME),0,-1),'Logout successful.');}}elseif($wa&&!$_SESSION["pwds"]){session_regenerate_id();$zb=$j->permanentLogin();foreach($wa
as$c=>$a){list(,$bd)=explode(":",$a);list($wb,$E,$D)=array_map('base64_decode',explode("-",$c));$_SESSION["pwds"][$wb][$E][$D]=decrypt_string(base64_decode($bd),$zb);}}function
auth_error($qc=null){global$g,$j,$ea;$xb=session_name();$v="";if(!$_COOKIE[$xb]&&$_GET[$xb]&&ini_bool("session.use_only_cookies")){$v='Session support must be enabled.';}elseif(isset($_GET["username"])){if(($_COOKIE[$xb]||$_GET[$xb])&&!$ea){$v='Session expired, please login again.';}else{$O=&get_session("pwds");if(isset($O)){$v=h($qc?$qc->getMessage():(is_string($g)?$g:'Invalid credentials.'));$O=null;}}}page_header('Login',$v,null);echo"<form action='' method='post' onclick='eventStop(event);'>\n";$j->loginForm();echo"<div>";hidden_fields($_POST,array("driver","server","username","password","permanent"));echo"</div>\n","</form>\n";page_footer("auth");}if(isset($_GET["username"])){if(!class_exists("Min_DB")){unset($_SESSION["pwds"][DRIVER]);page_header('No extension',sprintf('None of the supported PHP extensions (%s) are available.',implode(", ",$fd)),false);page_footer("auth");exit;}$g=connect();}if(is_string($g)||!$j->login($_GET["username"],get_session("pwds"))){auth_error();exit;}$ea=$_SESSION["token"];if(isset($_POST["server"])&&$_POST["token"]){$_POST["token"]=$ea;}$v=($_POST?($_POST["token"]==$ea?"":'Invalid CSRF token. Send the form again.'):($_SERVER["REQUEST_METHOD"]!="POST"?"":sprintf('Too big POST data. Reduce the data or increase the %s configuration directive.','"post_max_size"')));$g->select_db($j->database());function
email_header($Wc){return"=?UTF-8?B?".base64_encode($Wc)."?=";}function
send_mail($Fa,$db,$X,$Ha="",$nb=array()){$K=(strncasecmp(PHP_OS,"win",3)?"\n":"\r\n");$X=str_replace("\n",$K,wordwrap(str_replace("\r","","$X\n")));$pb=uniqid("boundary");$ob="";foreach((array)$nb["error"]as$c=>$a){if(!$a){$ob.="--$pb$K"."Content-Type: ".str_replace("\n","",$nb["type"][$c]).$K."Content-Disposition: attachment; filename=\"".preg_replace('~["\\n]~','',$nb["name"][$c])."\"$K"."Content-Transfer-Encoding: base64$K$K".chunk_split(base64_encode(file_get_contents($nb["tmp_name"][$c])),76,$K).$K;}}$Mc="";$mb="Content-Type: text/plain; charset=utf-8$K"."Content-Transfer-Encoding: 8bit";if($ob){$ob.="--$pb--$K";$Mc="--$pb$K$mb$K$K";$mb="Content-Type: multipart/mixed; boundary=\"$pb\"";}$mb.=$K."MIME-Version: 1.0$K"."X-Mailer: Adminer Editor".($Ha?$K."From: ".str_replace("\n","",$Ha):"");return
mail($Fa,email_header($db),$Mc.$X.$ob,$mb);}function
like_bool($e){return
ereg("bool|(tinyint|bit)\\(1\\)",$e["full_type"]);}session_cache_limiter("");if(!ini_bool("session.use_cookies")||@ini_set("session.use_cookies",false)!==false){session_write_close();}$_b=array("RESTRICT","CASCADE","SET NULL","NO ACTION");$va[DRIVER]='Login';if(isset($_GET["select"])&&($_POST["edit"]||$_POST["clone"])&&!$_POST["save"]){$_GET["edit"]=$_GET["select"];}if(isset($_GET["download"])){$r=$_GET["download"];header("Content-Type: application/octet-stream");header("Content-Disposition: attachment; filename=".friendly_url("$r-".implode("_",$_GET["where"])).".".friendly_url($_GET["field"]));echo$g->result("SELECT".limit(idf_escape($_GET["field"])." FROM ".table($r)," WHERE ".where($_GET),1));exit;}elseif(isset($_GET["edit"])){$r=$_GET["edit"];$p=(isset($_GET["select"])?(count($_POST["check"])==1?where_check($_POST["check"][0]):""):where($_GET));$ba=(isset($_GET["select"])?$_POST["edit"]:$p);$q=fields($r);foreach($q
as$f=>$e){if(!isset($e["privileges"][$ba?"update":"insert"])||$j->fieldName($e)==""){unset($q[$f]);}}if($_POST&&!$v&&!isset($_GET["select"])){$I=$_POST["referer"];if($_POST["insert"]){$I=($ba?null:$_SERVER["REQUEST_URI"]);}elseif(!ereg('^.+&select=.+$',$I)){$I=ME."select=".urlencode($r);}if(isset($_POST["delete"])){query_redirect("DELETE".limit1("FROM ".table($r)," WHERE $p"),$I,'Item has been deleted.');}else{$s=array();foreach($q
as$f=>$e){$a=process_input($e);if($a!==false&&$a!==null){$s[idf_escape($f)]=($ba?"\n".idf_escape($f)." = $a":$a);}}if($ba){if(!$s){redirect($I);}query_redirect("UPDATE".limit1(table($r)." SET".implode(",",$s),"\nWHERE $p"),$I,'Item has been updated.');}else{$k=insert_into($r,$s);$Lc=($k?last_id():0);queries_redirect($I,sprintf('Item%s has been inserted.',($Lc?" $Lc":"")),$k);}}}$La=$j->tableName(table_status($r));page_header(($ba?'Edit':'Insert'),$v,array("select"=>array($r,$La)),$La);$d=null;if($_POST["save"]){$d=(array)$_POST["fields"];}elseif($p){$u=array();foreach($q
as$f=>$e){if(isset($e["privileges"]["select"])){$u[]=($_POST["clone"]&&$e["auto_increment"]?"'' AS ":(ereg("enum|set",$e["type"])?"1*".idf_escape($f)." AS ":"")).idf_escape($f);}}$d=array();if($u){$w=get_rows("SELECT".limit(implode(", ",$u)." FROM ".table($r)," WHERE $p",(isset($_GET["select"])?2:1)));$d=(isset($_GET["select"])&&count($w)!=1?null:reset($w));}}echo'
<form action="" method="post" enctype="multipart/form-data" id="form">
';if($q){echo"<table cellspacing='0' onkeydown='return editingKeydown(event);'>\n";foreach($q
as$f=>$e){echo"<tr><th>".$j->fieldName($e);$Ic=$_GET["set"][bracket_escape($f)];$i=(isset($d)?($d[$f]!=""&&ereg("enum|set",$e["type"])?(is_array($d[$f])?array_sum($d[$f]):+$d[$f]):$d[$f]):(!$ba&&$e["auto_increment"]?"":(isset($_GET["select"])?false:(isset($Ic)?$Ic:$e["default"]))));if(!$_POST["save"]&&is_string($i)){$i=$j->editVal($i,$e);}$x=($_POST["save"]?(string)$_POST["function"][$f]:($ba&&$e["on_update"]=="CURRENT_TIMESTAMP"?"now":($i===false?null:(isset($i)?'':'NULL'))));if($e["type"]=="timestamp"&&$i=="CURRENT_TIMESTAMP"){$i="";$x="now";}input($e,$i,$x);echo"\n";}echo"</table>\n";}echo'<p>
';if($q){echo"<input type='submit' value='".'Save'."'>\n";if(!isset($_GET["select"])){echo"<input type='submit' name='insert' value='".($ba?'Save and continue edit':'Save and insert next')."' title='Ctrl+Shift+Enter'>\n";}}echo($ba?"<input type='submit' name='delete' value='".'Delete'."' onclick=\"return confirm('".'Are you sure?'."');\">\n":($_POST||!$q?"":"<script type='text/javascript'>document.getElementById('form').getElementsByTagName('td')[1].firstChild.focus();</script>\n"));if(isset($_GET["select"])){hidden_fields(array("check"=>(array)$_POST["check"],"clone"=>$_POST["clone"],"all"=>$_POST["all"]));}echo'<input type="hidden" name="referer" value="',h(isset($_POST["referer"])?$_POST["referer"]:$_SERVER["HTTP_REFERER"]),'">
<input type="hidden" name="save" value="1">
<input type="hidden" name="token" value="',$ea,'">
</form>
';}elseif(isset($_GET["select"])){$r=$_GET["select"];$B=table_status($r);$G=indexes($r);$q=fields($r);$Ka=column_foreign_keys($r);if($B["Oid"]=="t"){$G[]=array("type"=>"PRIMARY","columns"=>array("oid"));}parse_str($_COOKIE["adminer_import"],$rb);$Jc=array();$A=array();$Pa=null;foreach($q
as$c=>$e){$f=$j->fieldName($e);if(isset($e["privileges"]["select"])&&$f!=""){$A[$c]=html_entity_decode(strip_tags($f));if(ereg('text|lob',$e["type"])){$Pa=$j->selectLengthProcess();}}$Jc+=$e["privileges"];}list($u,$M)=$j->selectColumnsProcess($A,$G);$p=$j->selectSearchProcess($q,$G);$V=$j->selectOrderProcess($q,$G);$C=$j->selectLimitProcess();$Ha=($u?implode(", ",$u):($B["Oid"]=="t"?"oid, ":"")."*")."\nFROM ".table($r);$Mb=($M&&count($M)<count($u)?"\nGROUP BY ".implode(", ",$M):"").($V?"\nORDER BY ".implode(", ",$V):"");if($_GET["val"]&&is_ajax()){header("Content-Type: text/plain; charset=utf-8");foreach($_GET["val"]as$ia=>$d){echo$g->result("SELECT".limit(idf_escape(key($d))." FROM ".table($r)," WHERE ".where_check($ia).($p?" AND ".implode(" AND ",$p):"").($V?" ORDER BY ".implode(", ",$V):""),1));}exit;}if($_POST&&!$v){$Tc="(".implode(") OR (",array_map('where_check',(array)$_POST["check"])).")";$tb=$Ja=null;foreach($G
as$S){if($S["type"]=="PRIMARY"){$tb=array_flip($S["columns"]);$Ja=($u?$tb:array());break;}}foreach((array)$Ja
as$c=>$a){if(in_array(idf_escape($c),$u)){unset($Ja[$c]);}}if($_POST["export"]){cookie("adminer_import","output=".urlencode($_POST["output"])."&format=".urlencode($_POST["format"]));dump_headers($r);$j->dumpTable($r,"");if(!is_array($_POST["check"])||$Ja===array()){$Ga=$p;if(is_array($_POST["check"])){$Ga[]="($Tc)";}$l="SELECT $Ha".($Ga?"\nWHERE ".implode(" AND ",$Ga):"").$Mb;}else{$wc=array();foreach($_POST["check"]as$a){$wc[]="(SELECT".limit($Ha,"\nWHERE ".($p?implode(" AND ",$p)." AND ":"").where_check($a).$Mb,1).")";}$l=implode(" UNION ALL ",$wc);}$j->dumpData($r,"table",$l);exit;}if(!$j->selectEmailProcess($p,$Ka)){if($_POST["save"]||$_POST["delete"]){$k=true;$qa=0;$l=table($r);$s=array();if(!$_POST["delete"]){foreach($A
as$f=>$a){$a=process_input($q[$f]);if($a!==null){if($_POST["clone"]){$s[idf_escape($f)]=($a!==false?$a:idf_escape($f));}elseif($a!==false){$s[]=idf_escape($f)." = $a";}}}$l.=($_POST["clone"]?" (".implode(", ",array_keys($s)).")\nSELECT ".implode(", ",$s)."\nFROM ".table($r):" SET\n".implode(",\n",$s));}if($_POST["delete"]||$s){$vb="UPDATE";if($_POST["delete"]){$vb="DELETE";$l="FROM $l";}if($_POST["clone"]){$vb="INSERT";$l="INTO $l";}if($_POST["all"]||($Ja===array()&&$_POST["check"])||count($M)<count($u)){$k=queries($vb." $l".($_POST["all"]?($p?"\nWHERE ".implode(" AND ",$p):""):"\nWHERE $Tc"));$qa=$g->affected_rows;}else{foreach((array)$_POST["check"]as$a){$k=queries($vb.limit1($l,"\nWHERE ".where_check($a)));if(!$k){break;}$qa+=$g->affected_rows;}}}queries_redirect(remove_from_uri("page"),lang(array('%d item has been affected.','%d items have been affected.'),$qa),$k);}elseif(!$_POST["import"]){if(!$_POST["val"]){$v='Double click on a value to modify it.';}else{$k=true;$qa=0;foreach($_POST["val"]as$ia=>$d){$s=array();foreach($d
as$c=>$a){$c=bracket_escape($c,1);$s[]=idf_escape($c)." = ".(ereg('char|text',$q[$c]["type"])||$a!=""?$j->processInput($q[$c],$a):"NULL");}$l=table($r)." SET ".implode(", ",$s);$Ga=" WHERE ".where_check($ia).($p?" AND ".implode(" AND ",$p):"");$k=queries("UPDATE".(count($M)<count($u)?" $l$Ga":limit1($l,$Ga)));if(!$k){break;}$qa+=$g->affected_rows;}queries_redirect(remove_from_uri(),lang(array('%d item has been affected.','%d items have been affected.'),$qa),$k);}}elseif(is_string($T=get_file("csv_file",true))){cookie("adminer_import","output=".urlencode($rb["output"])."&format=".urlencode($_POST["separator"]));$k=true;$Ca=array_keys($q);preg_match_all('~(?>"[^"]*"|[^"\\r\\n]+)+~',$T,$R);$qa=count($R[0]);begin();$sa=($_POST["separator"]=="csv"?",":($_POST["separator"]=="tsv"?"\t":";"));foreach($R[0]as$c=>$a){preg_match_all("~((\"[^\"]*\")+|[^$sa]*)$sa~",$a.$sa,$Pb);if(!$c&&!array_diff($Pb[1],$Ca)){$Ca=$Pb[1];$qa--;}else{$s=array();foreach($Pb[1]as$n=>$oa){$s[idf_escape($Ca[$n])]=($oa==""&&$q[$Ca[$n]]["null"]?"NULL":q(str_replace('""','"',preg_replace('~^"|"$~','',$oa))));}$k=insert_update($r,$s,$tb);if(!$k){break;}}}if($k){queries("COMMIT");}queries_redirect(remove_from_uri("page"),lang(array('%d row has been imported.','%d rows have been imported.'),$qa),$k);queries("ROLLBACK");}else{$v=upload_error($T);}}}$La=$j->tableName($B);page_header('Select'.": $La",$v);session_write_close();$s=null;if(isset($Jc["insert"])){$s="";foreach((array)$_GET["where"]as$a){if(count($Ka[$a["col"]])==1&&($a["op"]=="="||(!$a["op"]&&!ereg('[_%]',$a["val"])))){$s.="&set".urlencode("[".bracket_escape($a["col"])."]")."=".urlencode($a["val"]);}}}$j->selectLinks($B,$s);if(!$A){echo"<p class='error'>".'Unable to select the table'.($q?".":": ".error())."\n";}else{echo"<form action='' id='form'>\n","<div style='display: none;'>";hidden_fields_get();echo(DB!=""?'<input type="hidden" name="db" value="'.h(DB).'">'.(isset($_GET["ns"])?'<input type="hidden" name="ns" value="'.h($_GET["ns"]).'">':""):"");echo'<input type="hidden" name="select" value="'.h($r).'">',"</div>\n";$j->selectColumnsPrint($u,$A);$j->selectSearchPrint($p,$A,$G);$j->selectOrderPrint($V,$A,$G);$j->selectLimitPrint($C);$j->selectLengthPrint($Pa);$j->selectActionPrint();echo"</form>\n";$_=$_GET["page"];if($_=="last"){$fa=$g->result("SELECT COUNT(*) FROM ".table($r).($p?" WHERE ".implode(" AND ",$p):""));$_=floor(max(0,$fa-1)/$C);}$l="SELECT".limit((+$C&&$M&&count($M)<count($u)&&$la=="sql"?"SQL_CALC_FOUND_ROWS ":"").$Ha,($p?"\nWHERE ".implode(" AND ",$p):"").$Mb,($C!=""?+$C:null),($_?$C*$_:0),"\n");echo$j->selectQuery($l);$k=$g->query($l);if(!$k){echo"<p class='error'>".error()."\n";}else{if($la=="mssql"){$k->seek($C*$_);}$Ab=array();echo"<form action='' method='post' enctype='multipart/form-data'>\n";$w=array();while($d=$k->fetch_assoc()){if($_&&$la=="oracle"){unset($d["RNUM"]);}$w[]=$d;}if($_GET["page"]!="last"){$fa=(+$C&&$M&&count($M)<count($u)?($la=="sql"?$g->result(" SELECT FOUND_ROWS()"):$g->result("SELECT COUNT(*) FROM ($l) x")):count($w));}if(!$w){echo"<p class='message'>".'No rows.'."\n";}else{$Vb=$j->backwardKeys($r,$La);echo"<table cellspacing='0' class='nowrap' onclick='tableClick(event);' onkeydown='return editingKeydown(event);'>\n","<thead><tr>".(!$M&&$u?"":"<td><input type='checkbox' id='all-page' onclick='formCheck(this, /check/);'> <a href='".h($_GET["modify"]?remove_from_uri("modify"):$_SERVER["REQUEST_URI"]."&modify=1")."'>".'edit'."</a>");$ac=array();$ca=array();reset($u);$uc=1;foreach($w[0]as$c=>$a){if($B["Oid"]!="t"||$c!="oid"){$a=$_GET["columns"][key($u)];$e=$q[$u?($a?$a["col"]:current($u)):$c];$f=($e?$j->fieldName($e,$uc):"*");if($f!=""){$uc++;$ac[$c]=$f;$H=idf_escape($c);echo'<th><a href="'.h(remove_from_uri('(order|desc)[^=]*|page').'&order%5B0%5D='.urlencode($c).($V[0]==$H||$V[0]==$c||(!$V&&count($M)<count($u)&&$M[0]==$H)?'&desc%5B0%5D=1':'')).'">'.(!$u||$a?apply_sql_function($a["fun"],$f):h(current($u)))."</a>";}$ca[$c]=$a["fun"];next($u);}}$Ub=array();if($_GET["modify"]){foreach($w
as$d){foreach($d
as$c=>$a){$Ub[$c]=max($Ub[$c],min(40,strlen(utf8_decode($a))));}}}echo($Vb?"<th>".'Relations':"")."</thead>\n";foreach($j->rowDescriptions($w,$Ka)as$y=>$d){$Eb=unique_array($w[$y],$G);$ia="";foreach($Eb
as$c=>$a){$ia.="&".(isset($a)?urlencode("where[".bracket_escape($c)."]")."=".urlencode($a):"null%5B%5D=".urlencode($c));}echo"<tr".odd().">".(!$M&&$u?"":"<td>".checkbox("check[]",substr($ia,1),in_array(substr($ia,1),(array)$_POST["check"]),"","this.form['all'].checked = false; formUncheck('all-page');").(count($M)<count($u)||information_schema(DB)?"":" <a href='".h(ME."edit=".urlencode($r).$ia)."'>".'edit'."</a>"));foreach($d
as$c=>$a){if(isset($ac[$c])){$e=$q[$c];if($a!=""&&(!isset($Ab[$c])||$Ab[$c]!="")){$Ab[$c]=(is_mail($a)?$ac[$c]:"");}$t="";$a=$j->editVal($a,$e);if(!isset($a)){$a="<i>NULL</i>";}else{if(ereg('blob|bytea|raw|file',$e["type"])&&$a!=""){$t=h(ME.'download='.urlencode($r).'&field='.urlencode($c).$ia);}if($a===""){$a="&nbsp;";}elseif($Pa!=""&&ereg('text|blob',$e["type"])&&is_utf8($a)){$a=shorten_utf8($a,max(0,+$Pa));}else{$a=h($a);}if(!$t){foreach((array)$Ka[$c]as$na){if(count($Ka[$c])==1||end($na["source"])==$c){$t="";foreach($na["source"]as$n=>$Zb){$t.=where_link($n,$na["target"][$n],$w[$y][$Zb]);}$t=h(($na["db"]!=""?preg_replace('~([?&]db=)[^&]+~','\\1'.urlencode($na["db"]),ME):ME).'select='.urlencode($na["table"]).$t);if(count($na["source"])==1){break;}}}}if($c=="COUNT(*)"){$t=h(ME."select=".urlencode($r));$n=0;foreach((array)$_GET["where"]as$o){if(!array_key_exists($o["col"],$Eb)){$t.=h(where_link($n++,$o["col"],$o["val"],$o["op"]));}}foreach($Eb
as$W=>$o){$t.=h(where_link($n++,$W,$o));}}}if(!$t){if(is_mail($a)){$t="mailto:$a";}if($_c=is_url($d[$c])){$t=($_c=="http"&&$cb?$d[$c]:"$_c://www.adminer.org/redirect/?url=".urlencode($d[$c]));}}$z=h("val[$ia][".bracket_escape($c)."]");$i=$_POST["val"][$ia][bracket_escape($c)];$Ec=h(isset($i)?$i:$d[$c]);$Yc=strpos($a,"<i>...</i>");$Cc=is_utf8($a)&&$w[$y][$c]==$d[$c]&&!$ca[$c];$Ac=ereg('text|lob',$e["type"]);echo(($_GET["modify"]&&$Cc)||isset($i)?"<td>".($Ac?"<textarea name='$z' cols='30' rows='".(substr_count($d[$c],"\n")+1)."'>$Ec</textarea>":"<input name='$z' value='$Ec' size='$Ub[$c]'>"):"<td id='$z' ondblclick=\"".($Cc?"selectDblClick(this, event".($Yc?", 2":($Ac?", 1":"")).")":"alert('".h('Use edit link to modify this value.')."')").";\">".$j->selectVal($a,$t,$e));}}if($Vb){echo"<td>";}$j->backwardKeysPrint($Vb,$w[$y]);echo"</tr>\n";}echo"</table>\n";}if($w||$_){$Gb=true;if($_GET["page"]!="last"&&+$C&&count($M)>=count($u)&&($fa>=$C||$_)){$fa=$B["Rows"];if(!isset($fa)||$p||($B["Engine"]=="InnoDB"&&$fa<max(1e4,2*($_+1)*$C))){ob_flush();flush();$fa=$g->result("SELECT COUNT(*) FROM ".table($r).($p?" WHERE ".implode(" AND ",$p):""));}else{$Gb=false;}}echo"<p class='pages'>";if(+$C&&$fa>$C){$Kb=floor(($fa-1)/$C);echo'<a href="'.h(remove_from_uri("page"))."\" onclick=\"pageClick(this.href, +prompt('".'Page'."', '".($_+1)."'), event); return false;\">".'Page'."</a>:",pagination(0,$_).($_>5?" ...":"");for($n=max(1,$_-4);$n<min($Kb,$_+5);$n++){echo
pagination($n,$_);}echo($_+5<$Kb?" ...":"").($Gb?pagination($Kb,$_):' <a href="'.h(remove_from_uri()."&page=last").'">'.'last'."</a>");}echo" (".($Gb?"":"~ ").lang(array('%d row','%d rows'),$fa).") ".checkbox("all",1,0,'whole result')."\n";if($j->selectCommandPrint()){?>
<fieldset><legend>Edit</legend><div>
<input type="submit" value="Save" title="Double click on a value to modify it." class="jsonly">
<input type="submit" name="edit" value="Edit">
<input type="submit" name="clone" value="Clone">
<input type="submit" name="delete" value="Delete" onclick="return confirm('Are you sure? (' + (this.form['all'].checked ? <?php echo$fa,' : formChecked(this, /check/)) + \')\');">
</div></fieldset>
';}print_fieldset("export",'Export');$_a=$j->dumpOutput();echo($_a?html_select("output",$_a,$rb["output"])." ":""),html_select("format",$j->dumpFormat(),$rb["format"])," <input type='submit' name='export' value='".'Export'."' onclick='eventStop(event);'>\n","</div></fieldset>\n";}if($j->selectImportPrint()){print_fieldset("import",'Import',!$w);echo"<input type='file' name='csv_file'> ",html_select("separator",array("csv"=>"CSV,","csv;"=>"CSV;","tsv"=>"TSV"),$rb["format"],1);echo" <input type='submit' name='import' value='".'Import'."'>","<input type='hidden' name='token' value='$ea'>\n","</div></fieldset>\n";}$j->selectEmailPrint(array_filter($Ab,'strlen'),$A);echo"</form>\n";}}}elseif(isset($_GET["script"])){if(list($h,$z,$f)=$j->_foreignColumn(column_foreign_keys($_GET["source"]),$_GET["field"])){$k=$g->query("SELECT $z, $f FROM ".table($h)." WHERE ".(ereg('^[0-9]+$',$_GET["value"])?"$z = $_GET[value] OR ":"")."$f LIKE ".q("$_GET[value]%")." ORDER BY 2 LIMIT 11");for($n=0;$n<10&&($d=$k->fetch_row());$n++){echo"<a href='".h(ME."edit=".urlencode($h)."&where".urlencode("[".bracket_escape(idf_unescape($z))."]")."=".urlencode($d[0]))."'>".h($d[1])."</a><br>\n";}if($n==10){echo"...\n";}}exit;}else{page_header('Server',"",false);if($j->homepage()){echo"<form action='' method='post'>\n","<p>".'Search data in tables'.": <input name='query' value='".h($_POST["query"])."'> <input type='submit' value='".'Search'."'>\n";if($_POST["query"]!=""){search_tables();}echo"<table cellspacing='0' class='nowrap' onclick='tableClick(event);'>\n",'<thead><tr class="wrap"><td><input id="check-all" type="checkbox" onclick="formCheck(this, /^tables\[/);"><th>'.'Table'.'<td>'.'Rows'."</thead>\n";foreach(table_status()as$h=>$d){$f=$j->tableName($d);if(isset($d["Engine"])&&$f!=""){echo'<tr'.odd().'><td>'.checkbox("tables[]",$h,in_array($h,(array)$_POST["tables"],true),"","formUncheck('check-all');"),"<th><a href='".h(ME).'select='.urlencode($h)."'>$f</a>";$a=number_format($d["Rows"],0,'.',',');echo"<td align='right'><a href='".h(ME."edit=").urlencode($h)."'>".($d["Engine"]=="InnoDB"&&$a?"~ $a":$a)."</a>";}}echo"</table>\n","</form>\n";}}page_footer();
#!/usr/bin/perl -T

require '../_basics.cgi';

formRead("get");

use cgi;

if ($sequence eq '') {
  if ($p ne '') {
    $sequence = $p;
  } else {
    $query = new CGI;
    $sequence = $query->cookie('p');
  }
}

if ($u eq '') {
  $query = new CGI;
  $r = $query->cookie('rememberme');
  if($r eq '1'){
    $u = $query->cookie('user_id');
  }
}

print ("Content-Type: text/html; charset=UTF-8\n\n");

my $dbh = connectDB();

my $sth = $dbh->prepare(qq{
    SELECT SQL_CALC_FOUND_ROWS text,$date_format,users.Id,username,score,DATE_FORMAT(comments.date_created,'%e %b %Y at %H:%i UTC') 
    FROM comments,users 
    WHERE page_id=? AND type=0 AND score>-3 AND users.Id=comments.user_id 
    ORDER BY comments.date_created DESC
});

$sth->execute($page_id);

while (my ($text,$date_created,$found_user_id,$username,$score,$date_full) = $sth->fetchrow_array()) {

  if ($found_user_id==$u){
  	$showusername='me';
	} else {
  	$showusername=$username;
  }

#add response links (highlight most recent comment or something) - but only if user's comments still show here (go through output & regexp)
#otherwise link to user's comments page
	
  $comments .= qq~
      <li>
        <p>$text</p>
      	<p class="details"><span class="user-name user-$username" rel="$username">$showusername</span>, <span title="$date_full">$date_created</span></p>
    	</li>
  ~;
}

my $sth = $dbh->prepare(qq{
    SELECT FOUND_ROWS();
});

$sth->execute();

my $count = $sth->fetchrow_array();

if ($count>0) {
  $count = OOOcomma($count);
  $count_string = "(<span>$count</span>)";
}

# ******************************************************************************

print qq~
  <h4>Comments <span id="comments_count">$count_string</span></h4>
  <div id="comments_form" class="focusable">
    <form action="${root}_cgi/_common/_comments_save.cgi" method="post">
      <fieldset>
        <textarea name="text" class="focus_handle prompt_add_comment" id="new_comment">Add your comment here</textarea>
    		<input type="hidden" name="page_id" value="$page_id" />
    		<input type="hidden" name="p" />
    		<input type="hidden" name="user_id" value="$u" class="user-id" />
 		    <input type="submit" value="Submit" onmousedown="NB.page.add_comment();" onclick="return false;" />
      </fieldset>
    </form>
	</div>
  <ul id="comments_list" class="focusable">
    $comments
  </ul>
~;

# ******************************************************************************

$sth->finish();
$dbh->disconnect();

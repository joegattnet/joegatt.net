#!/usr/bin/perl -T

require '../basics.pl';

$ulinks = 0;

formRead("get");

if ($p eq '') {
  if ($p ne '') {
    $p = $p;
  } else {
    $query = new CGI;
    $p = $query->cookie('p');
  }
}

if ($u eq '') {
  $query = new CGI;
  $r = $query->cookie('rememberme');
  if($r eq '1'){
    $u = $query->cookie('user_id');
  }
}

my $dbh = connectDB();

my $sth = $dbh->prepare(qq{
    SELECT SQL_CALC_FOUND_ROWS text,users.Id,username,score,DATE_FORMAT(comments.date_created,'%Y-%m-%dT%H:%i:%sZ'),DATE_FORMAT(comments.date_created,'%e %b %Y at %H:%i UTC') 
    FROM comments,users 
    WHERE page_id=? AND type=0 AND score>-3 AND users.Id=comments.user_id 
    ORDER BY comments.date_created DESC
});

$sth->execute($page_id);

my $sth2 = $dbh->prepare(qq{
    SELECT FOUND_ROWS();
});
$sth2->execute();
my $count = $sth2->fetchrow_array();

$order = $count;
while (my ($text,$found_user_id,$username,$score,$date_iso8601,$date_full) = $sth->fetchrow_array()) {

  if ($ulinks){
  	$usernameString = qq~<a href="/users/$found_user_id" class="user-name" rel="$username">$username</a>~;
	} else {
  	$usernameString = qq~<span class="user-name" data-username="$username">$username</span>~;
  }
	
  $comments .= qq~
      <li>
        <p>$text</p>
      	<p class="details"><span class="order">$order</span> $usernameString, <time class="timeago" datetime="$date_iso8601">$date_full</time></p>
    	</li>
  ~;
  $order--;
}

$new_order = $count + 1;

# ******************************************************************************

if ($count>0) {
  $count = OOOcomma($count);
  $count_string = "(<span>$count</span>)";
}

$output .= qq~
  <h4>Comments <span id="comments_count">$count_string</span></h4>
  <div id="comments_form" class="focusable">
    <form action="/_etc/exe/common/comments_save.pl" method="post">
      <fieldset>
        <textarea name="text" class="focus_handle prompt_add_comment" id="new_comment">Add your comment here</textarea>
    		<input type="hidden" name="page_id" value="$page_id">
    		<input type="hidden" name="url">
    		<input type="hidden" name="b">
    		<input type="hidden" name="p">
    		<input type="hidden" name="new_order" value="$new_order">
    		<input type="hidden" name="user_id" value="$u">
 		    <input type="submit" value="Submit" onmousedown="NB.Comments.add();" onclick="return false;">
      </fieldset>
    </form>
	</div>
  <ul id="comments_list">
    $comments
  </ul>
~;

$sth->finish();
$sth2->finish();
$dbh->disconnect();

# ******************************************************************************

cache_output("../../cache/common--comments-$ENV{\"QUERY_STRING\"}.html",$output);

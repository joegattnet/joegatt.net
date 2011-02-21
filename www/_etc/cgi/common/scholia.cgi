#!/usr/bin/perl -T

require '../basics.cgi';

$ulinks = 0;

formRead("get");

my $dbh = connectDB();

my $sth = $dbh->prepare(qq{
    SELECT text,DATE_FORMAT(comments.date_created,'%Y-%m-%dT%H:%i:%sZ'),users.Id,username,score,unique_id,DATE_FORMAT(comments.date_created,'%e %b %Y at %H:%i UTC') 
    FROM comments,users 
    WHERE score>-3 AND type=1 AND book_id=? AND users.Id=comments.user_id AND page_id=? AND p=? 
    ORDER BY comments.date_created DESC
});

$sth->execute($b,$page_id,$p);

while (my (@details) = $sth->fetchrow_array()) {
	push (@scholia, \@details);
}

$counter = 0;
$found = $#scholia+1;

if ($found>0){
  $foundtext = " ($found)";
}

if ($editable eq 'true' or $found>0) {
  $output .= qq~
    <h5><a class="panel_handle" href="javascript:;">Scholia</a></h5>
      <ul class="tool panel_body">
  ~;
}

# ******************************************************************************

if ($editable eq 'true') {

#  This goes client-side to avoid having to cache for each user
#  if ($found>0 and $scholia[$counter][2]==$u){
#    $text = $scholia[0][0];
#  	$unique_id = $scholia[0][5];
#  	$focused = " focused";
#  	$counter++;
#  } else {
  	$unique_id = int(rand(100000000));
#  }

  if ($text eq '') {
    $text = "Add a note about the paragraph you are editing";
  }

  $output .= qq~
  			<li class="focusable$focused" id="scholia_form">
          <form action="${root}_etc/cgi/common/scholia_save.cgi" method="post">
            <fieldset>
              <textarea name="text" class="focus_handle prompt_add_comment" onchange="NB.Comments.scholia.save();" id="new_scholia">$text</textarea>
          		<input type="hidden" name="p" value="$p" />
          		<input type="hidden" name="book_id" value="$b" />
          		<input type="hidden" name="page_id" value="$page_id" />
          		<input type="hidden" name="type" value="1" />
          		<input type="hidden" name="paragraph_id" value="$paragraph_id" />
          		<input type="hidden" name="user_id" value="$u" />
          		<input type="hidden" name="unique_id" value="$unique_id" />
 		          <input type="submit" value="Save" onmousedown="NB.Comments.scholia.save();" onclick="return false;"  value="Save" style="display:none;" />
            </fieldset>
          </form>
  			</li>
  ~;
}

# ******************************************************************************

while ($found>0 and $counter<=$#scholia){
  $text = "$scholia[$counter][0]";
	$date_iso8601 = $scholia[$counter][1];
	$found_user_id = $scholia[$counter][2];
	$score = $scholia[$counter][4];
	$date_full = $scholia[$counter][6];
	  
	$username = $scholia[$counter][3];

  if ($ulinks){
  	$usernameString = qq~<a href="/users/$found_user_id" class="user-name" rel="$username">$username</a>~;
	} else {
  	$usernameString = qq~<span class="user-name" rel="$username">$username</span>~;
  }

  if ($counter == 0){
  	$isFirst = ' id="scholia_first"';
  } else {
  	$isFirst = '';
	}

# NEXTREL       	<p class="details"><a href="${root}users.shtml?u=$found_user_id" title="$score">$username</a>, <span title="$date_full">$date_created</span></p>
  $output .= qq~
      <li$isFirst>
        <p>$text</p>
      	<p class="details">$usernameString, <abbr class="timeago" title="$date_iso8601">$date_full</abbr></p>
    	</li>
  ~;
	 $counter++;
}

# later we need to do previous/next and get full number

if ($editable eq 'true' or $found>0) {
  $output .= qq~
     </ul>
  ~;
}

$sth->finish();
$dbh->disconnect();

# ******************************************************************************

cache_output("../../cache/common--scholia-$ENV{\"QUERY_STRING\"}.html",$output);

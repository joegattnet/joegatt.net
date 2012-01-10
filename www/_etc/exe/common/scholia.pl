#!/usr/bin/perl -T

require '../basics.pl';

$ulinks = 0;

formRead("get");

my $dbh = connectDB();

my $sth = $dbh->prepare(qq{
    SELECT text,DATE_FORMAT(comments.date_created,'%Y-%m-%dT%H:%i:%sZ'),users.Id,username,score,DATE_FORMAT(comments.date_created,'%e %b %Y at %H:%i UTC') 
    FROM comments,users 
    WHERE score>-3 AND type=1 AND book_id=? AND users.Id=comments.user_id AND p=? 
    ORDER BY comments.date_created DESC
});

$sth->execute($b,$p);

while (my (@details) = $sth->fetchrow_array()) {
	push (@scholia, \@details);
}

$counter = 0;
$found = $#scholia+1;

if ($found > 0){
  $count = OOOcomma($found);
} else {
  $count = '0';
}
  $count_string = "(<span>$count</span>)";

$output .= qq~
  <h5><a class="panel_handle" href="javascript:;">Scholia <span id="scholia_count">$count_string</span></a></h5>
  <div class="tool panel_body">
~;

# ******************************************************************************

$output .= qq~
	<div class="focusable$focused" id="scholia_form">
    <form action="${root}_etc/exe/common/scholia_save.pl" method="post">
      <fieldset>
        <textarea name="text" class="focus_handle prompt_add_comment" id="new_scholia" placeholder="Add a note about the paragraph you are editing">$text</textarea>
    		<input type="hidden" name="p" value="$p" />
    		<input type="hidden" name="book_id" value="$b" />
    		<input type="hidden" name="page_id" value="$page_id" />
    		<input type="hidden" name="type" value="1" />
    		<input type="hidden" name="paragraph_id" value="$paragraph_id" />
    		<input type="hidden" name="user_id" value="$u" />
        <input type="submit" value="Save" onclick="return false;"  value="Save" style="display:none;" />
      </fieldset>
    </form>
	</div>
	<ul id="scholia_list">
~;

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
  	$usernameString = qq~<span class="user-name" data-username="$username">$username</span>~;
  }

  $output .= qq~
      <li>
        <p>$text</p>
      	<p class="details">$usernameString, <time class="timeago" datetime="$date_iso8601">$date_full</time></p>
    	</li>
  ~;
	 $counter++;
}

$output .= qq~
    </ul>
   </div>
~;


$dbh->disconnect();

# ******************************************************************************

cache_output("../../cache/common--scholia-$ENV{\"QUERY_STRING\"}.html",$output);

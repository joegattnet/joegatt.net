#!/usr/bin/perl -T

require '../_basics.cgi';

formRead("get");

if ($sequence eq '') {
  if ($p ne '') {
    $sequence = $p;
  } else {
    $query = new CGI;
    $sequence = $query->cookie('p');
  }
}

#if ($u eq '') {
#  $query = new CGI;
#  $r = $query->cookie('rememberme');
#  if($r eq '1'){
#    $u = $query->cookie('user_id');
#  }
#}

if ($sequence eq '') {
  $sequence = 1;
}

print ("Content-Type: text/html; charset=UTF-8\n\n");

my $dbh = connectDB();

# later change this to prefer scholia from users with a high aggregate score

my $sth = $dbh->prepare(qq{
    SELECT text,$date_format,users.Id,username,score,unique_id,DATE_FORMAT(comments.date_created,'%e %b %Y at %H:%i UTC') 
    FROM comments,users 
    WHERE score>-3 AND type=1 AND book_id=? AND users.Id=comments.user_id AND page_id=? AND sequence=? 
    ORDER BY comments.date_created DESC
});

$sth->execute($b,$page_id,$sequence);

while (my (@details) = $sth->fetchrow_array()) {
	push (@scholia, \@details);
}

$counter = 0;
$found = $#scholia+1;

if ($found>0){
  $foundtext = " ($found)";
}

if ($editable eq 'true' or $found>0) {
  print qq~
    <li id="scholia_handle" class="header"><a href="javascript:;">Scholia$foundtext</a></li>
    <li id="scholia">
      <ul>
  ~;
}

# ******************************************************************************

if ($editable eq 'true') {

  if ($found>0 and $scholia[$counter][2]==$u){
    $text = $scholia[0][0];
  	$unique_id = $scholia[0][5];
  	$focused = " focused";
  	$counter++;
  } else {
  	$unique_id = int(rand(100000000));
  }
  
  print qq~
  			<li class="focusable$focused">
          <form action="${root}_cgi/_common/_scholia_save.cgi" method="post">
            <fieldset>
              <textarea name="text" class="focus_handle prompt_add_comment" onchange="NB.Scholia.save(this);" id="new_scholia">$text</textarea>
          		<input type="hidden" name="sequence" value="$sequence" />
          		<input type="hidden" name="book_id" value="$b" />
          		<input type="hidden" name="page_id" value="$page_id" />
          		<input type="hidden" name="type" value="1" />
          		<input type="hidden" name="paragraph_id" value="$paragraph_id" />
          		<input type="hidden" name="user_id" value="$u" class="user-id" />
          		<input type="hidden" name="unique_id" value="$unique_id" />
 		          <input type="submit" value="Save" onclick="return false;"  value="Save" style="display:none;" />
            </fieldset>
          </form>
  			</li>
  ~;

}

# ******************************************************************************

while ($found>0 and $counter<=$#scholia){

  $text = "$scholia[$counter][0]";
	$date_created = $scholia[$counter][1];
	$found_user_id = $scholia[$counter][2];
	$score = $scholia[$counter][4];
	$date_full = $scholia[$counter][6];
	  
	$username = $scholia[$counter][3];
  if ($found_user_id==$u){
  	$showusername = 'me';
  } else {
		$showusername = $username;
	}

# NEXTREL       	<p class="details"><a href="${root}users.shtml?u=$found_user_id" title="$score">$username</a>, <span title="$date_full">$date_created</span></p>
  print qq~
      <li>
        <p>$text</p>
      	<p class="details"><span class="user-name user-$username" rel="$username">$showusername</span>, <span title="$date_full">$date_created</span></p>
    	</li>
  ~;

	 $counter++;

}

# later we need to do previous/next and get full number

if ($editable eq 'true' or $found>0) {
  print qq~
      </ul>
    </li>
  ~;
}

$sth->finish();
$dbh->disconnect();

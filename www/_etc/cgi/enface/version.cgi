#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");

my $dbh = connectDB();

$sth = $dbh->prepare(qq{
    SELECT target_text.text AS target,$date_format_target_text,DATE_FORMAT(target_text.date_created,'%e %b %Y at %H:%i UTC'),target_text.Id,score,users.Id,username 
    FROM target_text,users 
    WHERE target_text.p=? AND target_text.version=? AND users.Id=target_text.user_id AND target_text.book_id=? 
    LIMIT 1
});

$sth->execute($p, $version, $b);

while (my ($target,$date_string,$date,$target_id,$score,$u,$user_name) = $sth->fetchrow_array()) {

    $versions_info .= "NB.versions['p$target_id'] = [$u,'$user_name',$score,'$date_string','$date',$version,false];\n";

	 	$output .= qq~
        <script type="text/javascript">
        //<![CDATA[
            var target_element = NB.Enface.get_target($p);
//            if($direction==1&&\$('#tool_diffversions').hasClass('on')){
//              \$(target_element).text(NB.String.diff.diffString(NB.String.strip(target_element.innerHTML.replace(/<del>.*?<\\/del>/g,''),"$target"));
//            }else{
              \$(target_element).text("$target");
//            }
            $versions_info
            NB.Versions.display('$target_id');
            \$(target_element).animate({color: NB.S.color.version_loaded},500);
        //]]>
        </script>
		~;
}

$sth->finish();
$dbh->disconnect();

# ******************************************************************************

cache_output("../../cache/enface--version-$ENV{\"QUERY_STRING\"}.html",$output);

#!/usr/bin/perl -T

require '../_basics.cgi';

formRead("get");

print ("Content-Type: text/html; charset=UTF-8\n\n");

my $dbh = connectDB();

$sth = $dbh->prepare(qq{
    SELECT target_text.text AS target,$date_format_target_text,DATE_FORMAT(target_text.date_created,'%e %b %Y at %H:%i UTC'),target_text.Id,score,users.Id,username 
    FROM target_text,users 
    WHERE target_text.sequence=? AND target_text.version=? AND users.Id=target_text.user_id AND target_text.book_id=?
});

$sth->execute($sequence, $version, $b);

while (my ($target,$date_string,$date,$target_id,$score,$u,$user_name) = $sth->fetchrow_array()) {

$versions_info .= "NB.W.versions.info[$target_id] = [$u,'$user_name',$score,'$date_string','$date',$version,false];\n";

	 	print qq~
        <script type="text/javascript">
        //<![CDATA[
            var target_element = NB.W.Paragraphs.get_target_element_from_sequence($sequence);
//            if($direction==1&&\$('tool_diffversions').hasClassName('on')){
//              target_element.update(NB.Diff.diffString(target_element.innerHTML.replace(/<del>.*?<\\/del>/g,'').stripTags(),"$target"));
//            }else{
              target_element.update("$target");
//            }
            $versions_info
            NB.W.versions.display($target_id);
            target_element.morph('color:'+NB.SETTINGS.color.version_loaded,{duration:0.5});
        //]]>
        </script>
		~;
}

$sth->finish();
$dbh->disconnect();

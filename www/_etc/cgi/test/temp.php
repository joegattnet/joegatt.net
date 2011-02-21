print ("Content-Type: text/html; charset=UTF-8\n\n");

print "Ehe!<hr>";

use Digest::MD5 qw(md5 md5_hex md5_base64);

$test .= "access_token=142214389156795|2.5I03kvKErVraxOfKam_HxQ__.3600.1286139600-787443975|ORkx_bHeVesbg89KwlxItkko_-o";

$test .= "base_domain=joegatt.org";
$test .= "expires=1286139600";
$test .= "secret=gYxTnr0H_iKqhl_ss_q1nA__";
$test .= "session_key=2.5I03kvKErVraxOfKam_HxQ__.3600.1286139600-787443975";
$test .= "uid=787443975";

$test .= "";

$result = md5_hex($test);
$sig = "8808f9aba617451a1942a8163085e568";

print "$result<br/>";

print "$sig<br/><br/><br/>";

print $result eq $sig;

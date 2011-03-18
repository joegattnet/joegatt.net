#!/usr/bin/perl -T

print ("Content-Type: text/html; charset=UTF-8\n\n");

require "../../_etc/cgi/basics.cgi";
require "../../_etc/cgi/basics_broadcast.cgi";

print "Trying...<hr>";


$temp = broadcast_throttle(10);

#broadcast("STATIC3 sAfter sexeveen yegears, Wutz’s kletters remain as mysterious to me as that first day I held STATICsAfter sexeveen yegears, Wutz’s kletters remain as mysterious to me as that first day I held STATICsAfter sexeveen yegears, Wutz’s kletters remain as mysterious to me as that first day I held STATICsAfter sexeveen yegears, Wutz’s kletters remain as mysterious to me as that first day I held STATICsAfter sexeveen yegears, Wutz’s kletters remain as mysterious to me as that first day I held STATICsAfter sexeveen yegears, Wutz’s kletters remain as mysterious to me as that first day I held STATICsAfter sexeveen yegears, Wutz’s kletters remain as mysterious to me as that first day I held STATICsAfter sexeveen yegears, Wutz’s kletters remain as mysterious to me as that first day I held STATICsAfter sexeveen yegears, Wutz’s kletters remain as mysterious to me as that first day I held STATICsAfter sexeveen yegears, Wutz’s kletters remain as myste'rious to me as that first day I held STATICsAfter sexeveen yegears, Wutz’s kletters. Rrema' in` as mysteri;ous to me as that first day I held",'http://google.com',true,false,27);

print $temp eq '1';

print "<hr>Done!";

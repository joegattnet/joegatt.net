#!/usr/bin/perl -T

#This will only run on live
#We could change directory in the cron job first (tried but failed)
#Also, remember that $server is null since we're not running this through Apache
#- Move to cron folder
# cd /var/www/joegatt-net/production/www../../_etc/cgi _cron_broadcast.cgi
#require 'basics.cgi';
#require 'basics_broadcast.cgi';

require '/var/www/joegatt-net/production/www../../_etc/cgi/basics.cgi';
require '/var/www/joegatt-net/production/www../../_etc/cgi/basics_broadcast.cgi';

broadcast_transmit();

<?
/**
  * Config
  *   Defaults are probably good enough for you, but tune
  *   it as you like
  * 
  * Before you start: Make sure you have file called 'sitemap.cache' in the same folder as the sitemap.xml file 
  * and make sure the webserver is able to write to it. CHMOD 666 will do in most cases.
  */

$SITEMAPXML     = "../../../sitemap.xml";			// Where can we find your Sitemap.xml file (string)
$CACHEFILE	= "/_etc/cache/php-common--xml2html-refresh=" . $_GET["refresh"] . ".html";			// Where to store a cached version of our html sitemap (string)
$FETCHHTMLTITLE = TRUE;					// Get <TITLE> tags from each page (boolean)
$MINPRIORITY    = 0.5;					// Minimum priority (float: 0.00 - 1.00)
$MAXPAGES       = 9999;					// How many pages to list in the sitemap (int)
$MAXKEEPCACHE	= (24 * 3600);				// Howmany seconds to keep cache file (int)

/**
  * XML2HTML 
  * Version: 1.01
  * File: sitemap.php
  * Last modified: Thu Sep 17 11:57:08 CEST 2009
  *
  *
  * COPYRIGHT NOTICE
  * Copyright 2006-2009 freesitemapgenerator.com
  *
  * This XML2HTML code may be used and modified free of charge by anyone so long as
  * this copyright notice and the link back to freesitemapgenerator.com remain intact.
  * By using this code you agree to indemnify FreeSitemapGenerator
  * from any liability that might arise from it's use.
  *
  * Selling the code for this program without prior written consent is
  * expressly forbidden.
  *
  * Obtain permission before redistributing this software over the Internet or
  * in any other medium. In all cases copyright and header must remain intact.
  * This Copyright is in full effect in any country that has International
  * Trade Agreements with the United States of America or with
  * the European Union.
  *
  * This program is provided AS IS and we cannot guarantee anything. If it works for
  * you great, if not please delete it and get on with your life.
  *
  */




/**
  *     DO NOT EDIT BELOW
  * =================================================
  */

function fsg_compare_url($ar1, $ar2)
{
  return strcmp($ar1["loc"] , $ar2["loc"]);
}

function fsg_fetch_html_title($s_url)
{
  $html = "";

  $fp = @fopen($s_url, "r");
  if (!$fp)
  {
    return "";
  }

  $abort = false;
  while (!$abort && !feof($fp))
  {
    $buf = fread($fp, 512);
    
    $html .= $buf;

    if (strpos(strtolower($html), "</title"))
    {
      $abort = true;
    }

  }
  fclose($fp);

  $html_low = strtolower($html);
  $p = strpos($html_low, "<title");
  if ($p >= 0)
  {
    $title = substr($html_low, $p, $p+1000);

    $p = strpos($title, ">");
    if ($p > 0)
    {
      $title = substr($title, $p+1);
      $p = strpos($title, "<");
      if ($p > 0)
      {
        $title = substr($title, 0, $p);

        return $title;
      }

    }
  }
  return "";
}

function fsg_output_item($ar_url, $s_base)
{
  global $MINPRIORITY;
  global $FETCHHTMLTITLE;

  if ($ar_url)
  {
    if (!array_key_exists('priority', $ar_url) || $ar_url["priority"] > $MINPRIORITY)
    {
      if ($FETCHHTMLTITLE)
      {
        if (strstr($ar_url["loc"] , $_SERVER["PHP_SELF"]))
        {
          $title = $_SERVER["PHP_SELF"];
        }else{
          $title = fsg_fetch_html_title($ar_url["loc"]);
          if ($title == "")
          {
            $title = "No document title";
          }
        }
      }
      else
      {
        $title =  str_replace($s_base, "", $ar_url["loc"]);

        if ($title == "")
        {
          $title = "Homepage";
        }
      }
      return "<li><a href=\"" . $ar_url["loc"] . "\">" . $title . "</a>\n";
    }
  }
  return "";
}


/**
  * End of functions
  * Start of main code
  */
if ($_SERVER["HTTP_USER_AGENT"] != "")
{
  if (!@file_exists($CACHEFILE) || (time() - filemtime($CACHEFILE)) > $MAXKEEPCACHE || filesize($CACHEFILE) < 10 || ($_GET && $_GET["update"] == "now") )
  {
    /**
      * No cache, create a new sitemap now
      */

    if (!file_exists($SITEMAPXML))
    {
      echo "Cannot find file $SITEMAPXML!";
      die();
    }

    $fp = @fopen($SITEMAPXML, "rb");
    $xmldata = "";
    
    if ($fp)
    {
      while (!feof($fp))
      {
        $xmldata .= fread($fp, 4096);
      }
      fclose($fp);
    }
    else
    {
      echo "Failed to open " . $SITEMAPXML;
      die();
    }
    
    
    $dtags = explode("<" , $xmldata);


    $urls = array();

    foreach($dtags AS $dtag)
    {

      if ($dtag)
      {
        $nv = explode(">", $dtag, 2);

        switch($nv[0] )
        {
        case "url":
          $urlid=sizeof($urls);
          $urls[$urlid] = array("id"=>$urlid);
          break;

        case "loc":
          $urls[$urlid][$nv[0]] = trim($nv[1]);
          break;

        case "priority":
          $urls[$urlid][$nv[0]] = trim($nv[1]);
          break;

        case "changefreq":
          $urls[$urlid][$nv[0]] = trim($nv[1]);
          break;

        default:
          break;
        }
      }
    }

    $urls = array_slice($urls, 0, $MAXPAGES);

    /* Sort on url */
    usort($urls, "fsg_compare_url");


    $dpth = 0;
    $base=$urls[0]["loc"];
    $baselen = strlen($base) - 1;

    echo "Generating sitemap, please wait ...<br>\n";
    for($i=0;$i<sizeof($urls);$i++)
    {
      echo "|";
    }
    echo "<BR>\n";
    
    flush();
    flush();
    flush();
    

    $out = "\n\n\n<!-- Start of generated sitemap -->\n\n";
    
    $out .= "\t<h2>Sitemap</h2>\n";



    foreach($urls AS $url)
    {
      $path = substr($url["loc"], $baselen);

      while(substr($path,-1,1) == "/")
      {
        $path = substr($path,0,-1);
      }

      $dirar=(explode("/",$path));
      $dirs = sizeof($dirar) ;

      $thisbase = $base;

      if ($dirs > 0)
      {
        for($i=0;$i<($dirs-1);$i++)
        {
          if ($dirar[$i])
          {
            $thisbase .= $dirar[$i] . "/";
          }
        }
      }

      while ($dpth < $dirs)
      {
        $out .= "\t\t<ul>\n";
        $dpth ++;
      }

      $out .= "\t\t\t" . fsg_output_item($url, $thisbase);

      while ($dpth > $dirs)
      {
        $out .= "\t\t</ul>\n";
        $dpth --;
      }
      
      
      echo "|";
      flush();
      flush();
      flush();

    }

    while ($dpth != 0)
    {
      $out .= "\t\t</ul>\n";
      $dpth --;
    }
    
    
    
    $out .= "\n<!-- End of generated sitemap -->\n\n";
    
    /**
      * Write output to cache file
      */
    $fp = @fopen($CACHEFILE, "w");
    if (!$fp)
    {
      /**
        * Error !
        */
      echo "<HR>";
      echo "<B><EM>XML2HTML Error: Couldn't write to " . $CACHEFILE . "!<br>Please make sure the webserver can write to this file (touch ". $CACHEFILE . "; chmod 666 ".$CACHEFILE.")</EM></B>";
      echo "<HR>";
    }
    else
    {
      fwrite($fp, $out, strlen($out));
      fclose($fp);
    }
  }
  else
  {
    /**
      * Cache file exists
      */

    $out = "";
    $fp = fopen($CACHEFILE, "rb");
    
    while (!feof($fp))
    {
      $out .= fread($fp, 4096);
    }
    
    fclose($fp);
    
  }
}
else
{
  /**
    * Call without user agent, probably us :)
    */
  $out = "";
}

/** 
  * Output
  *
  * You must leave the 'generated by' message as it is; See copyright notice above
  */
echo $out."<br><br><hr><small>Generated by: <a href=\"http://www.freesitemapgenerator.com/\">Free Siteap Generator.com XML 2 HTML</a></small><hr><br><br>\n";


/**
  * Done || EOF
  */
?>

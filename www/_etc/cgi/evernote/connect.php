<?php

require_once("autoload.php");

require_once("Thrift.php");
require_once("transport/TTransport.php");
require_once("transport/THttpClient.php");
require_once("protocol/TProtocol.php");
require_once("protocol/TBinaryProtocol.php");

require_once("packages/Errors/Errors_types.php");
require_once("packages/Types/Types_types.php");
require_once("packages/UserStore/UserStore.php");
require_once("packages/UserStore/UserStore_constants.php");
require_once("packages/NoteStore/NoteStore.php");

require_once("imagelocation.php");

$evernoteHost = "www.evernote.com";
$evernotePort = "443";
$evernoteScheme = "https";

$userStoreHttpClient =
  new THttpClient($evernoteHost, $evernotePort, "/edam/user", $evernoteScheme);
$userStoreProtocol = new TBinaryProtocol($userStoreHttpClient);
$userStore = new UserStoreClient($userStoreProtocol, $userStoreProtocol);

// Connect to the service and check the protocol version
$versionOK =
  $userStore->checkVersion("PHP EDAMTest",
			   $GLOBALS['UserStore_CONSTANTS']['EDAM_VERSION_MAJOR'],
			   $GLOBALS['UserStore_CONSTANTS']['EDAM_VERSION_MINOR']);
#print "Is my EDAM protocol version up to date?  " . $versionOK . "\n\n";
if ($versionOK == 0) {
  echo "ERROR: Version not OK!\n";
  exit(1);
}

// Authenticate the user *******************************************************

try {
  $authResult = $userStore->authenticate(EVERNOTE_USERNAME, EVERNOTE_PASSWORD, EVERNOTE_CONSUMER_KEY, EVERNOTE_CONSUMER_SECRET);
} catch (edam_error_EDAMUserException $e) {
  // See http://www.evernote.com/about/developer/api/ref/UserStore.html#Fn_UserStore_authenticate
  $parameter = $e->parameter;
  $errorCode = $e->errorCode;
  $errorText = edam_error_EDAMErrorCode::$__names[$errorCode];

  echo "ERROR: Authentication failed (parameter: $parameter errorCode: $errorText)!";

  if ($errorCode == $GLOBALS['edam_error_E_EDAMErrorCode']['INVALID_AUTH']) {
    if ($parameter == "consumerKey") {
      if (EVERNOTE_CONSUMER_KEY == "en-edamtest") {
        echo "You must replace \EVERNOTE_CONSUMER_KEY and \EVERNOTE_CONSUMER_SECRET with the values you received from Evernote\n";
      } else {
        echo "Your consumer key was not accepted by $evernoteHost\n";
      }
      echo "If you do not have an API Key from Evernote, you can request one from http://www.evernote.com/about/developer/api\n";
    } else if ($parameter == "username") {
      echo "You must authenticate using a username and password from $evernoteHost\n";
      if ($evernoteHost != "www.evernote.com") {
        echo "Note that your production Evernote account will not work on $evernoteHost,\n" .
             "you must register for a separate test account at https://$evernoteHost/Registration.action\n";
      }
    } else if ($parameter == "password") {
      echo "The password that you entered is incorrect!\n";
    }
  }

  echo "\n";
  exit(1);
}

?>
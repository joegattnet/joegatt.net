<?php
/**
 * Autogenerated by Thrift
 *
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
 */
include_once $GLOBALS['THRIFT_ROOT'].'/packages/Limits/Limits_types.php';

$GLOBALS['Limits_CONSTANTS'] = array();

$GLOBALS['Limits_CONSTANTS']['EDAM_ATTRIBUTE_LEN_MIN'] = 1;

$GLOBALS['Limits_CONSTANTS']['EDAM_ATTRIBUTE_LEN_MAX'] = 4096;

$GLOBALS['Limits_CONSTANTS']['EDAM_ATTRIBUTE_REGEX'] = "^[^\\p{Cc}\\p{Zl}\\p{Zp}]{1,4096}\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_ATTRIBUTE_LIST_MAX'] = 100;

$GLOBALS['Limits_CONSTANTS']['EDAM_ATTRIBUTE_MAP_MAX'] = 100;

$GLOBALS['Limits_CONSTANTS']['EDAM_GUID_LEN_MIN'] = 36;

$GLOBALS['Limits_CONSTANTS']['EDAM_GUID_LEN_MAX'] = 36;

$GLOBALS['Limits_CONSTANTS']['EDAM_GUID_REGEX'] = "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_EMAIL_LEN_MIN'] = 6;

$GLOBALS['Limits_CONSTANTS']['EDAM_EMAIL_LEN_MAX'] = 255;

$GLOBALS['Limits_CONSTANTS']['EDAM_EMAIL_LOCAL_REGEX'] = "^[A-Za-z0-9!#\$%&'*+/=?^_`{|}~-]+(\\.[A-Za-z0-9!#\$%&'*+/=?^_`{|}~-]+)*\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_EMAIL_DOMAIN_REGEX'] = "^[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*\\.([A-Za-z]{2,})\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_EMAIL_REGEX'] = "^[A-Za-z0-9!#\$%&'*+/=?^_`{|}~-]+(\\.[A-Za-z0-9!#\$%&'*+/=?^_`{|}~-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*\\.([A-Za-z]{2,})\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_TIMEZONE_LEN_MIN'] = 1;

$GLOBALS['Limits_CONSTANTS']['EDAM_TIMEZONE_LEN_MAX'] = 32;

$GLOBALS['Limits_CONSTANTS']['EDAM_TIMEZONE_REGEX'] = "^([A-Za-z_-]+(/[A-Za-z_-]+)*)|(GMT(-|\\+)[0-9]{1,2}(:[0-9]{2})?)\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_MIME_LEN_MIN'] = 3;

$GLOBALS['Limits_CONSTANTS']['EDAM_MIME_LEN_MAX'] = 255;

$GLOBALS['Limits_CONSTANTS']['EDAM_MIME_REGEX'] = "^[A-Za-z]+/[A-Za-z0-9._+-]+\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_MIME_TYPE_GIF'] = "image/gif";

$GLOBALS['Limits_CONSTANTS']['EDAM_MIME_TYPE_JPEG'] = "image/jpeg";

$GLOBALS['Limits_CONSTANTS']['EDAM_MIME_TYPE_PNG'] = "image/png";

$GLOBALS['Limits_CONSTANTS']['EDAM_MIME_TYPE_WAV'] = "audio/wav";

$GLOBALS['Limits_CONSTANTS']['EDAM_MIME_TYPE_MP3'] = "audio/mpeg";

$GLOBALS['Limits_CONSTANTS']['EDAM_MIME_TYPE_AMR'] = "audio/amr";

$GLOBALS['Limits_CONSTANTS']['EDAM_MIME_TYPE_MP4_VIDEO'] = "video/mp4";

$GLOBALS['Limits_CONSTANTS']['EDAM_MIME_TYPE_INK'] = "application/vnd.evernote.ink";

$GLOBALS['Limits_CONSTANTS']['EDAM_MIME_TYPE_PDF'] = "application/pdf";

$GLOBALS['Limits_CONSTANTS']['EDAM_MIME_TYPE_DEFAULT'] = "application/octet-stream";

$GLOBALS['Limits_CONSTANTS']['EDAM_MIME_TYPES'] = array(
  "image/gif" => true,
  "image/jpeg" => true,
  "image/png" => true,
  "audio/wav" => true,
  "audio/mpeg" => true,
  "audio/amr" => true,
  "application/vnd.evernote.ink" => true,
  "application/pdf" => true,
  "video/mp4" => true,
);

$GLOBALS['Limits_CONSTANTS']['EDAM_COMMERCE_SERVICE_GOOGLE'] = "Google";

$GLOBALS['Limits_CONSTANTS']['EDAM_COMMERCE_SERVICE_PAYPAL'] = "Paypal";

$GLOBALS['Limits_CONSTANTS']['EDAM_COMMERCE_SERVICE_GIFT'] = "Gift";

$GLOBALS['Limits_CONSTANTS']['EDAM_COMMERCE_SERVICE_TRIALPAY'] = "TrialPay";

$GLOBALS['Limits_CONSTANTS']['EDAM_COMMERCE_SERVICE_TRIAL'] = "Trial";

$GLOBALS['Limits_CONSTANTS']['EDAM_COMMERCE_SERVICE_GROUP'] = "Group";

$GLOBALS['Limits_CONSTANTS']['EDAM_COMMERCE_SERVICE_CYBERSOURCE'] = "CYBERSRC";

$GLOBALS['Limits_CONSTANTS']['EDAM_COMMERCE_DEFAULT_CURRENCY_COUNTRY_CODE'] = "USD";

$GLOBALS['Limits_CONSTANTS']['EDAM_SEARCH_QUERY_LEN_MIN'] = 0;

$GLOBALS['Limits_CONSTANTS']['EDAM_SEARCH_QUERY_LEN_MAX'] = 1024;

$GLOBALS['Limits_CONSTANTS']['EDAM_SEARCH_QUERY_REGEX'] = "^[^\\p{Cc}\\p{Zl}\\p{Zp}]{0,1024}\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_HASH_LEN'] = 16;

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_USERNAME_LEN_MIN'] = 1;

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_USERNAME_LEN_MAX'] = 64;

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_USERNAME_REGEX'] = "^[a-z0-9]([a-z0-9_-]{0,62}[a-z0-9])?\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_NAME_LEN_MIN'] = 1;

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_NAME_LEN_MAX'] = 255;

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_NAME_REGEX'] = "^[^\\p{Cc}\\p{Zl}\\p{Zp}]{1,255}\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_TAG_NAME_LEN_MIN'] = 1;

$GLOBALS['Limits_CONSTANTS']['EDAM_TAG_NAME_LEN_MAX'] = 100;

$GLOBALS['Limits_CONSTANTS']['EDAM_TAG_NAME_REGEX'] = "^[^,\\p{Cc}\\p{Z}]([^,\\p{Cc}\\p{Zl}\\p{Zp}]{0,98}[^,\\p{Cc}\\p{Z}])?\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTE_TITLE_LEN_MIN'] = 1;

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTE_TITLE_LEN_MAX'] = 255;

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTE_TITLE_REGEX'] = "^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,253}[^\\p{Cc}\\p{Z}])?\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTE_CONTENT_LEN_MIN'] = 0;

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTE_CONTENT_LEN_MAX'] = 5242880;

$GLOBALS['Limits_CONSTANTS']['EDAM_APPLICATIONDATA_NAME_LEN_MIN'] = 3;

$GLOBALS['Limits_CONSTANTS']['EDAM_APPLICATIONDATA_NAME_LEN_MAX'] = 32;

$GLOBALS['Limits_CONSTANTS']['EDAM_APPLICATIONDATA_VALUE_LEN_MIN'] = 0;

$GLOBALS['Limits_CONSTANTS']['EDAM_APPLICATIONDATA_VALUE_LEN_MAX'] = 4092;

$GLOBALS['Limits_CONSTANTS']['EDAM_APPLICATIONDATA_ENTRY_LEN_MAX'] = 4095;

$GLOBALS['Limits_CONSTANTS']['EDAM_APPLICATIONDATA_NAME_REGEX'] = "^[A-Za-z0-9_.-]{3,32}\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_APPLICATIONDATA_VALUE_REGEX'] = "^[^\\p{Cc}]{0,4092}\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTEBOOK_NAME_LEN_MIN'] = 1;

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTEBOOK_NAME_LEN_MAX'] = 100;

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTEBOOK_NAME_REGEX'] = "^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,98}[^\\p{Cc}\\p{Z}])?\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTEBOOK_STACK_LEN_MIN'] = 1;

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTEBOOK_STACK_LEN_MAX'] = 100;

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTEBOOK_STACK_REGEX'] = "^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,98}[^\\p{Cc}\\p{Z}])?\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_PUBLISHING_URI_LEN_MIN'] = 1;

$GLOBALS['Limits_CONSTANTS']['EDAM_PUBLISHING_URI_LEN_MAX'] = 255;

$GLOBALS['Limits_CONSTANTS']['EDAM_PUBLISHING_URI_REGEX'] = "^[a-zA-Z0-9.~_+-]{1,255}\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_PUBLISHING_URI_PROHIBITED'] = array(
  ".." => true,
);

$GLOBALS['Limits_CONSTANTS']['EDAM_PUBLISHING_DESCRIPTION_LEN_MIN'] = 1;

$GLOBALS['Limits_CONSTANTS']['EDAM_PUBLISHING_DESCRIPTION_LEN_MAX'] = 200;

$GLOBALS['Limits_CONSTANTS']['EDAM_PUBLISHING_DESCRIPTION_REGEX'] = "^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,198}[^\\p{Cc}\\p{Z}])?\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_SAVED_SEARCH_NAME_LEN_MIN'] = 1;

$GLOBALS['Limits_CONSTANTS']['EDAM_SAVED_SEARCH_NAME_LEN_MAX'] = 100;

$GLOBALS['Limits_CONSTANTS']['EDAM_SAVED_SEARCH_NAME_REGEX'] = "^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,98}[^\\p{Cc}\\p{Z}])?\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_PASSWORD_LEN_MIN'] = 6;

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_PASSWORD_LEN_MAX'] = 64;

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_PASSWORD_REGEX'] = "^[A-Za-z0-9!#\$%&'()*+,./:;<=>?@^_`{|}~\\[\\]\\\\-]{6,64}\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTE_TAGS_MAX'] = 100;

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTE_RESOURCES_MAX'] = 1000;

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_TAGS_MAX'] = 100000;

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_SAVED_SEARCHES_MAX'] = 100;

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_NOTES_MAX'] = 100000;

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_NOTEBOOKS_MAX'] = 250;

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_RECENT_MAILED_ADDRESSES_MAX'] = 10;

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_MAIL_LIMIT_DAILY_FREE'] = 50;

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_MAIL_LIMIT_DAILY_PREMIUM'] = 200;

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_UPLOAD_LIMIT_FREE'] = 62914560;

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_UPLOAD_LIMIT_PREMIUM'] = 1073741824;

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTE_SIZE_MAX_FREE'] = 26214400;

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTE_SIZE_MAX_PREMIUM'] = 52428800;

$GLOBALS['Limits_CONSTANTS']['EDAM_RESOURCE_SIZE_MAX_FREE'] = 26214400;

$GLOBALS['Limits_CONSTANTS']['EDAM_RESOURCE_SIZE_MAX_PREMIUM'] = 52428800;

$GLOBALS['Limits_CONSTANTS']['EDAM_USER_LINKED_NOTEBOOK_MAX'] = 100;

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTEBOOK_SHARED_NOTEBOOK_MAX'] = 250;

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTE_CONTENT_CLASS_LEN_MIN'] = 3;

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTE_CONTENT_CLASS_LEN_MAX'] = 32;

$GLOBALS['Limits_CONSTANTS']['EDAM_HELLO_APP_CONTENT_CLASS_PREFIX'] = "evernote.hello.";

$GLOBALS['Limits_CONSTANTS']['EDAM_FOOD_APP_CONTENT_CLASS_PREFIX'] = "evernote.food.";

$GLOBALS['Limits_CONSTANTS']['EDAM_NOTE_CONTENT_CLASS_REGEX'] = "^[A-Za-z0-9_.-]{3,32}\$";

$GLOBALS['Limits_CONSTANTS']['EDAM_CONTENT_CLASS_HELLO_ENCOUNTER'] = "evernote.hello.encounter";

$GLOBALS['Limits_CONSTANTS']['EDAM_CONTENT_CLASS_HELLO_PROFILE'] = "evernote.hello.profile";

$GLOBALS['Limits_CONSTANTS']['EDAM_CONTENT_CLASS_FOOD_MEAL'] = "evernote.food.meal";

?>

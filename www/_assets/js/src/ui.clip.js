NB.Ui.clip = {
  evernote: function () {
    Evernote.doClip({
      url: NB.crumb.canonical, 
      contentId:'content', 
      providerName:'joegatt.net', 
      //select citation style in user settings
      //get year from console.log($('meta[name=OriginalPublicationDate]').attr('content')) OR thisYear
      //or rather - get these from js variables...
      footer:'Gatt, J., 2010. Jean Paul: Schulmeisterlein Wutz. Available from http://joegatt.net/22 [Accessed 3 October 2010].', 
      signature: NB.Ui.clip._signature
    });
    return false;
  }, 
  _signature: "Licensed under a <a href=\"http://creativecommons.org/licenses/by-nc-sa/3.0/legalcode\"> Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported licence</a> ."
}

/******************************************************************************/

$('.evernote').live('click', NB.Ui.clip.evernote);

 /*

- For notes add tags, etc
- Citation method could be chosen per user
 Is putting in the licence tacky? - Maybe only on log clips.
 Remember to add api key.
 Citation methods could be different.

title - The title of the resulting note. If omitted, the page title is used.
url - The URL to set as the resulting note's Source URL attribute. If omitted, the page URL is used. Use this parameter on blogs to set the clip's source URL to a permalink when the reader clicks on a Site Memory button on the blog's homepage.
code - Your Evernote Affiliate program referral code. Become an affiliate.
suggestNotebook - The name of the notebook to set as the default notebook selection. If the user doesn't have a notebook with this name, Site Memory will allow them to create it automatically as part of the clipping process.
suggestTags - An array of up to three tags that will be suggested to the user.
providerName - A name to be displayed instead of your domain name in the Site Memory UI.
latitude - The floating point latitude (e.g. 37.39) to set in the resulting note's location attribute. Note that the number must use a period as the decimal separator.
longitude - The floating point longitude (e.g. -122.07) to set in the resulting note's location attribute. Note that the number must use a period as the decimal separator.
styling - The clip styling strategy that the clipper should use. Valid values are "none" to ignore page styles, "text" to only apply page styles to textual elements, and "full" to attempt to copy the full styling of the page. The default value is "text", which we suggest using as it yields clips that display consistently across platforms. "full" styling often looks good one one platform but fails to render well on others. Note that there is currently no way to style clips made from IE.
 
 */

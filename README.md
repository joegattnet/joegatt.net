<h3>Infrastructure</h3>
<p>The site runs on an Apache server using a MySQL databse. Pages are pre-built using Perl and PHP into html or shtml. No dynamic content is served except for signing/signing in. Additionally, Varnish caching sits in front of Apache.</p>

<h3>Directory structure</h3>
<p>All directories that are paralleled in the site structure sit directly under root; other directories are inside /_etc.</p>

<h3>URL rewrites</h3>
<p>Substantial URL rewriting is performed</p>
<ul>
  <li>/[section]/[id] is rewritten to /[section]/page.shtml?p=[id]</li>
  <li>/[section]/[page]/[id] is rewritten to /[section]/[page].shtml?p=[id]</li>
</ul>
<p>An .htaccess file sits at the root to take care of these rewrites. In production, this file is included directly into the virtualhost configuration. This allows us to disallow all overrides and (marginally) improves performance.</p>

<h3>Page structure</h3>
<p>A 'stateful' page is maintained throughout a user session. This complicates things somewhat but has several advantages:</p>
<ul>
<li>The various javascript files do not have to be reloaded and initiated for every new page</li>
<li>Aspects of the user-experience, such as code browsing, can be independent of page browsing</li>
<li>Smaller chunks of html are requested on page change</li>
<li>Enables us to pre-process HTML content using server-side scripting while avoiding flashes of unstyled content (not implemented)</li>
<li>Enables us to cache and, where desirable, pre-load pages</li>
</ul>
<p>All links are standard http links. When new content is loaded, the JS functions in NB.Nav.links cancel the default click behaviour and bind the click event to NB.Nav.links.internal. This sends the requested url to NB.Nav.fetch which, in turn, makes an AJAX request for the page, specifying that we are not requesting the entire page (e.g. '?scope=page').</p>
<p>On the back-end /etc/layouts/render.shtml uses the scope parameter to decide how much of the page should be returned.</p>
<p>Forward and back button clicks are detected by jQUery.hashchange, changes are passed on to NB.Nav.fetch as above</p> 
<p>When new content is loaded, an event is trigerred to notify any page elements that might need updating</p>
<h3>Caching</h3>
<p>Content is cached at three levels</p>
<ul>
<li>Page elements retrieved through AJAX, as described above, are stored inside an array and re-used.</li>
<li>Server-side script output is stored as shtml content in /cache. An URL rewrite takes care to redirect requests to the generating script when the HTML content does not exist in /cache. Scripts that receive new content (notes, comments, edits, etc) ensure that stale content in /cache is refreshed.</li>
<li>Varnish provides an additional layer of caching between Apache and the client</li>
</ul>
<p>Additionally, all content has parameteres and values incorporated into the file name and is set to expire after ten minutes. Assets have unique version numbers and expire after at least two months. In addition, cookies are only used client-side (except for sign-up/sign-in, which is lazy-loaded into the page). The same content is served to all browsers.</p>
<h3>Image server</h3>
<p>Raw images are stored at /_etc/resources/raw. Images are requested from /_etc/resources/cut. AAn URL rewrite checks whether the image exists; if not it redirects to /_etc/images/serve.php. If /_etc/resources/templates contains an image cropped at the requested aspect ratio then an image with the requested dimensions is derived from it. If no such template exists then a new one is guessed from the raw image.</p> 
<h3>Notes/Tags</h3>
<p>Notes are currently imported from Evernote. Although it would be possible to use other capturing tools, Evernote offers a variety of methods for capturing notes, aimages, URLs, sounds, all dated, versioned, tagged and geo-tagged</p>
<p>Notes are stored in a simple un-normalised state to parallel that of Evernote's. Four tables in the database are relevant: notes, tags, resources, lookup.</p>
<p>Every is kept on the database.</p>
<p>Bibliography ... simply views
<h3>Enface/Anagram</h3>



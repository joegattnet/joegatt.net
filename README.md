<h3>Architecture</h3>
<p>The site runs on an Apache server using a MySQL database. Pages are pre-built using Perl and PHP into HTML or SHTML. No dynamic content is served except for registering/signing in. Additionally, Varnish caching sits in front of Apache. 
</p><h3>Directory structure</h3>
<p>All directories that are paralleled in the site structure sit at the root - other directories are inside /_etc. 
</p><h3>URL rewrites</h3>
<p>Substantial URL-rewriting is performed: 
</p>
<ul>     
  <li>/[section]/[p] is rewritten to /[section]/page.shtml?p=[p]   
  </li>     
  <li>/[section]/[page]/[p] is rewritten to /[section]/[page].shtml?p=[p]   
  </li>
</ul>
<p>An .htaccess file sits at the root to take care of these rewrites. In production, this file is included into the virtual host configuration. This allows us to forbid all overrides and (marginally) improves performance. 
</p><h3>Page structure</h3>
<p>A 'stateful' page is maintained throughout the user's session. This complicates things somewhat but has several advantages: 
</p>
<ul>  
  <li>The various javascript files do not have to be reloaded and initiated for every new page.   
  </li>  
  <li>Some aspects of the user experience, such as code browsing, can be independent of page browsing.   
  </li>  
  <li>Smaller chunks of html are requested when the user views a new page.   
  </li>  
  <li>We are able to pre-process HTML content through client-side scripting while avoiding flashes of unstyled content (not implemented).   
  </li>  
  <li>We are able to cache and, where desirable, pre-load content.
  </li>
</ul>
<p>All links are standard http links. When new content is loaded, the JS functions in NB.Nav.links cancel the default click behaviour and bind the click event to NB.Nav.links.internal. This sends the requested url to NB.Nav.fetch which, in turn, makes an AJAX request for the page, specifying that we are not requesting the entire HTML page ("?scope=page"). 
</p>
<p>On the back-end /etc/layouts/render.shtml uses the scope parameter to determine how much of the page should be returned. 
</p>
<p>Forward and back button clicks are detected by    
  <a href="_assets/js/lib/jquery.ba-hashchange.js">jQUery.hashchange</a> and changes are passed on to    
  <a href="_assets/js/src/nav.fetch.js">NB.Nav.fetch</a> as above. 
</p>   
<p>When new content is loaded, an event is trigerred to notify any page elements that might need updating. 
</p><h3>Caching</h3>
<p>Content is cached at three levels: 
</p>
<ul>  
  <li>Page elements retrieved through AJAX, as described above, are stored inside an array (NB.cache) and re-used.   
  </li>  
  <li>Server-side script output is stored as SHTML content in /cache. A URL rewrite takes care to redirect requests to the generating script when the HTML content does not exist in /cache. Scripts that receive new content (notes, comments, edits, etc) ensure that stale content in /cache is refreshed.
  </li>  
  <li>Varnish provides an additional layer of caching between Apache and the client.   
  </li>
</ul>
<p>All content has parameters and values incorporated into the file name and is set to expire after ten minutes. Assets have unique version numbers and expire after at least two months. In addition, cookies are only used client-side (except for registering/signing in, which is lazy-loaded into the page). Identical content is served to all users on all browsers. 
</p><h3>Image server</h3>
<p>Raw images are stored at /_assets/images/raw. Images are requested from /_assets/images/cut. A URL rewrite checks whether the image exists; if not, it redirects to /_assets/images/static/serve.php. If /_assets/images/templates contains an image cropped at the requested aspect ratio then an image with the requested dimensions is derived from it. If no such template exists then a new one is guessed from the raw image. 
</p>  <h3>Notes/Tags</h3>
<p>Notes are currently imported from Evernote. Although it would be possible to use other capturing tools, Evernote offers a variety of methods for capturing notes, images, URLs and sounds - all dated, versioned, tagged and geo-tagged. 
</p>
<p>Notes are stored in a simple un-normalised model to parallel that of Evernote's. Four tables in the database are relevant: notes, tags, resources, lookup. 
</p>
<p>Bibliography, Links and Topics are modelled as Notes and simply rely on customised views to differentiate their presentation. 
</p><h3>Enface/Anagram</h3>
<p>The Enface/Anagram system used to edit and monitor Wutz works as follows: 
</p>
<ul>  
  <li>The table character_count contains a static negative count of each letter's frequency in the German-language text as well as a row that stores the count for each character in every paragraph. An SQL query for the SUM of a given character therefore returns the difference in the occurrence of a character:    
  <blockquote>    
    <em>Difference = (Frequency<sub>DE</sub> * -1) + SUM[frequency<sub>EN</sub>]</em>    
    </blockquote>  
  </li>  
  <li>When a page (consisting of several paragraphs) of Wutz is loaded, the array NB.Anagram.anagram is populated. This is a list of the frequency difference between the German-language and English-language texts for each letter and numeral.   
  </li>  
  <li>When a user enters a new letter, the function NB.Anagram.letter checks whether the new letter is desirable (decreases the difference) or not, and indicates accordingly.   
  </li>  
  <li>The new total is calculated by the function NB.Anagram.recalculate_paragraph. First it discounts the differences for the current paragraph and then recalculates them and updates the array NB.Anagram.anagram. (Merely recalculating according to the new letter would not account for text pasted in.)   
  </li>  
  <li>When a paragraph is saved, the current total and the improvement achieved by the new paragraph is also sent to the server.   
  </li>  
  <li>The entry for each letter/paragraph is updated in the table character_count.   
  </li>
</ul>
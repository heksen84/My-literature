<?php

$sitemap = simplexml_load_file("sitemap.xml");
$newxml = new SimpleXMLElement("<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'></urlset>");

foreach ($sitemap->url as $url_list) 
{
    if (!strpos($url_list->loc, "123"))
    {
      $newurl = $newxml->addChild("url");
      $newurl->addChild("loc",        $url_list->loc);
      $newurl->addChild("changefreq", $url_list->changefreq);
      $newurl->addChild("priority",   $url_list->priority);
      echo "<br>ok";
      //break;
    }
}

$dom = new DOMDocument('1.0');
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;
$dom->loadXML($newxml->asXML());
$dom->save('sitemap2.xml');

?>
<?php

$sitemap = simplexml_load_file("sitemap.xml");
foreach ($sitemap->url as $url_list) {
    $url = $url_list->loc;
    if (strpos($url, "546"))
    {
      unset($url_list[0]); 
    }
}


$dom = new DOMDocument('1.0');
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;
$dom->loadXML($sitemap->asXML());
$dom->save('sitemap.xml');

?>
<?php

$sitemap = simplexml_load_file("sitemap.xml");

$url = $sitemap->addChild('url');
$url->addChild("loc", "https://www.".$_SERVER['SERVER_NAME']."/?rec_id=".uniqid());
$url->addChild("changefreq", "daily");
$url->addChild("priority", "0.5");

$dom = new DOMDocument('1.0');
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;
$dom->loadXML($sitemap->asXML());
$dom->save('sitemap.xml');

echo "ok!";
?>
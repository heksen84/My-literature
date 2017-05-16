<?php
class util
{
 // -------------------------------------------  
 // генерация страницы (SEO)
 // -------------------------------------------
 static function GeneratePage($title, $desc, $id)
 {			
    	$year  = date("Y");
    	$month = date("m");
	$name  = uniqid();

	$fp = fopen("index/ru/".$year."/".$name.'.html', 'w+');	
	if ($fp)
	{
		fwrite($fp, "<!DOCTYPE html>");
		fwrite($fp, "<html lang='ru'>");
		fwrite($fp, "<head>");
		fwrite($fp, "<meta charset='utf-8'>");
		fwrite($fp, "<meta name='viewport' content='width=device-width'/>");
		fwrite($fp, "<meta name='description' content='".$desc."'/>");
		fwrite($fp, "<meta name='keywords' content='литература'/>");
		fwrite($fp, "<meta name='robots' content='index, follow'/>");
		fwrite($fp, "<title>".$title."</title>");
		fwrite($fp, "</head>");
		fwrite($fp, "<script>window.location='http://".$_SERVER['SERVER_NAME']."/?rec_id=".$id."'</script>");
		fwrite($fp, "<body>https://www.my-literature.com</body>");
		fclose($fp);

		$sitemap = simplexml_load_file("sitemap.xml");

		$url = $sitemap->addChild('url');
		$url->addChild("loc", "https://www.".$_SERVER['SERVER_NAME']."/?rec_id=".$id);
		$url->addChild("changefreq", "daily");
		$url->addChild("priority", "0.5");
		$dom = new DOMDocument('1.0');
		$dom->preserveWhiteSpace = false;
		$dom->formatOutput = true;
		$dom->loadXML($sitemap->asXML());
		$dom->save('sitemap.xml');

		// СДЕЛАТЬ ПРОВЕРКУ НА ОШИБКИ
		$db = DataBase::getDB();
		$result = $db->query("INSERT INTO `index-pages` VALUES (NULL, '".$id."', '".$name."')");		
	}
 }
}
?>
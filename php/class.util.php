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

	$fp = fopen("html/ru/".$year."/".$name.'.html', 'w+');	
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
 }
}
?>
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
	fwrite($fp, "<script>window.location='http://".$_SERVER['SERVER_NAME']."/?recid=".$id."'</script>");
	fwrite($fp, "<body>https://www.my-literature.com</body>");
	fclose($fp);
 }
 // ---------------------
 // конвертер
 // ---------------------
 static function translit($str) 
 {
    $str = preg_replace('%[^A-Za-zА-Яа-я0-9]%', '', $str);
    $rus = array(' ', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я', 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я');
    $lat = array('-', 'A', 'B', 'V', 'G', 'D', 'E', 'E', 'Gh', 'Z', 'I', 'Y', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F', 'H', 'C', 'Ch', 'Sh', 'Sch', 'Y', 'Y', 'Y', 'E', 'Yu', 'Ya', 'a', 'b', 'v', 'g', 'd', 'e', 'e', 'gh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'c', 'ch', 'sh', 'sch', 'y', 'y', 'y', 'e', 'yu', 'ya');
    return str_replace($rus, $lat, $str);
 }
}
?>
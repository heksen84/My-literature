<?php

class Record
{	
	
	private static $record = null;
		
	/* --- получить класс работы с записями --- */
	public static function getRecord() {	
		if (self::$record == null){			
			self::$record = new Record();						
			return self::$record;
		}
	}
		
	/* --- добавить запись --- */
	function add()
	{							
		$db	= DataBase::getDB();				
		if (!isset($_POST['title'])		
		|| !isset($_POST['short_description']) 
		|| !isset($_POST['type_of_literature'])
		|| !isset($_POST['text']) 			
		|| !isset($_POST['record_access_mode'])) msg::error("нет данных");								
		
		$title 	= (string)$_POST['title'];
		$desc 	= (string)$_POST['short_description'];
		$text 	= (string)$_POST['text'];
		
		$type 	= (int)$db->safe_string($_POST['type_of_literature']);
		$mode 	= (int)$db->safe_string($_POST['record_access_mode']);
		$price 	= (float)$db->safe_string($_POST['price']);
								
		$record_id = $db->query("INSERT INTO `records` VALUES (NULL,'".$_SESSION["user_id"]."','".$title."','".$desc."','".$type."','0','".$text."','".$mode."','".$price."',NOW())");
		
		if ($mode != 1) util::GeneratePage($title, $desc, $record_id);				
		msg::success("опубликовано!");			
	}
	
	/* --- обновить запись --- */
	function update()
	{										
		$db	= DataBase::getDB();		
		if (!isset($_POST['title'])	|| !isset($_POST['short_description']) || !isset($_POST['type_of_literature']) || !isset($_POST['text']) || !isset($_POST['record_access_mode'])) msg::error("нет данных");
		
		$id 	= (int)$_POST['id'];
		$title 	= (string)$_POST['title'];
		$desc 	= (string)$_POST['short_description'];
		$text 	= (string)$_POST['text'];
		
		$type 	= (int)$db->safe_string($_POST['type_of_literature']);
		$mode 	= (int)$db->safe_string($_POST['record_access_mode']);
		$price 	= (float)$db->safe_string($_POST['price']);
				
		$result = $db->query("UPDATE `records` SET title='".$title."', description='".$desc."', type_literature='".$type."', text='".$text."', access_mode='".$mode."' WHERE id='".$id."' AND user_id='".$_SESSION["user_id"]."'");				
		msg::success($result);
	}
	
	/* --- удалить запись --- */
	function del()
	{		
	
		$db = DataBase::getDB();
		if (!isset($_GET['record_id'])) msg::error("нет данных");		
		$record_id = (int)$_GET['record_id'];        		

		$item = $db->query("DELETE FROM `records` WHERE id='".$record_id."'");		
		$result = $db->select("SELECT name FROM `index-pages` WHERE record_id='".$record_id."'");		

		$file = "index/ru/".date("Y")."/".$result[0]["name"].".html";
		
		if (file_exists($file)) 
		{
	  	   $db->query("DELETE FROM `index-pages` WHERE record_id='".$record_id."'");
		   unlink($file);			
		}

		$sitemap = simplexml_load_file("sitemap.xml");
		$newxml = new SimpleXMLElement("<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'></urlset>");
		
		foreach ($sitemap->url as $url_list) 
		{
		    if (!strpos($url_list->loc, (string)$record_id))
		    {
		      $newurl = $newxml->addChild("url");
		      $newurl->addChild("loc",        $url_list->loc);
		      $newurl->addChild("changefreq", $url_list->changefreq);
		      $newurl->addChild("priority",   $url_list->priority);
		    }
		}

		$dom = new DOMDocument('1.0');
		$dom->preserveWhiteSpace = false;
		$dom->formatOutput = true;
		$dom->loadXML($newxml->asXML());
		$dom->save('sitemap.xml');				
		
        	msg::success($item);
	}
	
	/* --- получить список --- */
	function getList()
	{		
		$db	= DataBase::getDB();
		$table = $db->select("SELECT id AS value, text AS label FROM `records` WHERE user_id='".$_SESSION["user_id"]."' ORDER BY text ASC");		
		msg::success($table);		
	}
	
	/* --- получить записи --- */
	function getRecords()
	{
		$db	= DataBase::getDB();
		$table = $db->select("SELECT * FROM `records` WHERE user_id='".$_SESSION["user_id"]."'");
		msg::success($table);
	}
	
	/* --- режим доступа --- */
	function setPrivateMode()
	{
		$db = DataBase::getDB();
		$record_id 	= (int)$_POST['record_id'];
		$mode		= (int)$_POST['mode'];
		$result = $db->query("UPDATE `records` SET access_mode='".$mode."' WHERE id='".$record_id."' AND user_id='".$_SESSION["user_id"]."'");
		msg::success($result);			
	}
}
?>
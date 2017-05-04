<?php

class Text
{	
	private static $text=null;	
	
	/* --- получить класс работы с записями --- */
	public static function getText() {	
		if (self::$text== null){			
			self::$text= new Text();						
			return self::$text;
		}
	}
	
	function read()
	{
		$db	= DataBase::getDB();
		$text = $db->select("SELECT * FROM records WHERE id='".$_GET["record_id"]."' LIMIT 1");
		msg::success($text);
	}
}
?>
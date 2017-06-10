<?php

class Text
{	
	private static $text = null;	
	
	const MAX_READ_SYMBOLS = 15000;
	
	/* --- получить класс работы с записями --- */
	public static function getText() {	
		if (self::$text== null){			
			self::$text= new Text();						
			return self::$text;
		}
	}

	/* --- читать текст --- */	
	function read()
	{
		$db = DataBase::getDB();
		$read_pos = (int)$_GET["read_pos"];
		$result = $db->select("SELECT * FROM records WHERE id='".$_GET["record_id"]."' LIMIT 1");
//		$result = $db->select("SELECT id, SUBSTR(CAST(text as CHAR),1,".self::MAX_READ_SYMBOLS.") AS text FROM records WHERE id='".$_GET["record_id"]."' LIMIT 1");
		if ($result[0]["access_mode"]==1 && (string)$_GET["reader"]=="web") msg::error("доступ запрещён!");
		msg::success($result);
	}
}
?>
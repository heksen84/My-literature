<?php

class Text
{	
	private static $text = null;	
	
	const MAX_READ_SYMBOLS = 10000;
	
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
		$result = $db->select("SELECT id, title, description, SUBSTR(CAST(text as CHAR),".$read_pos.",".self::MAX_READ_SYMBOLS.") AS text FROM records WHERE id='".$_GET["record_id"]."' LIMIT 1");
		if ($result[0]["access_mode"]==1 && (string)$_GET["reader"]=="web") msg::error("доступ запрещён!");
		msg::success($result);
	}

	function readFullText()
	{
		$db = DataBase::getDB();
		$result = $db->select("SELECT * FROM records WHERE id='".$_GET["record_id"]."' LIMIT 1");
		if ($result[0]["access_mode"]==1 && (string)$_GET["reader"]=="web") msg::error("доступ запрещён!");
		msg::success($result);
	}
	
	function getFullSize()
	{
		$db = DataBase::getDB();
		$result = $db->select("SELECT text FROM records WHERE id='".$_GET["record_id"]."'");		
		msg::success(strlen($result[0]["text"]));
	}
	
	function getLastSymbols()
	{
		$db = DataBase::getDB();
		$result = $db->select("SELECT text FROM records WHERE id='".$_GET["record_id"]."'");
		if (!$result) msg::error("getLastSymbols mysql error");
		$pos = strlen(utf8_decode($result[0]["text"]))-512;				
		$result = $db->select("SELECT SUBSTR(CAST(text as CHAR), ".$pos.", 512) AS text FROM records WHERE id='".$_GET["record_id"]."'");
		msg::success($result[0]["text"]);
	}
}
?>
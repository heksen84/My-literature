<?php

class Categories
{	
	const SHOW_MAX_RECORDS = 100;	

	private static $categories = null;	
	
	public static function getCategories() {	
		if (self::$categories == null){			
			self::$categories = new Categories();						
			return self::$categories;
		}
	}

	/* --- получить все категории --- */
	function getAll()
	{
		$db	= DataBase::getDB();								
		if (!$db->isConnected()) msg::error("нет подключения");
		$data = $db->select("SELECT * FROM categories");						
		msg::success($data);
	}
	
	/* --- получить категорию по id --- */
	function getFromId()
	{
		$db	= DataBase::getDB();				
		$category_id = (int)$_GET["category_id"];
		$start 	     = (int)$_GET["start"];		
		$records = $db->select
		(
			"SELECT records.id, records.title, users.surname, users.name, users.surname FROM `records` 
			INNER JOIN `users` ON records.user_id=users.id AND records.type_literature='".$category_id."' 
			AND records.access_mode!=1 LIMIT ".$start.",".self::SHOW_MAX_RECORDS
		);
		msg::success($records);
	}
}
?>
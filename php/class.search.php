<?php

class Search
{	
	private static $search=null;	
	
	/* --- получить класс работы с записями --- */
	public static function getSearch() {	
		if (self::$search== null){			
			self::$search= new Search();						
			return self::$search;
		}
	}
	
	/* --- ПОИСК --- */	
	function start()
	{		
		$db	= DataBase::getDB();		
		$search_input = (string)$_GET["search_input"];
		$records = $db->select(	"SELECT records.id, records.title, users.surname, users.name, users.surname FROM `records` 
								INNER JOIN `users` ON records.user_id=users.id AND records.title LIKE '%".$search_input."%'");		
		msg::success($records);
	}
}
?>
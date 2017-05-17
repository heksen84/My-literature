<?php

class Like
{	
	private static $like=null;	
	
	/* --- получить класс работы с записями --- */
	public static function getLike() {	
		if (self::$like== null){			
			self::$like= new Like();						
			return self::$like;
		}
	}
	
	/* --- Лайк --- */	
	function set()
	{		
		$db = DataBase::getDB();		
		/*$search_input = (string)$_GET["search_input"];
		$records = $db->select(	"SELECT records.id, records.title, users.surname, users.name, users.surname FROM `records` 
								INNER JOIN `users` ON records.user_id=users.id AND records.title LIKE '%".$search_input."%'");	*/
		msg::success("$records");
	}
}
?>
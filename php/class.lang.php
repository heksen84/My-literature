<?php
class Lang
{
	
	private static $lang = null;	
	
	/* --- получить пользователя --- */
	public static function getLang() {	
		if (self::$lang == null){			
			self::$lang = new Lang();						
			return self::$lang;
		}
	}
						
	/* --- регистрация --- */
	function register()
	{		
		$db	= DataBase::getDB();		
				
		if (!isset($_GET['type']) || !isset($_GET['name']) || !isset($_GET['surname']) || !isset($_GET['email']) || !isset($_GET['password'])) 
			msg::error("нет данных");
				
		$type 	  = $_GET['type'];
		$name 	  = $_GET['name'];
		$surname  = $_GET['surname'];
	        $email    = $_GET['email'];
        	$password = $_GET['password'];		
				
		msg::success($name);
	}
 
}
?>
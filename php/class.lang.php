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
						
	function set($lang)
	{			
	} 
}
?>
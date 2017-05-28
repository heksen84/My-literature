<?php
class Lang
{	
	
	private static $lang = null;	
	
	/* --- получить язык --- */
	public static function getLang() {	
		if (self::$lang == null){			
			self::$lang = new Lang();						
			return self::$lang;
		}
	}
	
	/* -- установить язык -- */
	function setLanguage($lang)
	{			
	} 

	/* -- получить содержимое страницы -- */	
	function getStrings($page)
	{			
	} 
}
?>
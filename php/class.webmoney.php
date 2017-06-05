<?php
class WebMoney
{	
	private static $webmoney = null;	
	
	public static function getWebMoney() {	
		if (self::$webmoney == null){			
			self::$webmoney = new WebMoney();						
			return self::$webmoney;
		}
	}
}
?>
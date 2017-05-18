<?php
class Writer
{	
	private static $writer = null;	
	
	/* --- получить закладку --- */
	public static function getWriter() {	
		if (self::$writer == null){			
			self::$writer = new Writer();						
			return self::$writer;
		}
	}

	/* --- получить перечень работ --- */
	function getWorks() 
	{
		$db	= DataBase::getDB();
		$records = $db->select("SELECT * FROM `records` WHERE user_id='".$_SESSION["user_id"]."'");		
		msg::success($records);		
	}
}
?>
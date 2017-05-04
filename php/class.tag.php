<?php
class Tag
{
	private static $tag = null;	
	
	/* --- получить пользователя --- */
	public static function getTag() {	
		if (self::$tag == null){			
			self::$tag = new Tag();						
			return self::$tag;
		}
	}
						
	/* --- регистрация --- */
	function get()
	{
		$db	= DataBase::getDB();
		$table = $db->select("SELECT id AS value, name AS label FROM `tags` WHERE user_id='".$_SESSION["user_id"]."'");
		msg::success($table);
	}
	
	function check()
	{
		$db	= DataBase::getDB();		
		if (!isset($_GET['tag_name'])) msg::error("нет данных");		
		$tag_name = trim($_GET["tag_name"]);
		$table = $db->select("SELECT id FROM `tags` WHERE name='".$tag_name."' AND user_id='".$_SESSION["user_id"]."' LIMIT 1");
		if ($table)
		{
			msg::success($table);		
		}
		else 
		{
			$tag_id = $db->query("INSERT INTO `tags` VALUES (NULL,'".$_SESSION["user_id"]."','".$tag_name."')");
			$array[]["id"]=$tag_id;
			msg::success($array);		
		}				
	}
	
}
?>
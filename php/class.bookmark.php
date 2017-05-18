<?php
class BookMark
{	
	
	private static $bookmark = null;	
	
	/* --- получить закладку --- */
	public static function getBookMark() {	
		if (self::$bookmark == null){			
			self::$bookmark = new BookMark();						
			return self::$bookmark;
		}
	}

	/* --- установить расположение закладки --- */
	function set()
	{						
		if (empty($_SESSION["user_id"])) msg::warning("требуется авторизация");
		
		$db	= DataBase::getDB();						

		if (!isset($_POST["record_id"]) || !isset($_POST["position"])) msg::error("нет данных");				
		
		$record_id  = (int)$_POST["record_id"];		
		$position   = (int)$_POST["position"];
		
		$data = $db->select("SELECT * FROM bookmarks WHERE record_id='".$record_id."' AND user_id='".$_SESSION["user_id"]."'");						
		if ($data==false) {
			$bookmark_id = $db->query("INSERT INTO `bookmarks` VALUES (NULL,'".$record_id."','".$_SESSION["user_id"]."','".$position."')");						
			msg::success($bookmark_id);		
		}
		else {			
			$data = $db->query("UPDATE `bookmarks` SET position='".$position."' WHERE record_id='".$record_id."' AND user_id='".$_SESSION["user_id"]."'");
			msg::success($data);
		}
	}	

	/* --- получить расположение закладки --- */
	function get()
	{		
		$db	= DataBase::getDB();				
		if (!isset($_GET["record_id"])) msg::error("нет данных");				
		$record_id  = (int)$_GET["record_id"];				

		$pos = $db->select("SELECT position FROM bookmarks WHERE record_id='".$record_id."' AND user_id='".$_SESSION["user_id"]."'");						
		msg::success($pos);
	}

	/* --- получить заметки --- */
	function getBookMarks()
	{
		$db	= DataBase::getDB();						
		$data = $db->select("SELECT records.id, records.title FROM `bookmarks` INNER JOIN `records` ON bookmarks.record_id=records.id WHERE bookmarks.user_id='".$_SESSION["user_id"]."'");						
		msg::success($data);
	}
}
?>
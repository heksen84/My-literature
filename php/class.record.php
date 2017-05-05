<?php
include "class.image.php";

class Record
{	
	private static $record = null;	
	
	/* --- получить класс работы с записями --- */
	public static function getRecord() {	
		if (self::$record == null){			
			self::$record = new Record();						
			return self::$record;
		}
	}
		
	function getBytesFromHexString($hexdata)
	{
		for($count = 0; $count < strlen($hexdata); $count+=2)
		$bytes[] = chr(hexdec(substr($hexdata, $count, 2)));

		return implode($bytes);
	}

	function getImageMimeType($imagedata)
	{
		$imagemimetypes = array
		( 
			"jpg" => "FFD8", 
			"png" => "89504E470D0A1A0A", 
			"gif" => "474946",
			"bmp" => "424D", 
			"tiff" => "4949",
			"tiff" => "4D4D"
		);

		foreach ($imagemimetypes as $mime => $hexbytes)
		{
			$bytes = $this->getBytesFromHexString($hexbytes);
			if (substr($imagedata, 0, strlen($bytes)) == $bytes)
			return $mime;
		}

		return NULL;
	}

	/* --- добавить запись --- */
	function add()
	{							
		$db	= DataBase::getDB();		
		
		if (!isset($_POST['title'])		
		|| !isset($_POST['short_description']) 
		|| !isset($_POST['type_of_literature'])
		|| !isset($_POST['text']) 			
		|| !isset($_POST['record_show_mode'])) msg::error("нет данных");								
		
		$title 	= $_POST['title'];
		$desc 	= $_POST['short_description'];
		$text 	= $_POST['text'];
		
		$type 	= $db->safe_string($_POST['type_of_literature']);
		$mode 	= $db->safe_string($_POST['record_show_mode']);
		$price 	= $db->safe_string($_POST['price']);
		
		$cover 	= null;
		
		if (!empty($_POST["image"])) {
			$data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $_POST["image"]));					
			$res  = $this->getImageMimeType($data);				
			$path = "userdata/"; 
			$user = substr(md5($_SESSION["user_id"]), 0, 10); 
			$images="/images/"; 			
			$cover = $path.$user.$images.uniqid().'.'.$res;
			if(!is_dir($path.$user.$images)) mkdir($path.$user.$images);						
			file_put_contents($cover, $data);			
		}
				
		$record_id = $db->query("INSERT INTO `records` VALUES (NULL,'".$_SESSION["user_id"]."','".$cover."','".$title."','".$desc."','".$type."','0','".$text."','".$mode."','".$price."',NOW())");
		
		if ($mode!=1) util::GeneratePage($title, $desc, $record_id);				
		msg::success("опубликовано!");			
	}
	
	/* --- обновить запись --- */
	function update()
	{										
		$db	= DataBase::getDB();		
		if (!isset($_POST['title'])	|| !isset($_POST['short_description']) || !isset($_POST['type_of_literature']) || !isset($_POST['text']) || !isset($_POST['record_show_mode'])) msg::error("нет данных");
		
		$id 	= $_POST['id'];
		$title 	= $_POST['title'];
		$desc 	= $_POST['short_description'];
		$text 	= $_POST['text'];
		$image 	= $_POST['image'];

		//msg::error($image);
		
		$type 	= $db->safe_string($_POST['type_of_literature']);
		$mode 	= $db->safe_string($_POST['record_show_mode']);
		$price 	= $db->safe_string($_POST['price']);
				
		$table = $db->select("SELECT cover FROM `records` WHERE id='".$id."'");
		
		/* --- удалить уже существующий файл --- */
		if (!empty($table[0]["cover"])) { 
			if (file_exists($table[0]["cover"])) unlink($table[0]["cover"]);
		}
		
		msg::success("ok!");
	}


	function del()
	{		
		$db	= DataBase::getDB();
		if (!isset($_GET['record_id'])) msg::error("нет данных");		
		$record_id = $_GET['record_id'];        		
		$item = $db->query("DELETE FROM `records` WHERE id='".$record_id."'");
        msg::success($item);
	}
	
	/* --- получить список --- */
	function getList()
	{		
		$db	= DataBase::getDB();
		$table = $db->select("SELECT id AS value, text AS label FROM `records` WHERE user_id='".$_SESSION["user_id"]."' ORDER BY text ASC");		
		msg::success($table);		
	}
	
	/* --- получить записи --- */
	function getRecords()
	{
		$db	= DataBase::getDB();
		$table = $db->select("SELECT * FROM `records` WHERE user_id='".$_SESSION["user_id"]."'");
		msg::success($table);
	}
}
?>
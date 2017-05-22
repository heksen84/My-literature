<?php

class User
{	
	private static $user = null;	
	
	/* --- получить пользователя --- */
	public static function getUser() {	
		if (self::$user == null){			
			self::$user = new User();						
			return self::$user;
		}
	}
						
	/* --- регистрация --- */
	function register()
	{		
		$db	= DataBase::getDB();						
		if (!isset($_GET['type']) || !isset($_GET['name']) || !isset($_GET['surname']) || !isset($_GET['email']) || !isset($_GET['password'])) 
			msg::error("нет данных");
				
		$type 	  = (int)$_GET['type'];
		$name 	  = (string)$_GET['name'];
		$surname  = (string)$_GET['surname'];
                $email    = $_GET['email'];
                $password = (string)$_GET['password'];
						
		// --- безопасность ---				
		$name 		= $db->safe_string($name);		
		$name 		= trim($name);
		
		$surname	= $db->safe_string($surname);		
		$surname	= trim($surname);
		
		/*$email		= $db->safe_string($email);		
		$email 		= trim($email);*/
		
		$password	= $db->safe_string($password);					
		$password 	= trim($password);
		
		if (empty($name) || empty($surname) || empty($email) || empty($password)) 
			msg::warning("поля должны быть заполнены");
		
		/*if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
			msg::warning("укажите корректный email");*/ 						
		
		$table = $db->select("SELECT * FROM `users` WHERE email='".$email."'");		
		if ($table!=false) msg::warning("пользователь уже существует");
				
		if (strlen($password) < 5) msg::error("плохой пароль");
		$hash_password = password_hash($password, PASSWORD_BCRYPT); 	
		
		$vk_id = 0; 
		$ok_id = 0; 
		$fb_id = 0;		
		
		$user_id = $db->query("INSERT INTO `users` VALUES (NULL,'".$type."','".$name."','".$surname."','".$email."','".$hash_password."','".$vk_id."','".$ok_id."','".$fb_id."',NOW(),NOW())");
		
		$_SESSION["user_id"] 	= $user_id;
		$_SESSION["user_email"] = $email;

		$subject = '123123123123';
		$message = 'hello';
		$headers = 'From: webmaster@example.com' . "\r\n" .
		    'Reply-To: webmaster@example.com' . "\r\n" .
		    'X-Mailer: PHP/' . phpversion();

		mail($email, $subject, $message, $headers);
		
		msg::success($name);
	}
 
	/* --- авторизация --- */
	function auth()
	{						
		$db = DataBase::getDB();		
		$vk_id = (int)$_GET['vk_id'];
		if (!empty($vk_id))
		{
			$result = $db->select("SELECT COUNT(*) as count FROM `users` WHERE vk_id=".$vk_id);
			if ($result[0]["count"] > 0) 
			{				
			}
			else 
			{				
				msg::success($result[0]["count"]);
			}
		}
		else
		{			
			if (!isset($_GET['email']) || !isset($_GET['password'])) msg::error("нет данных");					

			$email	  = (string)$_GET['email'];        
			$password = (string)$_GET['password'];		
			
			if (empty($email) || empty($password)) msg::warning("введите данные");										
				
			$email 		= $db->safe_string($email);
			$email 	  	= trim($email);				
			$password 	= $db->safe_string($password);
			$password 	= trim($password);				
						
			$result = $db->select("SELECT id,type,name,password FROM `users` WHERE email='".$email."' LIMIT 1");
			if (!$result) msg::error("внутренняя ошибка");
		
			if (!password_verify($password, $result[0]["password"])) 
			msg::error("не верные данные");	
		
			$_SESSION["user_id"] 	= $result[0]["id"];
			$_SESSION["user_name"]  = $result[0]["name"];						

			if(!$db->query("UPDATE `users` SET last_visit=NOW() WHERE id='".$_SESSION["user_id"]."'")) msg::error("last_visit error");
	
			msg::success($result);		
		}
	}
	
	/* --- обновить информацию --- */
	function update()
	{
		$db	= DataBase::getDB();
		
		if (!isset($_POST['name']) || !isset($_POST['surname']) || !isset($_POST['email'])) msg::error("нет данных");
		
		$name		= (string)$_POST["name"];
		$surname	= (string)$_POST["surname"];
		$email		= (string)$_POST["email"];
		
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			msg::error("не - email!");	
		}
 						
		$table = $db->query("UPDATE `users` SET name='".$name."', surname='".$surname."', email='".$email."' WHERE id='".$_SESSION["user_id"]."'");
		msg::success($table);	
	}
	
	/* --- авторизация через VK --- */	
	function authFromVK()
	{						
	  $db = DataBase::getDB();										
	}
	
	/* --- восстановить пароль --- */
	static function restorePassword($email)
	{  
	}
	
	/* --- активировать пароль --- */
	static function activatePassword($email)
	{  
	}
 
	/* --- удаление --- */
	static function delete()
	{  
	}
}
?>
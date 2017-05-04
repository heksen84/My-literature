<!---------------------------- 
 Ilya Bobkov 2017(c) 
------------------------------>
<?php 
if (isset($_GET["password"])) {
	echo $_GET["password"];
}
else
if (isset($_GET["key"])) 
{
	echo "<center>";
	echo "<form>";
	echo "<input type='text' placeholder='новый пароль' name='password'></input>"; 
	echo "<input type='submit'/>"; 
	echo "</center>";
	echo "</form>";		    
}
else echo "ошибка";
?>
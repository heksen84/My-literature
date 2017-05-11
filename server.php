<?php
/* 
-----------------------------------
 This is Server Part
 from Ilya Bobkov 2017
----------------------------------- */
include "php/class.msg.php";
include "php/class.mysqli.php";
include "php/class.util.php";
include "php/class.user.php";
include "php/class.record.php";
include "php/class.search.php";
include "php/class.lang.php";
include "php/class.text.php";
include "php/class.bookmark.php";
include "php/class.writer.php";
include "php/class.categories.php";

session_start();
/* ------------- [ одиночки ] ------------- */
$db		= DataBase::getDB();
$user		= User::getUser();	
$rec 		= Record::getRecord();	
$search		= Search::getSearch();
$text		= Text::getText();
$bookmark	= BookMark::getBookMark();
$writer		= Writer::getWriter();
$categories	= Categories::getCategories();
/* -------------- [ роутинг ] -------------- */
switch(strtoupper($_SERVER["REQUEST_METHOD"])) {	
	case "GET": {	
		if (isset($_GET["func"])) {    			    								
			switch ($_GET["func"]) 	 {				
			
				// -- пользователь --
				case "SRV_AuthUser": {
					$user->auth(); 		
					break;
				}
				case "SRV_RegUser": {
					$user->register(); 	
					break;
				}				
				// -- записи --
				case "SRV_UpdateRecord": {
					$rec->update();		
					break;	
				}
				case "SRV_DeleteRecord": {
					$rec->del();
					break;    		
				}
				case "SRV_GetRecords": {
					$rec->getRecords(); 
					break;
				}			
				case "SRV_GetRecordList": {
					$rec->getList();
					break;
				}
				case "SRV_ReadText": {		
					$text->read();					
					break;
				}			
				// --- закладки ---
				case "SRV_GetBookMark": {		
					$bookmark->get();					
					break;
				}			
				case "SRV_GetBookMarks": {		
					$bookmark->getBookMarks();					
					break;
				}
				// --- работы автора ---
				case "SRV_GetWriterWorks": {		
					$writer->getWorks();					
					break;
				}				
				// --- категории ---
				case "SRV_GetCategories": {		
					$categories->getAll();					
					break;
				}				
				case "SRV_GetCategoryFromId": {		
					$categories->getFromId();					
					break;
				}
			}
		}
	break;
	}	
	case "POST": {	
		if (isset($_POST["func"])) 
		{    			    							
			switch ($_POST["func"]) 
			{
				case "SRV_UpdatePersonalInfo": {
					$user->update(); 	
					break;
				}				
				case "SRV_ProcessRecord": {				
					switch($_POST["mode"]) {
						case "new": $rec->add(); break;
						case "edit": $rec->update(); break;
					}
					break;    		
				}				
				// -- закладка --
				case "SRV_SetBookMark": {
					$bookmark->set();
					break;    		
				}
				
				// -- режим отображения записи --
				case "SRV_SetPrivateMode": {
					$rec->setPrivateMode();
					break;    		
				}
			}		
		}
	  break;
	}
}
?>
/*
------------------------------
 Ilya Bobkov 2017(c) 
 https://github.com/heksen84
------------------------------*/
$(document).ready(function() 
{									
	var reader=null;
	if (localStorage.getItem("rec_id") != "") reader="web";

	sweetAlertInitialize();
	BlurInput();
		
	/* -- назад -- */
	$("#return_link").click(function() {
	 window.history.back();
	});

	/* -- убрать переход назад -- */
	if (localStorage.getItem("rec_id")!="") {	   	
			$("#return_link").off().click(function() {
			$(location).attr('href','/')
		});
	}
	
	/*
	----------------------------------
	ЗАКЛАДКА
	----------------------------------*/
	function GetBookMark()
	{
		if (localStorage.getItem("user_name")!="") {				
			$.ajax
			({
				url: "..//server.php",
				data: 
				{
					"func": "SRV_GetBookMark",                    
					"record_id": localStorage.getItem("read_data_id"),			
				},			
			}).done(function( data ) 
			{						
				var obj = jQuery.parseJSON(data);				
				switch(obj.answer)
				{
					case "error": error(obj.string); break;
					case "warning": warning(obj.string); break;
					case "success": 
					{																			
						if(obj.string != "") $("body,html").animate({ scrollTop: obj.string[0].position },0);
						break;
					}
				} 
			});
		}
	
		/* --- установить закладку --- */	
		$("#bookmark").click(function() 
		{		
			$.ajax
			({
				url: "..//server.php",
				data: 
				{
					"func": "SRV_SetBookMark",                    
					"record_id": localStorage.getItem("read_data_id"),
					"position": $(window).scrollTop(),
				}, 	
				method: "POST",
			}).done(function( data ) 
			{										
				var obj = jQuery.parseJSON(data);				
				switch(obj.answer)
				{
					case "error": error(obj.string); break;
					case "warning": warning(obj.string); break;
					case "success": 
					{
					}
				} 
			});
		});	
	}
						
	/*
	----------------------------------
	ПОЛУЧИТЬ ДАННЫЕ
	----------------------------------*/		
	$.ajax
	({
        url: "..//server.php",
        data: 
		{
            "func": "SRV_ReadText",                    
            "record_id": localStorage.getItem("read_data_id"),
	    "reader": reader,
        },
    }).done(function( data ) 
	{						
		var obj = jQuery.parseJSON(data);		
		localStorage.setItem("rec_id", ""); /* -- сбросить переход со статической страницы -- */
		switch(obj.answer) 
		{
			case "error": error(obj.string); break;
			case "warning": warning(obj.string); break;
			case "success": 
			{	
				/* данные записи */															
				$("#col-title").text(obj.string[0].title);
				$("#col-desc").text(obj.string[0].description);												
				$("#col-text").text(obj.string[0].text);								
				GetBookMark(); /* получить закладку */
			}
		}		
	});
	
	/*
	----------------------------------
	ПОДНЯТЬСЯ ВВЕРХ
	----------------------------------*/
	$(window).scroll(function() {
		if($(this).scrollTop() > 200) {
			if (localStorage.getItem("user_name") != "") {
				$("#bookmark").fadeIn();
			}
			$("#totop").fadeIn();			
		} 
		else { 
			$("#totop, #bookmark").fadeOut();
		}
	});
 
	/*
	------------------------------
	 вверх
	------------------------------*/
	$("#totop").click(function() {
		$("body,html").animate({scrollTop:0},0);
	});	
});
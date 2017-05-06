/*
------------------------------
 Ilya Bobkov 2017(c) 
 https://github.com/heksen84
------------------------------*/
$(document).ready(function() 
{								
	sweetAlertInitialize();
	BlurInput();
		
	/*
	-------------------------------------
	 назад
	-------------------------------------*/
	$("#return_link").click(function() {
//		alert(localStorage.getItem("read_data_id"));
//		if (localStorage.getItem("read_data_id")!="")
		window.history.back();
	});
	
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
		$("#bookmark").click(function() {		
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
				$("#col-title").append("<div id='title'>"+obj.string[0].title+"</div>");
				$("#col-desc").append("<div id='description'>"+obj.string[0].description+"</div>");												
				$("#col-text").append(obj.string[0].text);
				GetBookMark();				
			}
		} 
	});
	
	/*
	----------------------------------
	ПОДНЯТЬСЯ ВВЕРХ
	----------------------------------*/
	$(window).scroll(function() 
	{
		if($(this).scrollTop() > 200) 
		{
			if (localStorage.getItem("user_name") != "") 
			{
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
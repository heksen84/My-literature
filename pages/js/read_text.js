/*
------------------------------
 Ilya Bobkov 2017(c) 
 https://github.com/heksen84
------------------------------*/
$(document).ready(function() 
{											
	var reader = null;
	
	sweetAlertInitialize();
	BlurInput();

	if (localStorage.getItem("rec_id") != "") reader="web";
		
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
	закладка
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
	
		/*
		----------------------------------
		закладка
		----------------------------------*/		
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

	/* -- лайк -- */
	$("#like").click(function() 
	{
		$.ajax
		({
			url: "..//server.php",
			data: {
				"func": "SRV_SetLike",                    
				"record_id": localStorage.getItem("read_data_id"),				
			}, 			
		}).done(function( data ) 
		{										
			var obj = jQuery.parseJSON(data);				
			switch(obj.answer)
			{
				case "error": error(obj.string); break;
				case "warning": warning(obj.string); break;
				case "success": {
				}
			} 
		});
	});		
	
						
	/*
	----------------------------------
	читать текст
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
 					if (obj.string==""){
					$(location).attr('href', "text_not_found.php");									
					}
					/* данные записи */															
					$("#col-title").html(obj.string[0].title);
					$("#col-desc").html(obj.string[0].description);												
					$("#col-text").html(obj.string[0].text);								
				
					/* получить закладку */
					GetBookMark();
				}
			}		
		});
		
	/*
	----------------------------------
	вверх
	----------------------------------*/
	$(window).scroll(function() {
		if($(this).scrollTop() > 200) {
			if (localStorage.getItem("user_name") != "") {
				$("#bookmark").fadeIn();
			}
			$("#totop").fadeIn();			
		} 
		else $("#totop, #bookmark").fadeOut();
	});
 
 
	$("#totop").click(function() {
		$("body,html").animate({scrollTop:0},0);
	});	
});
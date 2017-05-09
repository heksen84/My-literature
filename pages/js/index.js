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
	----------------------
	ForStatic
	----------------------*/
	if (localStorage.getItem("recid") != "" && localStorage.getItem("recid") != undefined){
		localStorage.setItem("read_data_id", localStorage.getItem("recid"));		
		localStorage.setItem("recid","");
		$(location).attr("href", "pages/read_text.php");
	}
	else localStorage.setItem("read_data_id", "");	

	/*
	----------------------------------
	REGISTER
	----------------------------------*/	
	function RegisterDialogEventers()
	{						
		$("#reg").off().click(function() 
		{							
			$.ajax
			({
				url: "server.php",
				data: 
				{
					"func": "SRV_RegUser",
					"type": $("#reg_user_type").val(),
					"name": $("#reg_name").val(),
					"surname": $("#reg_surname").val(),
					"email": $("#reg_email").val(),
					"password":	$("#reg_password").val()
				}, async:false,
			}).done(function( data ) 
			{			
				var obj = jQuery.parseJSON(data);
				switch(obj.answer)
				{				
					case "error": error(obj.string); break;
					case "warning": warning(obj.string); break;
					case "success": 
					{														
						localStorage.setItem("auth_email", 		$("#reg_email").val());
						localStorage.setItem("auth_password", 	$("#reg_password").val());						
						localStorage.setItem("user_name", 		$("#reg_name").val());						
						switch($("#reg_user_type").val()){
						case "0": $(location).attr('href', "pages/reader.php"); break;
						case "1": $(location).attr('href', "pages/writer.php"); break;
						}
					}
				}			
			});
		});
	}
	
	/*
	-------------------------------------
	КАТЕГОРИИ
	-------------------------------------*/		
	$.ajax
	({
		url: "server.php",
		data: 
		{
			"func": "SRV_GetCategories",		
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
				$.each(obj.string, function(i, item) {
					$("#table").append("<tr data-id='"+item.id+"' class='menu_item'><td>"+item.name+"</td></tr>");			
				});
				
				$(".menu_item").click(function() {			
					localStorage.setItem("category_id", $(this).data("id"));					
					$(location).attr('href', "pages/search_result.php");									
				});
			}
		}			
	});		
		
	/* 
	---------------------------------------
	авторизация
	---------------------------------------*/
	$("#reader_auth_link").click(function() {
				
		$("#auth_email").val(localStorage.getItem("auth_email"));
		$("#auth_password").val(localStorage.getItem("auth_password"));		
		$("#AuthWindow").modal();
	});
	
	/*-------------------------------------
	   поиск
	-------------------------------------*/
	$("#button_search").click(function()
	{		
		localStorage.setItem("search_input", $("#search_input").val());
		$("#search_input").val("");
		$(location).attr('href', "pages/search_result.php");
	});
					
	// --- регистрация ---
	$("#reg_link").click(function() 
	{		
		$("#RegWindow input").val("");	
		$("#RegWindow").modal();		
		RegisterDialogEventers();
	});
		
	// --- авторизация через соц.сети ---
	$(".social_img").click(function() 
	{		
		$("#reg_link").trigger("click");
		$("#reg").off().click(function() 
		{				
			$("#RegWindow").modal("hide");			
		});
	});
	
	/*
	----------------------------------
	АВТОРИЗАЦИЯ
	----------------------------------*/
	$("#button_auth").click(function() 
	{							
		NProgress.start();
		
		$.ajax
		({
            url: "server.php",
            data: 
			{
                "func": "SRV_AuthUser",                    
                "email": $("#auth_email").val(),                
                "password":	$("#auth_password").val()
            }, 
			async:false,
        }).done(function( data ) 
		{											
			var obj = jQuery.parseJSON(data);				
			switch(obj.answer)
			{
				case "error": error(obj.string); break;
				case "warning": warning(obj.string); break;
				case "success": 
				{															
					localStorage.setItem("auth_email", $("#auth_email").val());
					localStorage.setItem("auth_password", $("#auth_password").val());
					localStorage.setItem("user_name", obj.string[0].name);					
					switch(obj.string[0].type){
					case "0": $(location).attr('href', "pages/reader.php"); break;
					case "1": $(location).attr('href', "pages/writer.php"); break;
					}
				}
			}			
			NProgress.done();
		});
	});	
});
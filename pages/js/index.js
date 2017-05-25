/*
------------------------------
 Ilya Bobkov 2017(c) 
 https://github.com/heksen84
------------------------------*/
$(document).ready(function() 
{				
	sweetAlertInitialize();
	BlurInput();		

    $(".link_article").hide();
	
	/* -- redirect -- */
	if (localStorage.getItem("rec_id") != "" && localStorage.getItem("rec_id") != undefined) 
	{
		localStorage.setItem("read_data_id", localStorage.getItem("rec_id"));		
		$(location).attr("href", "pages/read_text.php");
	}
	else 
	{
		localStorage.setItem("read_data_id", "");
	}
	
	// -- сбрасить настройки --
	localStorage.setItem("writer_record_id", "");	

		
	/*
	----------------------------------------------------------
	сохранить данные в localstorage
	----------------------------------------------------------*/
	function SaveAuthSettingsInStorage(email,pass,login,type){
		localStorage.setItem("auth_email", email);
		localStorage.setItem("auth_password", pass);
		localStorage.setItem("user_login", login);
		localStorage.setItem("user_type", type);		
	}

	/*
	----------------------------------
	REGISTER
	----------------------------------*/	
	function RegisterDialogEventers() 
	{									
		$("#button_reg").off().click(function() 
		{							
			$.ajax
			({
				url: "server.php",
				data: 
				{
					"func": "SRV_RegUser",
					"type": $("#reg_user_type").val(),
					"login": $("#reg_login").val(),					
					"email": $("#reg_email").val(),
					"password": $("#reg_password").val(),					
				}, 
				method: "POST", 
				async:false,
			}).done(function( data ) 
			{			
				var obj = jQuery.parseJSON(data);
				switch(obj.answer)
				{				
					case "error": error(obj.string); break;
					case "warning": warning(obj.string); break;
					case "success": {																			
							SaveAuthSettingsInStorage($("#reg_email").val(), $("#reg_password").val(), $("#reg_login").val(), $("#reg_user_type").val());
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
	--------------------------------------- */
	$("#reader_auth_link").click(function() 
	{				
		$("#auth_email").val(localStorage.getItem("auth_email"));
		$("#auth_password").val(localStorage.getItem("auth_password"));		
		$("#AuthWindow").modal();
	});
	
	/* диалог регистрации */
	function ShowRegisterDialog(login, launcher)
	{
		$("#RegWindow").modal().find("input").val("");		
		RegisterDialogEventers();
		
		if (launcher==0) 
		{
			$("#label_password, #reg_password").show();			
		}
		else 
		{
			$("#reg_login").val(login);						
			$("#label_password, #reg_password").hide();
		}		
	}
	
	/* vk auth */
	function authInfo(response)
	{			
		if (response.session) 
		{				
			VK.Api.call('users.get', { uids: response.session.mid, fields: 'contacts' }, 
			function(r) 
			{             
				if (r.response) 
				{                 
					if (r.response[0].first_name) 
					{																															
						$.ajax
						({
							url: "server.php",
							data: 
							{
								"func": "SRV_AuthFromVK",                    
								"vk_id": response.session.mid,								
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
									if (obj.string==0)
									{
										ShowRegisterDialog(r.response[0].first_name+response.session.mid, 1);
									}
								}
							}						
						});												
					}         
				}         
			});																
		}
		else 
		{
			warning("Для продолжения требуется авторизация в ВКонтакте!");
		}
	}
	
					
	// --- регистрация ---
	$("#reg_link").click(function() 
	{
		ShowRegisterDialog(null, 0);
	});
		
	// --- VK! ---
	$(".social_img").click(function() 
	{				
		VK.init({ apiId: 6041492 });
		VK.Auth.login(authInfo);
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
				case "success": {																				
					SaveAuthSettingsInStorage($("#auth_email").val(), $("#auth_password").val(), obj.string[0].login, obj.string[0].type);
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
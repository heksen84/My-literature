/*
------------------------------
 Ilya Bobkov 2017(c) 
 https://github.com/heksen84
------------------------------*/
$(document).ready(function() 
{				
	sweetAlertInitialize();
	BlurInput();		
	
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
	function SaveAuthSettingsInStorage(email,pass,name,type){
		localStorage.setItem("auth_email", email);
		localStorage.setItem("auth_password", pass);
		localStorage.setItem("user_name", name);
		localStorage.setItem("user_type", type);		
	}

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
					case "success": {																			
							SaveAuthSettingsInStorage($("#reg_email").val(), $("#reg_password").val(), $("#reg_name").val(), $("#reg_user_type").val());
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
						$("#reg_name").val(r.response[0].first_name);
						$("#reg_surname").val(r.response[0].last_name);
						/*$.ajax
						({
							url: "server.php",
							data: 
							{
								"func": "AuthVKUser",
								"vk_id": response.session.mid,
								"login": r.response[0].first_name+" "+r.response[0].last_name
							},
							method: "POST",
							async: false,
							error: function(jqXHR, textStatus)
							{
								if(textStatus == 'timeout') TimeOutError();												
							},					
							success: function(data) 
							{						
								obj = jQuery.parseJSON(cleanString(data));                        
								if (obj.answer == "warning") warning(obj.string);
								if (obj.answer == "error") error(obj.string);
								if (obj.answer == "success") 
								{																	
									NProgress.done();														
									SRV_SetVar("resolution", $(window).width()+"x"+$(window).height());
									UserName = obj.string;																												
									noty 
									({
										text         : 'Вы вошли через ВКонтакт',
										type         : 'information',
										dismissQueue : true,
										killer       : true,
										layout       : 'topCenter',
										theme        : 'defaultTheme',
										timeout		 : 4000,
										animation: 
										{
											open:  'animated bounceInRight',   // Animate.css class names
											close: 'animated bounceOutLeft',   // Animate.css class names				
										},
										callback: 
										{
											onShow: function() 
											{																					
											}
										}
									});
									ShowPersonasScreen();																						
								}
							}, timeout:timeout
						});	*/													
					}         
				}         
			});																
		}
		else 
		{
			warning("Для продолжения требуется авторизация в ВКонтакте!");
		}
	}
	
	function ShowRegisterDialog(launcher)
	{
		$("#RegWindow").modal().find("input").val("");
		if (launcher==1){			
			VK.init({ apiId: 6041492 });
			VK.Auth.login(authInfo);
		}				
		RegisterDialogEventers();
	}
					
	// --- регистрация ---
	$("#reg_link").click(function() 
	{
		ShowRegisterDialog(0);
	});
		
	// --- VK! ---
	$(".social_img").click(function() 
	{				
		ShowRegisterDialog(1);	
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
					SaveAuthSettingsInStorage($("#auth_email").val(), $("#auth_password").val(), obj.string[0].name, obj.string[0].type);
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
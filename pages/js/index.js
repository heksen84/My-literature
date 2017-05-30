/*
------------------------------
 Ilya Bobkov 2017(c) 
 https://github.com/heksen84
------------------------------*/
/* -- документ загружен -- */	
$(document).ready(function() 
{					
	$(".link_article").hide();		
	
	sweetAlertInitialize();
	BlurInput();		    
	
	/*
	----------------------------------------------------------
	сохранить данные в localstorage
	----------------------------------------------------------*/
	function SaveAuthSettingsInStorage(email,pass,login,type){
		localStorage.setItem("auth_email", email);
		localStorage.setItem("auth_password", pass);
		localStorage.setItem("user_login", login);
		localStorage.setItem("internal_login", login); // для личного кабинета
		localStorage.setItem("user_type", type);		
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
	
	/* 
	---------------------------------------
	восстановить доступ
	--------------------------------------- */
	$("#password_restore_link").click(function() 
	{						
		
		/* очистить поле email */
		$("#PasswordRestoreWindow").modal().find("input").val("");		
		
		/* кнопка восстановить */
		$("#button_restore_access").click(function() {
			if ($("#restore_email").val()=="") {
				$("#restore_email").focus();
				warning("введи email");				
			}
			else
			if (!ValidateEmail($("#restore_email").val())) {
				$("#restore_email").focus();
				warning("введи нормальный email");				
			}
			else
			$.ajax
			({
				url: "server.php",
				data: 
				{
					"func": "SRV_RestorePassword",                    
					"email": $("#restore_email").val(),								
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
						swal("","Новый пароль отправлен на указанный email","success");							
						$("#PasswordRestoreWindow").modal("hide");
						$("#AuthWindow").modal("hide");
					}
				}						
			});									
		});
	});
	
	/*
	----------------------------------
	REGISTER
	----------------------------------*/	
	function RegisterAjax(vk_id) 
	{						
		$("#button_reg").off().click(function() 
		{										
			if (!ValidateEmail($("#reg_email").val())) {
				$("#reg_email").focus();
				warning("введи нормальный email");				
			}
			else
			$.ajax
			({
				url: "server.php",
				data: 
				{
					"func": "SRV_RegUser",
					"vk_id": vk_id,
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
							if (vk_id!="") {
								localStorage.setItem("social_auth", "true"); 
							}
							else localStorage.setItem("social_auth", "false");																				
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
		
	/* --- диалог регистрации --- */
	function ShowRegisterDialog(launcher, login, vk_id)
	{		
		$("#RegWindow").modal().find("input").val("");				
		
		/* стандартная регистрация */
		if (launcher == 0) {
			$("#label_password, #reg_password").show();
			RegisterAjax(null);					
		}
		else 
		{			
			/* регистрация через vk */
			$("#reg_login").val(login);						
			$("#label_password, #reg_password").hide();
			RegisterAjax(vk_id);			
		}		
	}
	
	/* --- vk авторизация ---*/
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
									if (obj.string=="") {										
										ShowRegisterDialog(1, r.response[0].first_name+response.session.mid, response.session.mid)
									}
									else 
									{
										localStorage.setItem("social_auth", "true"); 
										localStorage.setItem("internal_login", obj.string[0].login);										
										switch(obj.string[0].type){
										case "0": $(location).attr('href', "pages/reader.php"); break;
										case "1": $(location).attr('href', "pages/writer.php"); break;
										}										
									}
								}
							}						
						});												
					}         
				}         
			});																
		}
		else {
			warning("Для продолжения требуется авторизация в ВКонтакте!");
		}
	}
						
	// --- регистрация ---
	$("#reg_link").click(function() 
	{
		ShowRegisterDialog(0, null, null);
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
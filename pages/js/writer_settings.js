/*
------------------------------
 Ilya Bobkov 2017(c) 
 https://github.com/heksen84
------------------------------*/
$(document).ready(function() 
{							
	sweetAlertInitialize();

	/* -- настройки писателя -- */
	function ShowWriterSettings()
	{
		$("#content").empty();		
		$("#content").append("<h5 style='margin-left:8px'>Личные данные писателя</h5>");
		$("#content").append("<input type='text' class='form-control input' placeholder='имя' id='name'></input>");		
		$("#content").append("<input type='text' class='form-control input' placeholder='email' id='email'></input>");		
		$("#content").append("<button class='btn btn-primary' data-toggle='modal' data-target='.bd-example-modal-lg' id='button_save'>сохранить</button>");

		BlurInput();
		
		/* --- сохранить личные данные --- */
		$("#button_save").off().click(function() 
		{
			if ($("#name").val()=="" || $("#email").val()=="") {				
				error("заполните поля");
			}
			else
			$.ajax
			({
				url: "..//server.php",
				data: {
					"func": 	"SRV_UpdatePersonalInfo",
					"name": 	$("#name").val(),					
					"email": 	$("#email").val(),					
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
						localStorage.setItem("user_name", $("#name").val());
						swal("сохранено");
					}
				}		
			}); 		
		});
	}
	
	/*
	---------------------------
	 Меню
	--------------------------- */
	$("#menu li").click(function() 
	{
		$("#menu li").css("font-weight", "");
		$(this).css("font-weight","bold");
		switch($(this).index())
		{
			case 0: ShowWriterSettings(); break;
			case 1: history.back(); break;			
		}
	}).eq(0).click(); // сразу кликнуть
});
/*
------------------------------
 Ilya Bobkov 2017(c) 
 https://github.com/heksen84
------------------------------*/
$(document).ready(function() 
{					

	sweetAlertInitialize(); // -- инит messages dialog
	BlurInput();			// -- input потеря фокуса

	// ---------------------------
	// Закладки
	// ---------------------------
	function ShowBookMarks() {
		$("#content").empty();
		$("#content").append("<h5 style='margin-left:8px'>Мои закладки</h5>");		
		$("#content").append("<table class='table table-bordered table-hover table-sm' id='table'><tr><th style='width:5%'>№</th><th>название</th><th></th></tr></table>");
		
		/* получить заметки */
		$.ajax
		({
			url: "..//server.php",
			data: {
				"func": "SRV_GetBookMarks" 
			}, async:false,
		}).done(function( data )				
		{														
			var obj = jQuery.parseJSON(data);								
			switch(obj.answer)
			{
				case "error": error(obj.string); break;
				case "warning": warning(obj.string); break;
				case "success": {									
					$.each(obj.string, function(i, item) {
						$("#table").append("<tr class='tr_bookmark' data-id='"+item.id+"'><td>"+(i+1)+"</td><td>"+item.title+"</td><td style='color:yellow;font-weight:bold'></td></tr>");					
					});
					
					$(".tr_bookmark").off().click(function() {						
						localStorage.setItem("read_data_id", $(this).data("id"));
						$(location).attr('href', "read_text.php");
					});
					
				}
			}		
		}); 
	}
	
	// ---------------------------
	// Личная инфа
	// ---------------------------
	function ShowUserData() {
		$("#content").empty();		
		$("#content").append("<h5 style='margin-left:8px'>Личные данные</h5>");
		$("#content").append("<input type='text' class='form-control input' placeholder='имя' id='name'></input>");
		$("#content").append("<input type='text' class='form-control input' placeholder='фамилия' id='surname'></input>");
		$("#content").append("<input type='text' class='form-control input' placeholder='email' id='email'></input>");
		//$("#content").append("<input type='text' class='form-control input' placeholder='старый пароль'></input>");
		//$("#content").append("<input type='text' class='form-control input' placeholder='новый пароль'></input>");
		$("#content").append("<button class='btn btn-primary' data-toggle='modal' data-target='.bd-example-modal-lg' id='button_save'>сохранить</button>");
		
		/* --- сохранить личные данные --- */
		$("#button_save").off().click(function() {

			if ($("#name").val()=="" || $("#surname").val()=="" || $("#email").val()=="") {				
				error("заполните поля");
			}
			else
			$.ajax
			({
				url: "..//server.php",
				data: 
				{
					"func": 	"SRV_UpdatePersonalInfo",
					"name": 	$("#name").val(),
					"surname": 	$("#surname").val(),
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
					case "success": {									
						swal("сохранено");
					}
				}		
			}); 		
		});
	}
	
	// ---------------------------
	// Меню
	// ---------------------------
	$("#menu li").click(function() {
		$("#menu li").css("font-weight","");
		$(this).css("font-weight","bold");
		switch($(this).index())
		{
			case 0: ShowBookMarks(); break;
			case 1: ShowUserData(); break;
			case 2: $(location).attr('href', "/"); break;
		}
	}).eq(0).click(); // сразу кликнуть

});
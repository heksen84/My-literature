/*
----------------------------------
 *** JQUERY ***
----------------------------------*/	
$(document).ready(function() 
{						
	var show_max_records = 200;

	sweetAlertInitialize(); // -- инит messages dialog
	BlurInput();		// -- input потеря фокуса
	
	/* -- загрузить результаты -- */
	function LoadResults(start)
	{
		NProgress.start();
		$.ajax
		({
			url: "..//server.php",
			data: 
			{
			"func": "SRV_GetCategoryFromId", 
			"category_id": localStorage.getItem("category_id"),
			"start": start,
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
					
					/* -- основные данные -- */
					$.each(obj.string, function(i, item) 
					{					
					  $("#tbody").append("<tr data-id='"+item.id+"' class='table_item'><td>"+(i+1)+"</td><td><div class='title_cell'>"+item.title+"</div></td><td style='text-align:center'><div class='author_cell'>"+item.surname+"&nbsp;"+item.name+"</div></td><td><div class='like_cell'>0</div></td></tr>");					
					});
										
					/* -- лайки -- */
					$.each(obj.string, function(i, item) 
					{					
						$.ajax
						({
							url: "..//server.php",
							data: 
							{
								"func": "SRV_GetLikes",                    
								"record_id": item.id,			
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
									$("#tbody tr").eq(i).find(".like_cell").text(obj.string);
									break;
								}
							} 
						});					
					});
					
					/* отобразить текст */
					$(".table_item").click(function() {
						localStorage.setItem("read_data_id", $(this).data("id"));
						$(location).attr("href", "read_text.php");
					});
										
					$("body").append("<button type='button' class='btn btn-danger' id='load_more'>ещё</button>");
					
					/* загрузить больше */
					$("#load_more").click(function() 
					{
						$(this).remove();
						$("#tbody").empty();						
						LoadResults(start+=show_max_records);						
					});

					if ($("#tbody tr").length < show_max_records) $("#load_more").remove();					
				}
			}
			NProgress.done();		
		}); 
	}
	
	LoadResults(0);
					
});
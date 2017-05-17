/*
----------------------------------
 *** JQUERY ***
----------------------------------*/	
$(document).ready(function() 
{						

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
					$.each(obj.string, function(i, item) 
					{					
					$("#tbody").append("<tr data-id='"+item.id+"' class='table_item'><td>"+(i+1)+"</td><td><div class='cell'>"+item.title+"</div></td><td style='text-align:center'><div class='cell'>"+item.surname+" "+item.name+"</div></td><td class='like'>999</td></tr>");					
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
						LoadResults(start+=50);						
					});

					if ($("#tbody tr").length < 20) $("#load_more").remove();					
				}
			}
			NProgress.done();		
		}); 
	}
	
	LoadResults(0);
					
});
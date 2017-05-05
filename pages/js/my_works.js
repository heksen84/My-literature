/*
------------------------------
 Ilya Bobkov 2017(c) 
 https://github.com/heksen84
------------------------------*/
$(document).ready(function() 
{			
	sweetAlertInitialize();	
	
    /* 
	---------------------------
     обновить таблицу
    --------------------------- */
    function UpdateMyWorksTable()
    {	
		var i = 1;
        var num_strings = $("#my_works_tabletr").length;
        $("#my_works_table tbody tr td:first-child").each(function() 
		{
            if (i != num_strings) $(this).html(i);
            i++;
        });       
	}

	/* получить список работ */
	$.ajax
	({
		url: "..//server.php",
		data: {	"func": "SRV_GetWriterWorks" }, 
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
					$("#tbody").append("<tr data-id='"+item.id+"'><td>"+(i+1)+"</td><td class='table_item'>"+item.title+"</td><td class='delete_record' title='удалить запись'>X</td></tr>");					
				});
				
				/* показать запись в редакторе */
				$(".table_item").click(function() 
				{
					localStorage.setItem("read_data_id", $(this).parent().data("id"));
					$(location).attr('href', "writer.php");
				});
				
				/* удалить запись */
				$(".delete_record").click(function() 
				{
					var element = $(this);
					
					/* ajax */
					swal
					({	
						title: "Удалить работу?",
						text: $(this).parent().find(".table_item").text(),
						type: "warning",
						showCancelButton: true,
						confirmButtonColor: "#DD6B55",
						confirmButtonText: "Да",
						cancelButtonText: "Нет",
						closeOnConfirm: true,
						closeOnCancel: true,
						allowEscapeKey:	true
					},
					function(isConfirm) 
					{
						if (isConfirm) 
						{							
							$.ajax
							({
								url: "..//server.php",
								data: {	"func": "SRV_DeleteRecord", "record_id": element.parent().data("id") }, 
							}).done(function( data )				
							{									
								var obj = jQuery.parseJSON(data);					
								switch(obj.answer)
								{
									case "error": error(obj.string); break;
									case "warning": warning(obj.string); break;
									case "success": 
									{	
										element.parent().remove();
										UpdateMyWorksTable();
									}
								}
							});														
						}
					});					
				});
			}
		}		
	});
});
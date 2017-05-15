/*
------------------------------
 Ilya Bobkov 2017(c) 
 https://github.com/heksen84
------------------------------*/
$(document).ready(function() 
{							
	sweetAlertInitialize();
	BlurInput();

	// ---------------------------
	// Меню
	// ---------------------------
	$("#menu li").click(function() {
		$("#menu li").css("font-weight","");
		$(this).css("font-weight","bold");
		switch($(this).index())
		{
		case 1: $(location).attr('href', "/"); break;
		}
	}).eq(0).click(); // сразу кликнуть
});
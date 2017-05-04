// --------------------------------
// Developed by Ilya Bobkov
// --------------------------------
function BlurInput()
{	
	$( "input" ).keypress(function(e) {
		if(e.which == 13) {					
		$(this).blur();
		}
	});
}
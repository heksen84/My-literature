// --------------------------------
// Developed by Ilya Bobkov
// --------------------------------
function BlurInput(){	
	$( "input" ).keypress(function(e) {
		if(e.which == 13) {					
		$(this).blur();
		}
	});
}

function ByteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
}

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

function ValidateEmail($email) {
 var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
 return emailReg.test($email);
}

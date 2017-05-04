/* ------------------------------
   float number format plugin
   by Ilya Bobkov 2017
  ------------------------------- */
(function( $ ) {
  $.fn.float = function() 
  {  
   	$(this).keypress(function(event) {
		if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
		event.preventDefault();
		}
	});
  };
})(jQuery);
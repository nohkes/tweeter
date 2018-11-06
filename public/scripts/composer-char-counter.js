$(document).ready(function() {
	var maxChar = 140;
	$(".new-tweet textarea").on('keyup', function(){
		var lengthOfInput = $(this).val().length;
		var charLength = maxChar - lengthOfInput;
		if(charLength <= 0) {
			$(this).siblings("span").text(charLength).css("color", "red");
		} else {
			$(this).siblings("span").text(charLength);
		}
	});
});
 
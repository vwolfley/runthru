$(document).ready(function(){
	$(".trigger").click(function(){
		$(".panel").toggle("fast");
		$(this).toggleClass("active");
		return true;
	});
});	
$(document).ready(function(){
	$(".trigger2").click(function(){
		$(".panel2").toggle("fast");
		$(this).toggleClass("active");
		return false;
	});
});
$(document).ready(function(){
	$(".trigger3").click(function(){
		$(".panel3").toggle("fast");
		$(this).toggleClass("active");
		return false;
	});
});
$(document).ready(function(){
	$(".trigger4").click(function(){
		$(".panel4").toggle("fast");
		$(this).toggleClass("active");
		return false;
	});
});



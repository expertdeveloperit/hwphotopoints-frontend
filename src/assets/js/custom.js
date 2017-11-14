$(document).ready(function(){
		



	  var bodyHeight = $("body").height();
	  var winHeight = $(window).height();
  	  var header =  $(".header-area").height();
  	 var footer =  $(".footer-area").height(); 
  	 
	  if(winHeight > bodyHeight){
	  	var headerFooter = header + footer;
	  	var calculate  = winHeight - headerFooter -150;

	    $(".body-data").css("min-height",calculate);
	  }

$("#sarea").addClass("test");
	
});


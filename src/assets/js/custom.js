$(document).ready(function(){
	setTimeout(function(){
	  var bodyHeight = $("body").height();
	  var winHeight = $(window).height();
	  if(winHeight > bodyHeight){
	    $("body").css("min-height",winHeight);
	    $(".copyright").addClass("fixed-footer");
	  }
	  console.log("onload");
	},1000);  

  	$(".navbar a").click(function(){
  	  	setTimeout(function(){
		  var bodyHeight = $("body").height();
		  var winHeight = $(window).height();
		  console.log(bodyHeight +" "+winHeight );
		  if(winHeight >= bodyHeight){
		    $("body").css("min-height",winHeight);
		    $(".copyright").addClass("fixed-footer");
		  }else{
		  	$("body").removeAttr("min-height");
		    $(".copyright").removeClass("fixed-footer");
		  }  
		  console.log("click");
		},1000);
  	});
});

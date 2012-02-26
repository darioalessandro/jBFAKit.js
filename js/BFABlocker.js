/**
 * @author Dario Lencina
 */

if(typeof BFA== "undefined"){
	var BFA={};
}

BFA.blocker={
	show:function(onClickCallback){
		$('header').after("<div class=\"blocker\"></div>");
		$(".blocker").live("click", onClickCallback);
	},
	hide:function(){
		$(".blocker").die("click");
		$(".blocker").remove();		
	}
};

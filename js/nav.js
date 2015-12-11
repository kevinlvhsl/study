// JavaScript Document
$(function(){
	
	
	$(".nav ul a").each(function(index, element) {
     	//给每一个a链接指定打开地方为 frame-main框架中
        $(this).attr("target","frame-main");
		//给a链接指定标题提示为html文件的文件名
		var tishi =$(this).attr("href").split(".")[0];
		$(this).attr("title","这里是"+tishi);
    });
	$("p.type span.xiaoguo").click(function(){
		$(".note_ul").fadeOut(300).parent().find(".xiaoguo_ul").show(500);
	});
	$("p.type span.note").click(function(){
	$(".xiaoguo_ul").fadeOut(300).parent().find(".note_ul").show(500);
});
});
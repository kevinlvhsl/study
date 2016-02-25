(function($){
	//3d动画图片
	$.kevin3DPic = function(domId){
		var actions = {
			isMobile: function(){//检测用户设备
				var userAgent =navigator.userAgent.toLowerCase();
				var isIpad,isIphoneOs,isMidp,isUc7,isUc,isAndroid,isCE,isWM,isWebview;
				isIpad = userAgent.match(/ipad/i) == 'ipad',
				isIphoneOs = userAgent.match(/iphone os/i) == "iphone os",
				isMidp = userAgent.match(/midp/i) == "midp",
				isUc7 = userAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
				isUc = userAgent.match(/ucweb/i) == "ucweb",
				isAndroid = userAgent.match(/android/i) == "android",
				isCE = userAgent.match(/windows ce/i) == "windows ce",
				isWM = userAgent.match(/windows mobile/i) == "windows mobile",
				isWebview = userAgent.match(/webview/i) == "webview";
				return (isIpad || isIphoneOs || isMidp || isUc7 || isUc
					|| isAndroid || isCE || isWM || isWebview)
			},
			stopDefault: function(e){//阻止浏览器默认事件方法：
				var e = e || window.event;
				if (e.preventDefault) {
					e.preventDefault()
				}else{
					e.returnValue =false;
				}
			},
			//根据设备选择触发事件
			touchStart: function(){
				return actions.isMobile() ? 'touchstart' : 'mousedown'
			},
			touchMove:function(){
				return actions.isMobile() ? 'touchmove' : 'mousemove'
			},
			touchEnd: function(){
				return actions.isMobile() ? 'touchend' : 'mouseup'
			}
		}
		Stack = {
			This_ul : $('#'+domId) || $('.'+domId).eq(0),
			windowHeight : window.innerWidth,
			posis : {
				startX : 0,
				startY : 0,
				moveX : 0,
				moveY : 0,
				endX : 0,
				endY : 0
			} ,
			shownext : function(){
				var ul = this.This_ul;
				var lis = ul.find('li');
				for(var i=1; i<= 4; i++){
					lis.eq(i).attr('index',i);
					console.log(lis.eq(i))
					lis.eq(i).find('img').addClass('backinit'+(i+1))
				}
				setTimeout(function(){
					lis.find('img').attr('class','');
					lis.attr('class','');
					var firstLI = lis.eq(0).html();
					lis.eq(0).remove();
					
					ul.append('<li>'+ firstLI +'</li>');
				},500);
			},
			monitor : function(){
				var This  = this;
				var t = actions;
				var p = This.posis;
				var touchList = [t.touchStart(),t.touchMove(),t.touchEnd()];
				/*for (var i =0,len = touchList.length ; i < len; i++) {
					This.This_ul.on(touchList[i], 'li', function(){
						var e = e || window.event;
						t.stopDefault(e);
						switch (i) {//根据不同事件分别处理
							case 0 :
								if (t.isMobile()) {
									var touch = e.touches[0];
									p.startX = touch.pageX;
									p.startY = touch.pageY;
								}else{
									p.startX = e.pageX;
									p.startY = e.pageY;
								}
								p.moveX = 0;
								p.moveY = 0;
								break;
							case 1 :
								if (t.isMobile()) {
									var touch = e.touches[0];
									p.endX = touch.pageX;
									p.endY = touch.pageY;
								}else{
									p.startX = e.pageX;
									p.startY = e.pageY;
								}
								p.moveX = p.endX - p.startX;
								p.moveY = p.endY - p.startY;
								break;
							case 2 :
								if (Math.abs(p.moveY) < This.windowHeight * 0.1 && p.moveX < 0) {
									$(this).attr('class', 'hideToLeft');
									This.shownext();
								}else if (Math.abs(p.moveY < This.windowHeight * 0.1 && p.moveX > 0)){
									$(this).attr('class', 'hideToRight');
									This.shownext();
								}else break;
								break;
						}
					});
				};*/
				This.This_ul.on(t.touchStart(), 'li', function(e){
					var e = e || window.event;
					t.stopDefault(e);
					if (actions.isMobile()) {
						var touch = event.targetTouches[0];
						p.startX = touch.pageX;
						p.startY = touch.pageY;
					}else{
						p.startX = e.pageX;
						p.startY = e.pageY;
					}
						p.moveX = 0;
						p.moveY = 0;
				});
				This.This_ul.on(t.touchMove(), 'li', function(e){
					console.log('move')
					var e = e || window.event;
					t.stopDefault(e);
					if (actions.isMobile()) {
						var touch = event.targetTouches[0];
						p.endX = touch.pageX;
						p.endY = touch.pageY;
					}else{
						p.endX = e.pageX;
						p.endX = e.pageY;
					}
					p.moveX = p.endX - p.startX;
					p.moveY = p.endY - p.startY;
				});
				This.This_ul.on(t.touchEnd(), 'li', function(e){
					var e = e || window.event;
					t.stopDefault(e);
					if (Math.abs(p.moveY) < This.windowHeight * 0.1 && p.moveX < 0) {
						$(this).attr('class', 'hideToLeft');
						This.shownext();
						
					}else if (Math.abs(p.moveY < This.windowHeight * 0.1 && p.moveX > 0)){
						$(this).attr('class', 'hideToRight');
						This.shownext();
					}
				});
			}
			
		}
	 Stack.monitor();
}

})(jQuery);

$(function(){
	$.kevin3DPic('list');
})
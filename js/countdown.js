var WINDOW_WIDTH=1366;
var WINDOW_HEIGHT=468;
var REDIUS =8;
var MARGIN_LEFT=70;
var MARGIN_TOP =50;
var BEITA =0.55; //小球碰撞摩察系数
var smallR =0.015; //每次小球变小的比例
var endTime =new Date(2015,9,31,23,33,1,000);//终止时间
var curTimeSeconds=0;

var balls=[];
var colors =["#ffff99","#ccffcc","#ccff66","#ffcc33","#cccccc","#99ff99","#66ff99","#3300ff","#ff3399","#00cc00","#c1fb62","#ffffcc","#ffff33","#33ffff","#00ff66","#cc6633","#ccff33","#3300cc","#000000","#ff3333","#000033","#333300","#ff33cc","#ffffcc"]
window.onresize=function(){
	WINDOW_WIDTH =document.body.clientWidth;
	WINDOW_HEIGHT =document.documentElement.clientHeight ;//alert(document.documentElement.clientHeight );
	REDIUS =Math.round(WINDOW_WIDTH*4/5/109)-1;
	MARGIN_LEFT =Math.round(WINDOW_WIDTH/10);
	MARGIN_TOP =Math.round(WINDOW_HEIGHT/5);	
}
window.onload=function(){
	
	WINDOW_WIDTH =document.body.clientWidth;
	WINDOW_HEIGHT =document.documentElement.clientHeight ;//alert(document.documentElement.clientHeight );
	REDIUS =Math.round(WINDOW_WIDTH*4/5/109)-1;
	MARGIN_LEFT =Math.round(WINDOW_WIDTH/10);
	MARGIN_TOP =Math.round(WINDOW_HEIGHT/5);
	
	var canvas=document.getElementById("mycanvas");
	var context =canvas.getContext("2d");
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;
	curTimeSeconds =getCurrentTimeSecondes();
	
	render(context)
	//定时刷新
	setInterval(function(){
		render(context)
		update()   //监测秒数变化
		},100);
}

/***
将数字区域 根据当前时间画上去
*/
function render(cxt){
	var hours=parseInt(curTimeSeconds/3600);
	var minutes=parseInt((curTimeSeconds-hours*3600)/60);
	var seconds=curTimeSeconds%60;
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);/*每次绘制一个数字 ( x, y , 数值,  context)*/
	renderDigit(MARGIN_LEFT+15*(REDIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT+30*(REDIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+39*(REDIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt); /*每次绘制一个数字 ( x, y , 数值,  context)*/
	renderDigit(MARGIN_LEFT+54*(REDIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT+69*(REDIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+78*(REDIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt); /*每次绘制一个数字 ( x, y , 数值,  context)*/
	renderDigit(MARGIN_LEFT+94*(REDIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);
	
	//在时间变化之后，马上把天添加的小球画出来，并给动画
	for (var i=0;i<balls.length;i++){
		cxt.fillStyle=balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,balls[i].r,0,2*Math.PI,true)
		cxt.closePath()
		cxt.fill()
	}
}

/**
获取当前对应时间点，与结束时间相差的秒数
**/
function getCurrentTimeSecondes(){
	var curTime =new Date();
	var ret = endTime.getTime()-curTime.getTime();
	ret= Math.round(ret/1000)
	return ret>0? ret:0;
}

/*每一次执行一次刷新后，都去监控秒钟是
否有变化，有变化，则将变化的秒钟重新赋值给当
前相差秒数*/
function update(){
	var nextTimeSeconds =getCurrentTimeSecondes()
	var nextHours=parseInt(nextTimeSeconds/3600);
	var nextMinutes=parseInt((nextTimeSeconds-nextHours*3600)/60);
	var nextSeconds=nextTimeSeconds%60;
	
	var curHours=parseInt(curTimeSeconds/3600);
	var curMinutes=parseInt((curTimeSeconds-curHours*3600)/60);
	var curSeconds=curTimeSeconds%60;
	
	if( nextSeconds != curSeconds) {
		//小时的十位数
		if(parseInt(nextHours/10)!=parseInt(curHours/10)){
			//小时十位数的位置  MARGIN_LEFT ,MARGIN_TOP 添加的数字为当前显示的数字
			addballs(MARGIN_LEFT,MARGIN_TOP,parseInt(nextHours/10))
		}
		//小时的个位数
		if(parseInt(nextHours%10)!=parseInt(curHours%10)){
			//小时十位数的位置  MARGIN_LEFT ,MARGIN_TOP 添加的数字为当前显示的数字
			addballs(MARGIN_LEFT+15*(REDIUS+1),MARGIN_TOP,parseInt(nextHours%10))
		}
		
		//分钟的十位数
		if(parseInt(nextMinutes/10)!=parseInt(curMinutes/10)){
			//小时十位数的位置  MARGIN_LEFT ,MARGIN_TOP 添加的数字为当前显示的数字
			addballs(MARGIN_LEFT+39*(REDIUS+1),MARGIN_TOP,parseInt(nextMinutes/10))
		}
		//分钟的个位数
		if(parseInt(nextMinutes%10)!=parseInt(curMinutes%10)){
			//小时十位数的位置  MARGIN_LEFT ,MARGIN_TOP 添加的数字为当前显示的数字
			addballs(MARGIN_LEFT+54*(REDIUS+1),MARGIN_TOP,parseInt(nextMinutes/10))
		}
		
		//秒钟的十位数
		if(parseInt(nextSeconds/10)!=parseInt(curSeconds/10)){
			//小时十位数的位置  MARGIN_LEFT ,MARGIN_TOP 添加的数字为当前显示的数字
			addballs(MARGIN_LEFT+78*(REDIUS+1),MARGIN_TOP,parseInt(nextSeconds/10))
		}
		//秒钟的个位数
		if(parseInt(nextSeconds%10)!=parseInt(curSeconds%10)){
			//小时十位数的位置  MARGIN_LEFT ,MARGIN_TOP 添加的数字为当前显示的数字
			addballs(MARGIN_LEFT+94*(REDIUS+1),MARGIN_TOP,parseInt(nextSeconds/10))
		}
		curTimeSeconds=nextTimeSeconds; //秒钟发生了变化就把差距秒数变动（一秒钟检测次数为interval的频率）
	}
	updateBalls()  //绘制完倒计时的时间后，更新一下添加小球的状态，让他们继续弹跳
}

/**
* 根据变化的时间所在的位置(x，y)和要绘制的数字 将小球实例化并且添加到balls数组中
每个数字上都有很多个小球，必须两次循环才能定位到每一个小球
*/
function addballs(x,y,num){
	for (var i=0;i<digit[num].length;i++){
		for(var j=0; j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){ //为1的才需要添加小球
			
				var ball={
					x:x+j*2*(REDIUS+1)+(REDIUS+1),
					y:y+i*2*(REDIUS+1)+(REDIUS+1),
					r:REDIUS,
					color:colors[Math.floor(randomNum(0,colors.length))],
					vx: Math.pow(-1 , Math.ceil(randomNum(1,1000)))*6,//+4  -4  -1的奇数次方为负，偶数次方为正
					vy:randomNum(-1,-3),
					g:randomNum(1.5,4)
				}	
				
				balls.push(ball)   //把小球放到数组中
			}
		}
	}
	console.log(balls.length)
}

/**
将balls数组循环一遍跟新小球状态
*/
function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x +=balls[i].vx;
		balls[i].y +=balls[i].vy;
		balls[i].r -=balls[i].r*smallR;
		balls[i].vy +=balls[i].g;
		if(balls[i].y>WINDOW_HEIGHT-balls[i].r){
			balls[i].y=WINDOW_HEIGHT-balls[i].r;
			balls[i].vy =-balls[i].vy*BEITA;
		}
		if(balls[i].y<REDIUS){
			balls[i].y=REDIUS;
			balls[i].vy =-balls[i].vy*BEITA;
		}	
		//超出频幕的小球从数组中移除掉
		if(balls[i].x+balls[i].r<0||balls[i].x>WINDOW_WIDTH+balls[i].r){
			balls.remove(i)
		}
		//超出频幕的小球从数组中移除掉
		/*var count =0;
		if(balls[i].x+balls[i].r>0&&balls[i].x+balls[i].r<WINDOW_WIDTH){ //还在窗口内的小球
			//balls.remove(i)
			balls[count++]=balls[i]   //把还在窗口内的小球放到前面 从0 一直到 count
		}
		while(balls.length>count){
			balls.pop()  //只要长度大于count个 后面的都是已经出去了的  就从后面pop删除
		}*/
	}
}

/***
**画单个数字
x： 数字区域x开始坐标 y y轴左上角坐标  num ： 要画的数字   cxt ：canvas上下文
*/
function renderDigit(x,y,num,cxt){
	cxt.fillStyle="rgb(0,102,153)";//给绘制的数字默认颜色 蓝色
	//二维循环遍历dijit的每个点
	for (var i=0;i<digit[num].length ;i++ )//先遍历是哪个数字，然后遍历
	{
		for (var j=0;j<digit[num][i].length ; j++ )
		{
			if (digit[num][i][j]==1)//该点要绘制圆 
			{
				cxt.beginPath();
				cxt.arc(x+j*2*(REDIUS+1)+(REDIUS+1),y+i*2*(REDIUS+1)+(REDIUS+1),REDIUS,0,2*Math.PI,false) //绘制弧线的参数，根据x，y 来定位
				cxt.closePath()
				cxt.fill();
			}
		}
	}
}

/**
产生n到m之间的随机数
*/
function randomNum(n,m){
	if(n>m) return m;
 return n+Math.random()*(m-n)
}

 /*
　 *　方法:Array.remove(dx)
　 *　功能:删除数组元素.
　 *　参数:dx删除元素的下标.
　 *　返回:在原数组上修改数组
　 */
Array.prototype.remove=function(dx)
　{
　　if(isNaN(dx)||dx>=this.length){return false;}
　　for(var i=0,n=0;i<this.length;i++)
　　{
　　　　if(this[i]!=this[dx])
　　　　{
　　　　　　this[n++]=this[i]
　　　　}
　　}
　　this.length-=1
　}


/**
先建立一个balls的数组来存放新生成的小球，一个colors的数组存放多彩的颜色，并且初始化多个颜色值
小球运动起来：
1、首先在update中，根据变化的时间位，将与上一秒有变化的时间判断出来,然后在变化的位置添加小球addballs
2、然后根据变化的位的位置，每一个有小球的点声明一个ball对象，给ball对象的x，y，速度，加速度，颜色等都赋上值
3、然后将这些ball push到balls中
4、在update中，写一个小球运动的函数，将每个小球的运动方向，碰撞检测写好
5、最后在绘制小球的 render函数中 将balls循环绘制出来。每一个小球的颜色都是开始随机给它赋值的颜色
*/


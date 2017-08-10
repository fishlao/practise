var dom = document.getElementById("clock");
var ctx = dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width/2;
var rem = width / 200; //比例

function drawBackground() {
	ctx.save();
	ctx.translate(r,r);
	ctx.beginPath();
	ctx.lineWidth = 10 * rem;
	ctx.arc(0,0,r-ctx.lineWidth/2,0,2*Math.PI,false);
	ctx.stroke();

	var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.font = 18 *rem + "px Arial";
	ctx.textAlign="center";
	ctx.textBaseline = "middle";
	//根据xy坐标绘制时针数字
	hourNumbers.forEach(function(num,i) {
		var rad = 2* Math.PI / 12 * i;//弧度
		var x = Math.cos(rad) * (r-30* rem); //r-30是为了数字在圆内
		var y = Math.sin(rad) * (r-30* rem);
		ctx.fillText(num,x,y);
	});


	for(var i=0;i<60;i++){
		var rad = 2* Math.PI / 60 * i;//弧度
		var x = Math.cos(rad) * (r-18* rem); //r-30是为了数字在圆内
		var y = Math.sin(rad) * (r-18* rem);
		ctx.beginPath();
		if(i%5===0){
			// 指向时针的点则是黑色
			ctx.fillStyle="#000";
			ctx.arc(x,y,2* rem,0,2*Math.PI,false);
		}
		else {
			ctx.fillStyle="#ccc";
			ctx.arc(x,y,2* rem,0,2*Math.PI,false);
			
		}
		ctx.fill();
	}


}

function drawHour(hour, min){
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI /12 * hour;
	var mrad = 2 * Math.PI /12 /60 * min;
	ctx.rotate(rad+mrad);
	ctx.lineWidth = 6* rem;
	ctx.lineCap="round";
	ctx.moveTo(0,10* rem);
	ctx.lineTo(0,-r/2);
	ctx.stroke();
	ctx.restore();
}

function drawMin(min){
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI /60 * min;
	ctx.rotate(rad);
	ctx.lineWidth = 3;
	ctx.lineCap="round";
	ctx.moveTo(0,10* rem);
	ctx.lineTo(0,-r+30* rem);
	ctx.stroke();
	ctx.restore();
}

function drawSecond(second){
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI /60 * second;
	ctx.rotate(rad);
	ctx.moveTo(-2,20* rem);
	ctx.lineTo(2,20* rem);
	ctx.lineTo(1,-r + 18* rem);
	ctx.lineTo(-1,-r + 18* rem);
	ctx.fill();
	ctx.restore();
}

function drawDot() {
	ctx.save();
    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.arc(0,0,3* rem,0,2*Math.PI,false);
    ctx.fill();
    ctx.restore();
}

function draw() {
	ctx.clearRect(0,0,width,height);
	var date = new Date();
	var hour = date.getHours();
	var min = date.getMinutes();
	var second = date.getSeconds();
	drawBackground();
	drawHour(hour,min);
	drawMin(min);
	drawSecond(second);
	drawDot();
	ctx.restore();
}

setInterval(draw,1000);

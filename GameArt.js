//----------创建画布---------
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');//这句话错了！！！导致下面的都执行不了了
var width = canvas.width;
var height = canvas.height;
var stop;
		
//-----------图片-----------
var imgUFO = [newImg("./image/ufo.gif"), newImg("./image/ufo.gif")];
var imgCannon = newImg("./image/cannon.png");
var imgBullet = newImg("./image/bullet.png");
var imgOver = newImg("./image/cannon.png");
var imgBg = newImg("./image/background.jpg");
function newImg(src) {
    
	var obj = new Image();
	obj.src = src;
	return obj;
}

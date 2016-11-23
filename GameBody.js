//---------游戏主体---------
var score;
var backGround;
var cannon;
var ufos;
var bullets;
var bulletCreateCnt;
var planeCreateCnt;
var bulletsLeft;
var level; //子弹重数
var group; //存第几颗子弹

init();

function init (){
	//游戏初始化
	score = new Score();
	backGround = new BackGround();
	cannon = new Cannon();
	ufos = new Array();
	bullets = new Array(new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array());
	bulletCreateCnt = 0;
	ufoCreateCnt = 0;
	bulletsLeft = 10;
	level = new Array(10);
	group = 0;
	
}

function run(){
	//游戏运行函数
	var type = randInt(2, 0);
	if (ufoCreateCnt == 75) {
		//每隔一定时间随机生成1到2架ufo
		var num = randInt(3, 1);
		for (var i = 1; i <= num; i++)
			ufos.push(new UFO(type));
		ufoCreateCnt = 0;
	} else ufoCreateCnt++;
	document.onmousedown = function(e){
		//点击鼠标发射子弹
		if (window.event) e = window.event;
		if (e.button == 1 &&  bulletsLeft > 0){
			level[group] = 1;
			bullets[group].push(new Bullet(level[group], cannon.centerX(), cannon.y, 0, -4));  //向上发出速度为4的子弹
			if (group < 10) group++;
			bulletsLeft--;
			document.getElementById('launch').play();
		}
	}
	backGround.run();
	for (var i = 0; i < bullets.length; i++){ 
		for (var j = 0; j < bullets[i].length; j++){
			//子弹/碎片击中目标或飞出屏幕
			if (!bullets[i][j].run()){
				bullets[i].splice(j, 1);
				j--;
			}
		}
	}
	for (var i = 0; i < ufos.length; i++){
		//ufo被击中或飞出屏幕
		if (!ufos[i].run()){
			ufos.splice(i, 1);
			i--;
		}
	}
	cannon.run();
	score.run();
	if (noBullets()){
		gameover();
	}
}

function gameover(){
	//游戏结束的处理
	clearInterval(stop);
	var res = window.confirm("You scored " + score.num + " points.\nRestart?");
	if (res){
		init();
		stop = setInterval("run()",1000/100);
	}
}

window.onload = function(){
    //实时界面

	stop = setInterval("run()",1000/100);
	cannon = new Cannon();
}
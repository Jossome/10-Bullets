//---------创建游戏对象----------
function GameObject(){
	//游戏对象的属性
	this.move = function (dx, dy){
		//x方向移动dx，y方向移动dy
		this.x += dx;
		this.y += dy;
	}
	this.draw = function(){
		context.drawImage(this.img, this.x, this.y); 
	}
	this.isOut = function(){
		//判断炮弹是否飞出
		return (this.y > height || this.y < 0 || this.x > width + 30 || this.x < -30);
	}
	this.isOut2 = function(){
		//判断ufo是否飞出
		return (this.x > width|| this.x < -100);
	}
	this.centerX = function(){
		//横向中心位置
		return this.img.width / 2 + this.x;
	}
	this.centerY = function(){
		//纵向中心位置
		return this.img.height / 2 + this.y;
	}
	this.collide = function(another){
		//碰撞检测
		return !(this.x + this.img.width < another.x
				|| this.x > another.x + another.img.width
				|| this.y + this.img.height < another.y
				|| this.y > another.y + another.img.height);
	}
}

Cannon.prototype = new GameObject();//大炮
function Cannon() {
	this.x = this.y = 0;
	this.img = imgCannon;
	this.run = function(){
		this.x = width / 2;
		this.y = height - this.img.height;
		this.draw();
		return true;
	}
}

UFO.prototype = new GameObject();//ufo
function UFO(type){
	this.img = imgUFO[type];
	if (type == 0){
		//向右飞的
		this.x = - this.img.width;
		this.y = randInt(9, 3) * (this.img.height);
		//视觉美观，增加难度
		this.speed = 1;
	}
	else{
		//向左飞的
		this.x = width;
		this.y = randInt(9, 3) * (this.img.height);
		this.speed = -1;
	}
	this.run = function(){
		this.move(this.speed, 0)
		if (this.isOut2()) return false;
		for (var i = 0; i < bullets.length; i++){
		  for (var j = 0; j < bullets[i].length; j++){
			  if (this.collide(bullets[i][j])){
				  bullets[i].splice(j, 1); //splice函数，从下标为j的元素开始删除1个元素
				  j--;
				  score.add(1);   //分数加一
				  level[i]++;        //重数加一
				  var sita = 2 * Math.PI / level[i];
				  for (var k = 0; k < level[i]; k++)   //第level重的子弹/碎片击中飞船后向四周均匀散发出level个碎片
					  bullets[i].push(new Bullet(level[i], this.centerX(), this.centerY(), 4 * Math.cos(k * sita), -4 * Math.sin(k * sita))); //4代表速度大小
				  //ufo被击中之后再弹射出碎片
				  document.getElementById('explode').play();
				  return false;
			  }
		  }
		}
		this.draw();
		return true;
	}
}

Bullet.prototype = new GameObject();//子弹/碎片
function Bullet(level, x, y, dx, dy){ //level表示重数，大炮发出的子弹重数为1，被大炮击中而散发出的碎片重数为2，被该碎片击中后散发出的碎片重数为3，以此类推
	this.x = x;
	this.y = y;
	this.img = imgBullet;
	this.run = function(){
		this.move(dx, dy);
		if (this.isOut()) return false;
		this.draw();
		return true;
	}
}

function BackGround(){
	//游戏背景
	this.run = function(){
		context.drawImage(imgBg, 0, 0);
	}
}

function Score(){
	//记分牌
	this.num = 0;
	this.add = function (delta){
		this.num += delta;
	}
	this.run = function (){
		context.font="30px Arial";
		context.fillStyle = "#fff";
		context.fillText("Score:" + this.num, 30, 60);
		if (bulletsLeft <= 0)
			context.fillText("Bullets Left:" + 0, 400, 60);
		else
			context.fillText("Bullets Left:" + bulletsLeft, 400, 60);
	}
}
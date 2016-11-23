//------------辅助函数-------------
function noBullets(){
	//判断屏幕内以及弹夹内是否没有碎片或子弹
	for (var i = 0; i < bullets.length; i++)
		for (var j = 0; j < bullets[i].length; j++)
			if (!isOut()) break;
	if (bulletsLeft <= 0 && i == bullets.length) return true;
}

function randInt(min, max){
	//生成随机数
	return Math.floor(Math.random() * (max - min) + min);
}

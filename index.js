'use strict'

const game = {
	WIDTH: 60, // 模块宽度
	HEIGHT: 60, // 模块高度
	elem: null,
	rw: [0, 0], // 小人位置
	curIndex: 0, // 当前关卡
	checkpoints,
	checkpoint: null,
	init () {
		$('#app').html('');
		this.elem = $('#app');
		this.initCheckpoint(this.curIndex);
	},
	/**
	 * 初始化关卡
	 * @param { number } index 当前关卡索引
	 */
	initCheckpoint (index) {
		this.checkpoint = this.checkpoints[index];
		this.elem.css({
			width: this.checkpoint.ROW * this.WIDTH + 'px',
			height: this.checkpoint.COL * this.HEIGHT + 'px'
		})

		for (let r = 0; r < this.checkpoint.ROW; r ++) {
			for (let c = 0; c < this.checkpoint.COL; c ++) {
				this.elem.append(`<div class="item"></div>`)
			}
		}
		this.rw = this.checkpoint.rw;
		$('.item').css({ width: this.WIDTH + 'px', height: this.HEIGHT + 'px' });
		$('.item').eq(this.checkpoint.rw[0] * this.checkpoint.ROW + this.checkpoint.rw[1]).addClass('rw');
		for (let key of Object.keys(this.checkpoint.data)) {
			this.checkpoint.data[key].forEach(item => {
				$('.item').eq(item[0] * this.checkpoint.ROW + item[1]).addClass(key);
			});
		}
	},
	start () {
		this.init();
	},

	leftMove () {
		if (this.move(
			this.rw[0] * this.checkpoint.ROW +(this.rw[1] - 1),
			this.rw[0] * this.checkpoint.ROW + (this.rw[1] - 2)
		)) { this.rw[1] -= 1; }
	},
	rightMove () {
		if (this.move(
			this.rw[0] * this.checkpoint.ROW +(this.rw[1] + 1),
			this.rw[0] * this.checkpoint.ROW + (this.rw[1] + 2))
		) { this.rw[1] += 1; }
	},
	topMove () {
		if (this.move(
			(this.rw[0] - 1) * this.checkpoint.ROW + this.rw[1],
			(this.rw[0] - 2) * this.checkpoint.ROW + this.rw[1])
		) {this.rw[0] -= 1; }
	},
	bottomMove () {
		if (this.move(
			(this.rw[0] + 1) * this.checkpoint.ROW + this.rw[1],
			(this.rw[0] + 2) * this.checkpoint.ROW + this.rw[1])
		) { this.rw[0] += 1; }
	},
	move (oneIndex, twoIndex) {
		const oneItem = $('.item').eq(oneIndex);
		const twoItem = $('.item').eq(twoIndex);

		if (oneItem.hasClass('qb')) { return false ; }
		if (oneItem.hasClass('xz')) {
			if (twoItem.hasClass('qb') || twoItem.hasClass('xz')) { return false ; }
			$('.item').eq(oneIndex).removeClass('xz');
			$('.item').eq(twoIndex).addClass('xz');
			$('.item.rw').removeClass('rw');
			$('.item').eq(oneIndex).addClass('rw');
			return true;
		} else {
			$('.item.rw').removeClass('rw');
			$('.item').eq(oneIndex).addClass('rw');
			return true;
		}
	},
	next () {
		if (this.curIndex < this.checkpoints.length) { this.curIndex ++ ; }
		this.init();
	},
	prev () {
		if (this.curIndex > 0) { this.curIndex -- ; }
		this.init();
	},
	clickHandle (type) {
		switch (type) {
			case 'top': this.topMove(); break;
			case 'left': this.leftMove(); break;
			case 'right': this.rightMove(); break;
			case 'bottom': this.bottomMove(); break;
			case 'prev': this.prev(); break;
			case 'next': this.next(); break;
		}
	}
}

window.onload = game.start();


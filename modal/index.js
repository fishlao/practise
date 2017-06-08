function Modal() {
	this.content = '',
	this.title = '';
}
Modal.prototype = {
	// 点击遮掩层时是否可以关闭弹窗
	fadeClose: false,
	// 渲染用户自定义内容
	render: function() {
		document.getElementsByClassName('modal-header')[0].innerHTML = this.title;
		document.getElementsByClassName('modal-content')[0].innerHTML = this.content;
	},
	// 显示弹出框
	show: function() {
		document.getElementById('modal').classList.remove('modal-hide');
		document.getElementsByClassName('modal-container')[0].style['width'] = document.body.clientWidth * 0.8 + 'px';
		document.getElementsByClassName('modal-container')[0].style['max-height'] = window.innerHeight * 0.8 +'px';
	},
	// 隐藏弹出框
	close: function() {
		document.getElementById('modal').classList.add('modal-hide');
	},
	// 绑定事件
	bindEvent: function() {
		document.getElementById('modal_cancle_bt').addEventListener('click', this.close);
		document.getElementById('modal').addEventListener('click', this.fadeClose ? this.close : null);
	},
	// 初始化
	init: function({ content, title, fadeClose }) {
		this.content = content;
		this.title = title;
		this.fadeClose = fadeClose;
		this.bindEvent();
		this.render();
	}
}

window.modal = new Modal();
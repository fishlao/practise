;(function (global) {
	var __INFO__ = {
		plug: 'MusicPlayer',
		version: '1.0.0',
		author: 'huiminlao',
	};
	var sys_setting = {
		autoPlay: true,
		loop: true,
		htmls: `<audio></audio>
				<div style="position:relative">
					<a style="width:50px;height:50px;background-position:0 0;background-image: url(data:image/jpeg;base64,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);display:inline-block;"></a>
					<select style="position: absolute;left: 60px;top: 50%"></select>
				</div>
				`,
	};
	var MusicPlayer = function(options) {
		console.log(this, global);
		var setting = this.getSetting(options);
		const { nodeId, htmls, autoPlay, boxStyle, iconSkin, loop} = setting;
		let { audioUrl } = setting;

		const div = document.createElement('div');
		div.style = boxStyle;
		div.innerHTML = htmls;

		const audioObject = div.querySelectorAll('audio')[0];
		const button = div.querySelectorAll('a')[0];
		const audioList = div.querySelectorAll('select')[0];

		var buttonClick = {
			start: function() {
				audioObject.play();
				button.style.backgroundPosition="0% 0%";
			},
			pause: function() {
				audioObject.pause();
				button.style.backgroundPosition="0% 100%";
			}
		}

		var buttonEvent;
		// 判断是属于浏览器还是移动端
		if(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)){
			buttonEvent = 'touchstart';
		}else buttonEvent = 'mousedown';

		button.addEventListener(buttonEvent, function() {
			if(this.state) {
				buttonClick.pause();
				this.state = false;
			} else {
				buttonClick.start();
				this.state = true;
			}
		});

		// 插入用户自定义的容器里，如果没有传值则默认值为文档
		const container = document.getElementById(nodeId) || document.body;
		container.append(div);

		// 检测audioUrl传进来的形式，
		// 如果是字符串,则直接置为播放地址
		if(toString.call(audioUrl).indexOf('String')!== -1) {
			audioObject.src = audioUrl;
			audioList.style.display = "none";
		} else if(!Array.isArray(audioUrl)){ 
			// 如果是对象，则转为数组形式
			var audioUrlArr = [];
			audioUrlArr.push(audioUrl);
			audioUrl = audioUrlArr;
		}

		if (Array.isArray(audioUrl) && audioUrl.length !== 0) {
			// 默认播放第一首
			audioObject.src = audioUrl[0].audioUrl;
			audioUrl.map((audioObject, index) => {
				const { title, audioUrl } = audioObject;
				var option = new Option(title, audioUrl);
				audioList.append(option);
			});
		}
		// 列表变化时歌曲也改变
		audioList.addEventListener('change', function() {
			const audioUrl = audioList[this.selectedIndex].value;
			audioObject.src = audioUrl;
			buttonClick.start();
		})
		// 设置了自动播放
		if (autoPlay) {
			button.state = true;
			buttonClick.start();	
		} else {
			button.state = false;
		}
		// 设置是否循环播放
		if (loop) {
			audioObject.loop = true;
		} else {
			audioObject.loop = false;
		}
		// 用户自定义按钮皮肤
		iconSkin ? button.style.backgroundImage = url(iconSkin) : null ;

	};
	MusicPlayer.prototype = {
		getSetting: function(options) {
			console.log(sys_setting);
			return Object.assign({}, sys_setting, options);
		}
	}
	global[__INFO__.plug] = MusicPlayer;
})(typeof window !== 'undefined' ? window : this)
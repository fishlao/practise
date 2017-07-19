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
					<a style="width:20px;height:20px;background-position:0 0;
						display:inline-block;
						background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAYAAAD+MdrbAAAAAXNSR0IArs4c6QAAA4JJREFUSA3tVl9IU1EYv/furmuutTDL7MHInsKHLEsoRFR6MPLBB6OHwDGCuSmKKzF6ar0EibRKyG0YQ9+MIAOR/pChQb1k0UOvSwtGKcHs6jbX7r39vus2rno3d6GXoANn3//f/c53znfOGOafH06n040539fXZ9FbTFdX116tntMKWr67u3s3gB5B9wDzUCKR2K+1Ew/77VQqtdjR0dGZsekCut3ummQy+RFOFzKOepRl2SVFUQjjHkDryYfHV8ygjZjFpIDTUUmSvGB3kKw3EFMcDAZj5eXldyKRSBNAzyHuPuhxDsxbBD3HfEITylug+cCGYP+JVZz1er0yeBcw1hB3zOVytXBgTkJpZPyGcxFW8bC/v9+KTL9CfkwAwGrVrSEZ84ybyOg77BXLy8stab9naXraMCAyWkawCoCMaggIH/iSBjxoGDAdqBIAKVqZeMOAvb29exDXnAb6QBSZHk7LEcOA8Xj8BgAOAGDBZrNNpoEyH3hHx+Z9WlkoMcExgbjLAwMDIs5kBeQ2CoZugsNXmsCcx2ylCf11zCQ56I1AINBjsVhKQF/hHFJCAWQsgH7y+/2TPH0FgVOa4Kc4tC9xzsahO6LRZ1mfzxcnAV1yFaQZYCnQHlC1D8m2YQwPD88JgnACDnQ55Bul8JGRYQ8yns3nmLWh6V2o0zz1b1apYTweT4lG/M/+hQqw22GIdrtbkeVr1rKyKnZwcHU7fz6Xg4I3ZSUaHQGY+gwkolF6UzK3Sq4wRhdw1W6vEaNROoOVOSNzGHgF7SOGw2cYjislH1aWG2RZdoPN+QzkwFLV/Eo4PIP7p46RJFWx5YLbFC22t7fBv5XheY81FFois+J02sR4/C5nMs3waJu6TTH5RYDho5dYSaoWHY7GXWZzUkwkXiCoFivbp1vDvIgWyxU2FqtGIlUAfS2mUjH4n8IM8yaT2/AFa/X7FxmTqRGXwmcCzYLxfENxKPTNMCBlT8sEGGWmDoDHsQMJEgwDqhuwXjN1mdlMafkOh/EaYgN82OVaJBPmsUxJENZQ02m1pqlUkEPvvVHzLvCH47hZPB5TBEY1y9aUYSagn2bRYsKqKNZjy9f/LClKA7A7cTQ2HGyzIFTuHBnZtvV0LwdqPUlRxrG07JtSKKDuplhGR+esNlshb8qWQukCkhc7NPTLOjZ2EUugvl4o4rgfW6L/ScUfi61m8+A/2DYAAAAASUVORK5CYII=)"
					></a>
					<select style="position: absolute;left: 30px;top: 50%"></select>
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
;(function ($) {
  var Carousel = function (elem){
  		var _this_ = this;
  		// 经过jquery包装的dom结点
      // 总体div标签
  		this.poster = elem;
      // 包含图片的ul标签
      this.posterItemMain = elem.find('ul.poster-list');
      // 左右按钮
      this.posterBtn = elem.find('div.poster-btn');
      this.posterPrevBtn = elem.find('div.poster-btn.poster-prev-btn');
      this.posterNextBtn = elem.find('div.poster-btn.poster-next-btn');
      // 所有的图片
      this.posterItems = elem.find('li.poster-item');
      // 如果是偶数张，则在最后添加一张图片
      if (this.posterItems.length %2 === 0) {
        this.posterItemMain.append(this.posterItems.eq(0).clone());
        this.posterItems = this.posterItemMain.children('li');
      }
      // 第一张图片
      this.posterFirstItem = this.posterItems.first();
      // 最后一张图片
      this.posterLastItem = this.posterItems.last();
      this.rotateFlag = true;
  		// 默认设置
  	 	this.setting = {
  	 		width: 1200,// 幻灯片的div总体宽度
  	 		height: 480,
  	 		posterWidth: 640, // 图片第一帧宽度
  	 		posterHeight: 480,
        opacity: 0.8,
  	 		speed: 500, // 切换速度
        scale: 0.9, // 图片的缩放比例
  			positionAlign: 'middle', //图片的对齐方式
        delay: 1000,  //自动播放的时间间隔
        autoPlay: false //是否自动播放
  	 	};
      // 绑定左按钮点击事件
      this.posterPrevBtn.click(function(event) {
        // 防止动画还没结束再一次点击按钮
        if (_this_.rotateFlag) {
         _this_.rotateFlag = false;
         _this_.carouselRotate('left');
        } 
      });
      // 绑定右按钮点击事件
      this.posterNextBtn.click(function(event) {
        if (_this_.rotateFlag) {
          _this_.rotateFlag = false;
         _this_.carouselRotate('right');
        }
      });
      // 将用户配置覆盖默认配置
  	 	Object.assign(this.setting, this.getSetting());
      // 将配置应用于dom结点
      this.setSetting();
      // 设置自动播放
      if(this.setting.autoPlay) {
        this.autoPlay();
        this.poster.hover(function() {
          // 清除自动播放
          window.clearInterval(_this_.timer);
        }, function() {
          _this_.autoPlay();
        });
      }
  };

  Carousel.prototype = {
      autoPlay: function() {
        var _this_ = this;
        this.timer = window.setInterval(function(){
          _this_.posterNextBtn.click();
        });
      },
      carouselRotate: function(dir) {
        var _this_ = this;
        var zIndexArr  = [];
        // 方向向左
        if (dir === 'left') {
          this.posterItems.each(function(index, el) {
              var _self_= $(this),
                  prev = _self_.prev().get(0) ? _self_.prev(): _this_.posterLastItem,
                  width = prev.width(),
                  height = prev.height(),
                  zIndex = prev.css('z-index'),
                  opacity = prev.css('opacity'),
                  top = prev.css('top'),
                  left = prev.css('left');
              zIndexArr.push(zIndex);           
              _self_.animate({
                 width: width,
                 height: height,
                 zIndex: zIndex,
                 opacity: opacity,
                 top: top,
                 left: left
              }, _this_.setting.speed,function() {
                _this_.rotateFlag = true;
              });
          });
        } else if(dir === 'right') {
          // 方向向右
          this.posterItems.each(function(index, el) {
            var _self_= $(this),
                next = _self_.next().get(0) ? _self_.next(): _this_.posterFirstItem,
                width = next.width(),
                height = next.height(),
                zIndex = next.css('z-index'),
                opacity = next.css('opacity'),
                top = next.css('top'),
                left = next.css('left');
            zIndexArr.push(zIndex);        
            _self_.animate({
                width: width,
                height: height,
                opacity: opacity,
                zIndex: zIndex,
                top: top,
                left: left
            }, _this_.setting.speed,function() {
                _this_.rotateFlag = true;
            });
          });
        }
        this.posterItems.each(function(index, el) {
          $(this).css('zIndex', zIndexArr[index]);
        });
      },
      // 根据用户设置的对齐方式获取图片相对于父元素的top值
      getTop: function(realHeight) {
        var alignValue = this.setting.positionAlign;
        // 中间对齐
        if (alignValue==='middle') {
          return (this.setting.posterHeight-realHeight)/2;
        } else if (alignValue==='bottom') { // 底部对齐
          return this.setting.posterHeight-realHeight;
        } else return 0; // 顶部对齐
      },
      setSetting: function () {
        // 设置div总体样式
        this.poster.css({
          width: this.setting.width,
          height: this.setting.height
        });
        // 设置ul图片样式
        this.posterItemMain.css({
          posterWidth: this.setting.posterWidth,
          posterHeight: this.setting.posterHeight
        });
        // 设置左右按钮的宽度，等于总宽度减去第一张图片的宽度的一半
        var btnWidth = (this.setting.width-this.setting.posterWidth)/2;
        //  获取除去第一张的dom结点
        var restPosterItems = this.posterItems.slice(1);
        var level = Math.floor(restPosterItems.length/2);
        // 每张图片距离的宽度
        var gap = btnWidth/level;
        // 第一张图片右边界离起点的距离，用于右边图片计算left值用
        var leftDistance = btnWidth+(this.setting.posterWidth);
        // 计算右边图片在数组中的最大位置
        var rightPosterItems = restPosterItems.slice(0, level);
        // 放置左边的图片集合
        var leftPosterItems = restPosterItems.slice(level);
        var _self_ = this;
        // 右边的图片以中央的第一张图片的宽度和高度为基准
        var rw = this.setting.posterWidth;
        var rh = this.setting.posterHeight;
        // 左边的图片集合长度，用来计算图片的透明度
        var opacityLev = leftPosterItems.size();

        this.posterBtn.css({
          width: btnWidth,
          height: this.setting.posterHeight,
          // z-index为最高级
          zIndex: Math.ceil(this.posterItems.length/2),
        });
        // 设置第一张图片
        this.posterFirstItem.css({
          width: this.setting.posterWidth,
          height: this.setting.posterHeight,
          left: btnWidth,
          zIndex: Math.floor(this.posterItems.length/2),
        });
        var zIndex = Math.floor(this.posterItems.length/2);
        rightPosterItems.each(function(i) {
            var j = i;
            rw = rw * _self_.setting.scale;
            rh = rh * _self_.setting.scale;
            var leftValue = leftDistance+(gap)*(++i)-rw;
            $(this).css({
              left: leftValue,
              width: rw,
              height: rh,
              top: _self_.getTop(rh),
              zIndex: --zIndex,
              opacity: (1/(++j)),
            });
        });

        // 左边的图片以右边的最后一张图片为基准，因为大小一样。从底部到靠近中央的过程，图片渐变大；
        var lw = rightPosterItems.last().width();
        var lh = rightPosterItems.last().height();
        leftPosterItems.each(function(i) {
            var j = i;
            $(this).css({
              left: i*gap,
              width: lw,
              height: lh,
              top: _self_.getTop(lh),
              zIndex: i,
              opacity: (1/(opacityLev)),
            });
            lw = lw / _self_.setting.scale;
            lh = lh / _self_.setting.scale;
            // 数值变小，透明度由大变小
            opacityLev--;
        });
      },
  		// 获取用户自定义设置
  		getSetting: function (argument) {
  			var selfSetting = this.poster.attr("data-setting");
  			// 判断是否有自定义设置
  			if(selfSetting && selfSetting !== ""){
  				selfSetting = JSON.parse(selfSetting);
  			} else {
  			  selfSetting = {};
  			}
  			return selfSetting;
  		}
  };

  // 初始化实例
  Carousel.init = function (elements) {
  	// _this指向Carousel
  	var _this_ = this;
  	// 传进来的elements是个数组，所以实例数组中的每一个dom元素
  	elements.each(function () {
  		// this指向elements中的每一个元素
  		new _this_($(this));
  	});
  };
  // 挂在window全局变量，用于实例化Carousel对象
  window.Carousel = Carousel;
})($)
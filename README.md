modal 弹出框


// 初始化配置

```
  modal.init({
    //自定义内容
    content: 'your content'，

    //自定义标题，
    title: 'your title' ,

    //是否可以通过点击遮掩层来关闭弹框，默认是false
    fadeClose: 'ture' 
  })
```

//显示弹框

`modal.show()`

//关闭弹框


`modal.close()`

---------------------------------------------------------------------------------------
carousel旋转木马


//初始化配置,在需要配置的div的class属性添加'.J_poster'类型，可实例化多个组件

```
	Carousel.init($(".J_poster"));

```
在div中的data-setting属性添加配置信息

```
	data-setting = '{
        "width": 1200,// 幻灯片的div总体宽度
        "height": 480,
        "posterWidth": 640, // 图片宽度
        "posterHeight": 480,
        "opacity": 0.8,// 可选
        "speed": 500, // 切换速度，可选
        "scale": 0.9, // 图片的缩放比例，可选
        "positionAlign": 'middle', //图片的对齐方式，可选['top','bottom']
        "delay": 1000,  //自动播放的时间间隔,可选
        "autoPlay": false //是否自动播放，可选
	}'

```
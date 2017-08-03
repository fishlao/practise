(function(global){
	var __PLUGINS__ = {
		author: "fishlao",
		name: "Utils"
	}
	var utils = {
		//将数组顺序打乱
		upsetOrder: function(oldArr, num){
			var results=[],length = oldArr.length;
			var _length_ = num && num<= length ? num : length;
			var arr = [].concat(oldArr);
			for(var i=0;i< _length_;i++){
				// 注意arr的长度是变化的，所以要用arr.length，不能用length
				results.push(arr.splice(Math.floor(Math.random()*arr.length),1)[0]);
				console.log(arr,results);
			};
			return results;
		},
		// 两种数组去重的方法
		// 运行时间： 0.099853515625ms
		removeDuplicate: function(arr) {
			var results = [];
			arr.map(function(item,index){
				if(results.indexOf(item) === -1) {
					results.push(item);
				}
			});
			return results;
		},
		// 运行时间:0.02783203125ms
		removeDuplicateSecond: function(arr){
			var object = {};
			var results = [];
			arr.map(function(item,index){
				if(!object[item]) {
					results.push(item);
					object[item] = 1;
				};
			});
			return results;
		}
	};
	global[__PLUGINS__.name]=utils;
})(window);
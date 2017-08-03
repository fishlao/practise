(function(global){
	var __PLUGINS__ = {
		author: "fishlao",
		name: "Utils"
	}
	var toString = Object.prototype.toString;
	var utils = {
		// 比较两个对象属性值是否相同，如果是嵌套对象则继续比较；
		compareEqual: function(objA, objB) {
			if(objA === objB){return true};
			// 找出两个对象的key值
			var keysA = Object.keys(objA);
			var keysB = Object.keys(objB);
			// 比较key值长度是否相等
			if (keysA.length !== keysB.length) {
			    return false;
			}
			// 以对象A的key值为基准，在对象B中查找B中是否也有一样的key值
			for(var i=0;i<keysA.length;i++){
				var key = keysA[i];
				if(!objB.hasOwnProperty(key)) {
					return false;
				} else {
					// 如果有同等的key值，且value值是对象，则继续往下比较；
					if(toString.call(objB[key]) === "[object Object]" && toString.call(objA[key]) === "[object Object]") {
						return arguments.callee(objA[key],objB[key]);
					} else {
					// 如果不是对象,则直接比较是否相等。
						if(objB[key] !== objA[key]) return false;
					}
				}
			}
			return true;
		}
	};
	global[__PLUGINS__.name]=utils;
})(window);
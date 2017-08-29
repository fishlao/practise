//new Promise(function(resolve,reject))


function Promise(fn) {
	var status = "pending",
		value = null, //存储状态确定后的值；
	    deffereds = []; //存储回调函数数组；
    this.then = function(onFulfilled,onRejected){	
    	//返回一个新的promise
    	return new Promise(function (resolve) {
    		handle({
    			onFulfilled: onFulfilled || null,
    			onRejected: onRejected || null,
    			resolve:resolve,
    			reject: reject
    		});
    	});
	};
	function handle(deffer) {
		if(status === "pending") {
			deffereds.push(deffer);
			return;
		}
		//如果状态是成功的，则执行成功回调，如果是拒绝，则执行拒绝回调
		var cb = status === 'fulfilled' ? deffer.onFulfilled : deffer.onRejected;
		var ret;
		//是否有注册回调函数
		if(cb === null) {
			cb = status === 'fulfilled' ? deffer.resolve : deffer.reject;
			cb(value);
			return;
		}
		try {
	        ret = cb(value);
	        deffer.resolve(ret);
	    } catch (e) {
	        deffer.reject(e);
	    } 
	}
	// 调用此状态后就会变成fulFilled状态
	function resolve(newValue){
		//如果x为对象或者函数,则将newValue作为对象调用它
		if(newValue && (typeof newValue === "object" || typeof newValue === "function")) {
			var then = newValue.then;
			if(typeof then === 'function') {
				then.call(newValue,resolve,reject);
				return;
			}
		}
		value = newValue;
		status = "fulfilled";
		finale();
		
	}
	function reject(reason) {
		status = 'rejected';
		value = reason;
		finale();
	}
	function finale() {
		setTimeout(()=>{
			deffereds.forEach(function(deffered){
				handle(deffered);
			});
		},0)//保证在then方法注册所有回调后才调用
	}
	fn(resolve,reject);

}


var a = new Promise(function(resolve,reject){
	console.log("resolve begin...");
	setTimeout(()=> resolve("sucess"),500);
}).then(function(value){
	console.log(value);
	return new Promise(function(resolve,reject){
		reject("hey");
	});
}).then((value)=>{
	console.log(value);
	return "world";
},(error)=>{
	console.log(error+"error");
}).then((value) => {
	console.log(value);
})


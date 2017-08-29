new Promise(function(resolve){
		console.log("this is promise1");
		resolve();
	}).then(function(){
		console.log("then of promise1");
})

setTimeout(function() {
	console.log("this is a setTimeout1");
	new Promise(function(resolve){
		console.log("this is promise2");
		resolve();
	}).then(function(){
		console.log("then of promise2");
	})
},0);


setTimeout(function() {
	console.log("this is a setTimeout1");
	new Promise(function(resolve){
		console.log("this is promise3");
		resolve();
	}).then(function(){
		console.log("then of promise3");
	})
},0);

new Promise(function(resolve){
		console.log("this is promise4");
		resolve();
	}).then(function(){
		console.log("then of promise4");
})

setImmediate(function() {
    console.log('immediate1');
})

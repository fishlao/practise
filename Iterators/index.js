 // 模拟一个数组的生成遍历器方法
 function imitateIterator(array) {
 	var index = 0;
 	//判断游标是否已经超过数组长度，如果已经超过则代表已经遍历结束
 	function isDone() {
 		return index >= array.length;
 	}
 	//返回一个遍历器
 	return {
 		// 实现规范的遍历器函数，供外面调用
 		next: () => {
			return {
				value: !isDone() ? array[index++] : undefined,
				done: isDone() //再次判断，因为index已经发生了变化
			};
 		}
 	}
 }
 var array = imitateIterator([1,2,3]);
 console.log(array.next());
 console.log(array.next());
 console.log(array.next());
 console.log(array.next());

//数组
 var originArr = [1,2,3];
 //获取内置的遍历器方法
 var iterator = originArr[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

//set数据结构
var originSet = new Set(["a","b","v"]);
 //获取内置的遍历器方法
 var iterator = originSet[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

// 为对象增加遍历器方法

var object = {
	name: "fish",
	general: "girl"
};


// for(var value of object) {
// 	console.log(value);
// }

object[Symbol.iterator] = () => {
	var index = 0;
	var table = {
		0: "name",
		1: "general"
	};//假设存储了对应关系
	return {
		next: function (argument) {
			return  index <= 1 ? {
				value: object[table[index++]],
				done: false,
			} : {
				value: undefined,
				done: true
			}
		}
	}
}

for(var value of object) {
	console.log(value);
}

//以下也是调用iterator方法实现的
// 解构赋值
let [ first, ...second ] = originSet;

console.log(first, second);

// ...扩展运算符
var string = "hello";
console.log([...string])

// yield*
function* test(argument) {
	yield 1;
	yield* [2,3,4];//调用数组的遍历器
	yield 5;
}

var testIterator = test();
console.log(testIterator.next());
console.log(testIterator.next());
console.log(testIterator.next());
console.log(testIterator.next());
console.log(testIterator.next());
console.log(testIterator.next());



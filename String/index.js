// 判断两个字符串是否是回文串，例如isMatch("hello","olleh") true

function isMatch(str1, str2){
	return str1 === str2.split("").reverse().join("");
}

var result = isMatch("hello","opleh");
console.log(result)
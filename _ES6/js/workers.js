//worker线程中，不能进行dom元素的更新。
onmessage = function(message) {
	var data = message.data;
	data.msg = 'Hi from task.js';
	postMessage(data);
}

importScripts("workers-import.js");
//importScripts("script/A.js", "B.js", "http://helooooooo/C.js");

console.log('workers');
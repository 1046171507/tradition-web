$(function() {
	console.log('nav.html加载了');
	$('#a-1 span').trigger('click'); //触发a标签的系统事件,要用触发a子级的事件冒泡实现
	$('a').click(function () {
		console.log('a标签点击')
	});
})
/*requireVue同步加载.vue*/
var requireVue = function(url, async) {
	var asyncB = async ? true : false;
	var component = "";
	$.ajax({
		type: "get",
		url: url,
		async: asyncB,
		accepts: 'text',
		success: function(data) {
			component = toComponent(data);
		}
	});
	return component;
};
/*vue文件转vue组件*/
var toComponent = function(module) {
	var _mtemplate = module.replace(/\<template\s*\>/, "x_x").replace(/\<\/template\s*\>/, "x__x");
	var mtemplate = _mtemplate.substring(_mtemplate.search("x_x") + 3, _mtemplate.search("x__x"));
	var _mstyle = module.replace(/\<style\s+scoped\>|\<style\s*\>/, "x_x").replace(/\<\/style\>/, "x__x");
	var mstyle = _mstyle.substring(_mstyle.search("x_x") + 3, _mstyle.search("x__x"));
	var _mscript = module.replace(/\<script\>/, "x_x").replace(/export\s+default/, "var y_y=").replace(/}\s*\<\/script\>/, "}x__x");
	var mscript = _mscript.substring(_mscript.search("x_x") + 3, _mscript.search("x__x"));
	eval(mscript);
	y_y['template'] = mtemplate;
	y_y['style'] = mstyle;
	$('head').append('<style>' + mstyle + '</style>');
	return y_y;
}
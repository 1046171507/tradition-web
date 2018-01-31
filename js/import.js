console.warn('jquery.min.js加入了require,requireVue,import方法')
/* 用于开发环境的批量替换(采用同步加载,保证执行顺序) */
$(function() {
	$('import').each(function() {
		var $this = $(this),
			$href = $this.attr('href'),
			$async = $this.attr('async') == undefined ? false : true;
		if($href) {
			if(/#/.test($href)) {
				var $hrefSrc = $href.substring(0, $href.search('#'));
				var $hrefID = $href.substring($href.search('#'));
			} else {
				var $hrefSrc = $href;
				var $hrefID = '';
			}
			$.ajax({
				type: "get",
				url: $hrefSrc,
				async: $async,
				success: function(data) {
					var content = $hrefID ? $(data).filter($hrefID) : $(data);
					$this.replaceWith(content);
					content = null
				},
				error: function() {
					console.error('文件' + $hrefSrc + '请求失败')
				}
			})
		}
	})
});
/* requireVue同步加载.vue用于开发环境的批量替换(采用同步加载,保证执行顺序) */
var requireVue = function(url, async) {
	var asyncB = async ? true : false;
	var component = "";
	$.ajax({
		type: "get",
		url: url,
		async: asyncB,
		success: function(data) {
			component = toComponent(data)
		}
	});
	return component
};
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
	return y_y
};
/*require同步加载js*/
var require = function(url, asy) {
	var asyncB = asy ? true : false;
	$.ajax({
		type: "get",
		url: url,
		async: asyncB,
	})
};
/* requireT同步加载html */
var requireT = function(url, asy) {
	var $href = url,
		content,
		$async = asy ? true : false;
	if(/#/.test($href)) {
		var $hrefSrc = $href.substring(0, $href.search('#'));
		var $hrefID = $href.substring($href.search('#'));
	} else {
		var $hrefSrc = $href;
		var $hrefID = '';
	}
	$.ajax({
		type: "get",
		url: $hrefSrc,
		async: $async,
		success: function(data) {
			content = $hrefID ? $(data).filter($hrefID) : data
		},
		error: function() {
			console.error('文件' + $hrefSrc + '请求失败')
		}
	});
	if(content.length != 0) {
		return $hrefID ? content.get(0).outerHTML : content;
	} else {
		return ''
	}
};
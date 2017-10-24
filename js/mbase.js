// JavaScript Document
//判断浏览器
window.browserInfo = {
	ie: !-[1, ],
	ieAll: /MSIE \d/.test(navigator.userAgent),
	FF: !!navigator.userAgent.match(/firefox/i),
	webkit: /WebKit\//.test(navigator.userAgent),
	chrome: /Chrome\//.test(navigator.userAgent),
	opera: /Opera\//.test(navigator.userAgent),
	safari: /Apple Computer/.test(navigator.vendor),
	mac_geLion: /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent),
	mac_geMountainLion: /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent),
	ios: /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent),
	mobile: this.ios || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent),
	PC: !this.mobile,
	mac: this.ios || /Mac/.test(navigator.platform),
	windows: /windows/i.test(navigator.platform),
};

//节点加载完事件
$.fn.myinit = function(Fn) {
	Fn.apply(this);
	return this;
};

//input的val改变事件$('.text').input(function() {this})可以on绑定;
$.fn.input = function(Fn) {
	if(window.browserInfo.ie) {
		$(this).on('propertychange', function() {
			Fn.apply(this);
		})
	} else {
		$(this).on('input', function() {
			Fn.apply(this);
		})
	}
};

//滚轮滚动事件$(document).mousewheel(function() {this.Down})可以on绑定;
$.fn.mousewheel = function(Fn) {
	if(window.browserInfo.FF) {
		$(this).on('DOMMouseScroll', function(ev) {
			var oEvent = ev || event;
			this.Down = (oEvent.originalEvent.detail > 0);
			Fn.apply(this);
		})
	} else {
		$(this).on('mousewheel', function(ev) {
			var oEvent = ev || event;
			this.Down = (oEvent.originalEvent.wheelDelta < 0);
			Fn.apply(this);
		})
	}
};

//拖拽事件$('.move').move(function() { $(this).css({ 'left': '+=' + this.pageXc, 'top': '+=' + this.pageYc }); });
$.fn.move = function(Fn) {
	$(this).on('mousedown', function(ev) {
		this.pageXc = this.pageYc = 0;
		var _this = this,
			pvrPageX = ev.pageX,
			pvrPageY = ev.pageY;
		$(document).on('mousemove.thisMove', function(ev) {
			ev.preventDefault();
			_this.pageXc = ev.pageX - pvrPageX;
			_this.pageYc = ev.pageY - pvrPageY;
			Fn.apply(_this);
			pvrPageX = ev.pageX;
			pvrPageY = ev.pageY;
		});
		$(document).on('mouseup.thisMove', function(ev) {
			$(this).off('mousemove.thisMove mouseup.thisMove');
		});
		//$(this).on('dragend', function(ev) {
		//	setTimeout(function() {
		//		$(document).mouseup();
		//	}, 10);
		//});
	});
};

//模拟input滑块事件$('#range .mea').move(rangeFn);
var rangeFn = function() {
	var _thisParent = $(this).parent();
	var _thisParentLeftMin = 0;
	var _thisParentLeftMax = _thisParent.width();
	var _thisStep = (_thisParentLeftMax - _thisParentLeftMin) * _thisParent.attr('step') / (_thisParent.attr('max') - _thisParent.attr('min'));
	var _thisLeft = parseFloat($(this).css('left')) + this.pageXc;
	if(_thisLeft >= _thisParentLeftMin && _thisLeft <= _thisParentLeftMax) {
		$(this).css({
			'left': _thisLeft,
		});

		$(this).attr('value', Math.round(_thisLeft / _thisStep) * _thisParent.attr('step'));
	};
};

//模拟滚动条
var slimScrollFn = function() {
	if($.fn.slimScroll){
		$('.MScroll').each(function() {
			var _this = $(this);
			_this.removeClass('MScroll');
			_this.slimScroll({
				height: _this.height(),
				allowPageScroll: true,
				disableFadeOut: true,
				railVisible: true,
			});
		});
	}
};

//模拟下拉框
var Mchecked = function() {
	$(document).on('click', '.Mchecked', function() {
		var _this = $(this);
		_this.toggleClass('McheckedOn');
		_this.siblings('.slimScrollDiv,.MScroll').slideToggle();
	});
	$(document).on('click', '.Moption', function() {
		var _this = $(this);
		var _parents = _this.parents('.Mselect');
		_parents.children('.slimScrollDiv,.MScroll').slideUp();
		_parents.children('.Mchecked').html(_this.html()).removeClass('McheckedOn');
		_parents.children('input').val(_this.attr('value')).trigger("change");
	});
	$(document).on('mouseleave', '.Mselect', function() {
		var _this = $(this);
		_this.children('.slimScrollDiv,.MScroll').slideUp();
		_this.children('.Mchecked').removeClass('McheckedOn');
	});
};

/*! layPage-v1.3.0 分页组件 License MIT  http://laypage.layui.com/*/
//分页PageFn('Mpage1','hrefPage');
var PageFn = function(opage, hrefPage) {
	var MPage = $(opage);
	var thisPages = MPage.attr('data-pages');
	//分页主体插件调用
	laypage({
		cont: MPage,
		pages: thisPages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
		skip: true, //是否开启跳页
		last: thisPages, //用于控制尾页
		prev: false, //隐藏上一页按钮
		next: false, //隐藏下一页按钮
		groups: 5, //连续显示分页数
		curr: function() {
			//通过url获取当前页，也可以同上（pages）方式获取
			var str = "/" + hrefPage + "=(\\d+)/";
			var reg = eval(str);
			var page = location.search.match(reg);
			return page ? page[1] : 1;
		}(),
		jump: function(e, first) { //触发分页后的回调
			if(!first) { //一定要加此判断，否则初始时会无限刷新
				var search = location.search;
				var str = "/" + hrefPage + "=(\\d+)/";
				var reg = eval(str);
				var page = location.search.match(reg);
				if(page) {
					search = search.replace(reg, hrefPage + '=' + e.curr);
				} else if(!search) {
					search = search + '?' + hrefPage + '=' + e.curr;
				} else {
					search = search + '&' + hrefPage + '=' + e.curr;
				}
				location.href = search;
			}
		}
	});
	MPage.find('.laypage_skip').attr({
		'max': thisPages,
		'type': 'text'
	});
	//分页页码不存在时弹层
	MPage.find('.laypage_skip').on('keyup', function() {
		if(parseFloat(this.value) > parseFloat(this.max) || parseFloat(this.value) < parseFloat(this.min)) {
			alert('页码不存在!');
			this.value = this.min;
		}
	});
};
var PageFnAjax = function(opage, ObjFn) {
	var MPage = $(opage);
	var thisPages = MPage.attr('data-pages');
	//分页主体插件调用
	laypage({
		cont: MPage,
		pages: thisPages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
		skip: true, //是否开启跳页
		last: thisPages, //用于控制尾页
		prev: false, //隐藏上一页按钮
		next: false, //隐藏下一页按钮
		groups: 5, //连续显示分页数
		curr: function() {
			return MPage.attr('data-curr') ? MPage.attr('data-curr') : 1;
		}(),
		jump: function(e, first) { //触发分页后的回调
			if(!first) { //一定要加此判断，否则初始时会无限刷新
				MPage.attr('data-curr', e.curr);
				ObjFn();
				MPage.find('.laypage_skip').attr({
					'max': thisPages,
					'type': 'text'
				});
			}
		}
	});
	MPage.find('.laypage_skip').attr({
		'max': thisPages,
		'type': 'text'
	});
	//分页页码不存在时弹层
	MPage.find('.laypage_skip').on('keyup', function() {
		if(parseFloat(this.value) > parseFloat(this.max) || parseFloat(this.value) < parseFloat(this.min)) {
			alert('页码不存在!');
			this.value = this.min;
		}
	});
};

//var ev=ev||event;ev.preventDefault();window.event.returnValue=false; return false;

$(function() {

	//可聚焦元素
	$('.canFocus').attr({
		"tabindex": "0",
		"hidefocus": "true"
	});

	//模拟滚动条调用
	if(!window.browserInfo.webkit) {
		slimScrollFn();
	}
	if(!window.browserInfo.webkit) {
		$(document).on('DOMNodeInserted', function(ev) {
			slimScrollFn();
		});
	}

	//模拟下拉框调用
	Mchecked();
});
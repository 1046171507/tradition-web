/*自由时间日历组件---作者:王利*/
function libertyDate(objV) {
	var obj = objV || {};
	var thisDate = new Date();
	this['nowDate'] = obj['nowDate'] || (thisDate.getFullYear() + '-' + (thisDate.getMonth() + 1) + '-' + thisDate.getDate()); /*指定当前值*/
	this['dateData'] = obj['dateData'] || []; /*时间及时间配置*/
	this['startTime'] = obj['startTime'] || false; /*可选开始值*/
	this['endTime'] = obj['endTime'] || false; /*可选结束值*/
	this['disabled'] = obj['disabled'] || false; /*禁选值*/
	this['checked'] = obj['checked'] || []; /*用户选中值*/
	this['ViewHead'] = obj['ViewHead'] || ['日', '一', '二', '三', '四', '五', '六'];

	var _this = this;
	this.each(this['dateData'], function() {
		var _dateA = this['date'].split('-');
		_dateA[1] = _this.switchStr(_dateA[1]);
		_dateA[2] = _this.switchStr(_dateA[2]);
		this['_date'] = _dateA[0] + _dateA[1] + _dateA[2];
	});

	this['dateData'].sort(function(n1, n2) {
		return n1['_date'] - n2['_date']
	});

	if(this['startTime']) {
		var _startTimeA = this['startTime'].split('-');
		_startTimeA[1] = this.switchStr(_startTimeA[1]);
		_startTimeA[2] = this.switchStr(_startTimeA[2]);
		this['_startTime'] = '' + _startTimeA[0] + _startTimeA[1] + _startTimeA[2];
	} else {
		this['_startTime'] = false
	};
	if(this['endTime']) {
		var _endTimeA = this['endTime'].split('-');
		_endTimeA[1] = this.switchStr(_endTimeA[1]);
		_endTimeA[2] = this.switchStr(_endTimeA[2]);
		this['_endTime'] = '' + _endTimeA[0] + _endTimeA[1] + _endTimeA[2];
	} else {
		this['_endTime'] = false
	};
};

libertyDate.prototype.each = function(a, fn) { /*通用方法*/
	var thisA = a;
	for(var i = 0, len = thisA.length; i < len; i++) {
		fn.call(thisA[i], i);
	};
};

libertyDate.prototype.extend = function(obj1, obj2) { /*通用方法*/
	for(n in obj2) {
		obj1[n] = obj2[n]
	}
	return obj1;
};

libertyDate.prototype.switchStr = function(n) {
	var n = parseInt(n);
	return(n >= 10) ? '' + n : '0' + n;
};

/*2017年1月1日星期几?*/
libertyDate.prototype.firstDateDay = function(Year, Month) {
	var newDate = new Date();
	newDate.setDate(1);
	newDate.setMonth(Month - 1);
	newDate.setFullYear(Year);
	return newDate.getDay();
};
/*2017年1月多少天*/
libertyDate.prototype.dateAll = function(Year, Month) {
	var newDate = new Date();
	newDate.setMonth(Month - 1);
	newDate.setFullYear(Year);
	var MonthDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if(Month == 2) {
		var runnianYear = [1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040, 2044, 2048, 2052];
		for(var i = 0, len = runnianYear.length; i < len; i++) {
			if(Year == runnianYear[i]) MonthDate[1] = 29;
		};
	};
	return MonthDate[Month - 1];
};
/*获取当前时间*/
libertyDate.prototype.getNowDate = function() {
	return this['nowDate'];
};
/*设置当前时间*/
libertyDate.prototype.setNowDate = function(o) {
	o && (this['nowDate'] = o);
	return this['nowDate'];
};
/*设置开始时间*/
libertyDate.prototype.setStartTime = function(o) {
	this['startTime'] = o || false;
	if(this['startTime']) {
		var _startTimeA = this['startTime'].split('-');
		_startTimeA[1] = this.switchStr(_startTimeA[1]);
		_startTimeA[2] = this.switchStr(_startTimeA[2]);
		this['_startTime'] = '' + _startTimeA[0] + _startTimeA[1] + _startTimeA[2];
	} else {
		this['_startTime'] = false
	};
};
/*设置结束时间*/
libertyDate.prototype.setEndTime = function(o) {
	this['endTime'] = o || false;
	if(this['endTime']) {
		var _endTimeA = this['endTime'].split('-');
		_endTimeA[1] = this.switchStr(_endTimeA[1]);
		_endTimeA[2] = this.switchStr(_endTimeA[2]);
		this['_endTime'] = '' + _endTimeA[0] + _endTimeA[1] + _endTimeA[2];
	} else {
		this['_endTime'] = false
	};
};
/*设置开始结束时间*/
libertyDate.prototype.setStartEndTime = function(o, q) {
	this['startTime'] = o || false;
	this['endTime'] = q || false;
	if(this['startTime']) {
		var _startTimeA = this['startTime'].split('-');
		_startTimeA[1] = this.switchStr(_startTimeA[1]);
		_startTimeA[2] = this.switchStr(_startTimeA[2]);
		this['_startTime'] = '' + _startTimeA[0] + _startTimeA[1] + _startTimeA[2];
	} else {
		this['_startTime'] = false
	};
	if(this['endTime']) {
		var _endTimeA = this['endTime'].split('-');
		_endTimeA[1] = this.switchStr(_endTimeA[1]);
		_endTimeA[2] = this.switchStr(_endTimeA[2]);
		this['_endTime'] = '' + _endTimeA[0] + _endTimeA[1] + _endTimeA[2];
	} else {
		this['_endTime'] = false
	};
};
/*设置禁选*/
libertyDate.prototype.setDisabled = function(o) {
	o && (this['disabled'] = o);
	return this['disabled'];
};
/*获取时间数据*/
libertyDate.prototype.getDateData = function() {
	return this['dateData'];
};
/*获取所有时间数据*/
libertyDate.prototype.getAllDateData = function() {
	return this['dateData'];
};
/*获取当前月时间数据*/
libertyDate.prototype.getNowDateData = function(newTime) {
	var oStr = this['nowDate'];
	if(newTime) oStr = newTime;
	var o = oStr.split('-'),
		nowYear = parseInt(o[0]),
		nowMonth = parseInt(o[1]),
		firstDateDay = this.firstDateDay(nowYear, nowMonth),
		dateAll = this.dateAll(nowYear, nowMonth),
		nowYearDateData = [];
	this.each(this['dateData'], function() {
		var _dateA = this['date'].split('-');
		if((parseInt(_dateA[0]) == nowYear) && (parseInt(_dateA[1]) == nowMonth)) {
			nowYearDateData.push(this)
		};
	});

	var nowYearDate = [],
		_this = this;

	for(var i = 0; i < dateAll; i++) {
		var idate = nowYear + '-' + nowMonth + '-' + (i + 1),
			_Month = _this.switchStr(nowMonth),
			_Date = _this.switchStr(i + 1),
			i_date = nowYear + _Month + _Date,
			i_day = (firstDateDay + i) % 7;

		nowYearDate[i] = {
			'date': idate,
			'_date': i_date,
			'_day': i_day
		};

		_this.each(nowYearDateData, function() {
			j_this = this;
			if(nowYearDate[i]['_date'] == j_this['_date']) {
				_this.extend(nowYearDate[i], j_this);
			}
		});

		if(this['_startTime'] != false && this['_endTime'] != false) {
			if(nowYearDate[i]['_date'] >= this['_startTime'] && nowYearDate[i]['_date'] <= this['_endTime']) {
				nowYearDate[i]['disabled'] = false;
			} else {
				nowYearDate[i]['disabled'] = true;
			};
		} else {
			if((this['_startTime'] != false && nowYearDate[i]['_date'] >= this['_startTime']) || (this['_endTime'] != false && nowYearDate[i]['_date'] <= this['_endTime'])) {
				nowYearDate[i]['disabled'] = false;
			} else {
				nowYearDate[i]['disabled'] = true;
			}
		};

		if(this['disabled'] != false) {
			var _dbT = this['disabled']['disabledType'],
				_dbV = this['disabled']['disabledValue'];
			if(_dbV instanceof Array) {
				for(var dI = 0; dI < _dbV.length; dI++) {
					if(nowYearDate[i][_dbT + ''] == _dbV[dI]) {
						nowYearDate[i]['disabled'] = true;
					}
				}
			} else {
				var _disabled = _dbV(nowYearDate[i][_dbT + '']);
				if(_disabled) nowYearDate[i]['disabled'] = _disabled;
			};
		};
	};
	var _nowLunarYearDate;
	if(window.calendar != undefined) {
		_nowLunarYearDate = new calendar(nowYear, nowMonth - 1);
		return [nowYearDate, _nowLunarYearDate];
	} else {
		return nowYearDate;
	}
};
/*设置时间数据*/
libertyDate.prototype.setDateData = function(newdateData, bl) {
	var _dateData = this['dateData'],
		_newdateData = newdateData || [],
		_this = this,
		i_this, j_this;
	_this.each(_newdateData, function() {
		var _dateA = this['date'].split('-');
		_dateA[1] = _this.switchStr(_dateA[1]);
		_dateA[2] = _this.switchStr(_dateA[2]);
		this['_date'] = _dateA[0] + _dateA[1] + _dateA[2];
	});

	if(bl) {
		this['dateData'] = _newdateData;
	} else {
		_this.each(_newdateData, function() {
			i_this = this;
			var i_bl = true;
			_this.each(_dateData, function(i) {
				j_this = this;
				if(i_this['_date'] == j_this['_date']) {
					_this.extend(_dateData[i], i_this);
					i_bl = false;
				}
			});
			if(i_bl) {
				_dateData.push(i_this);
			}
		});
	};
	_dateData.sort(function(n1, n2) {
		return n1['_date'] - n2['_date']
	});

	return this['dateData'];
};

/*设置日历头部*/
libertyDate.prototype.setViewHead = function(ViewHead) {
	ViewHead ? (this['ViewHead'] = ViewHead) : '';
};

/*生成日历*/
libertyDate.prototype.createView = function(viewD, newTime, fn) {
	var nowDateData, nowLunarDateData;
	if(window.calendar != undefined) {
		nowDateData = this.getNowDateData(newTime)[0];
		nowLunarDateData = this.getNowDateData(newTime)[1];
	} else {
		nowDateData = this.getNowDateData(newTime);
	}

	var nowDateView = '';
	var nowLength = nowDateData.length,
		firstI = nowDateData[0]['_day'],
		lastI = nowDateData[nowLength - 1]['_day'];
	for(var i = 0; i < firstI; i++) {
		if(i == 0) {
			nowDateView += '<tr>';
		}
		nowDateView += '<td></td>';
	};
	for(var i = 0; i < nowLength; i++) {
		if(nowDateData[i]['_day'] == 0) {
			nowDateView += '<tr>'
		}
		var iHtml = '';
		if(fn) {
			if(window.calendar != undefined) {
				iHtml = fn(nowDateData[i], nowLunarDateData[i]);
			} else {
				iHtml = fn(nowDateData[i]);
			}
		} else {
			iHtml = (nowDateData[i]['date'].split('-'))[2];
		}
		nowDateView += '<td date-data=' + nowDateData[i]['_date'] + '>' + iHtml + '</td>';
		if(nowDateData[i]['_day'] == 6) {
			nowDateView += '</tr>'
		}
	};
	for(var i = lastI; i < 6; i++) {
		nowDateView += '<td></td>';
		if(i == 6) {
			nowDateView += '</tr>';
		}
	};

	nowDateView = '<table><tbody><tr><th>' + this['ViewHead'][0] + '</th><th>' + this['ViewHead'][1] + '</th><th>' + this['ViewHead'][2] + '</th><th>' + this['ViewHead'][3] + '</th><th>' + this['ViewHead'][4] + '</th><th>' + this['ViewHead'][5] + '</th><th>' + this['ViewHead'][6] + '</th></tr>' + nowDateView + '</tbody></table>';

	viewD.dateDataNow = [nowDateData,nowLunarDateData]; /*当前月数据*/
	viewD.dateData = this; /*所有相关信息*/
	viewD.innerHTML = nowDateView;
	return this;
}
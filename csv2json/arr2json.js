var arr2json = function(results) {
	var data = results.data;
	var tbodyB = false,
		tbodyB = 0;
	var decollator = '$$$';
	for(;1;) {
		if(data[data.length - 1].length != data[data.length - 2].length) {
			data.pop();
		} else {
			break;
		}
	};
	console.log(data)
	for(var i = 0, len = data.length; i < len; i++) {
		tbodyB = true;
		for(var j = 0, lenJ = data[i].length; j < lenJ; j++) {
			if(i == 0) {
				if(data[i][j] == '') {
					tbodyB = false;
				}
			} else {
				if(data[i][j] == '') {
					tbodyB = false;
				}
			}
		};
		if(i == 0 && tbodyB) {
			tbodyB = i;
			//console.log('第' + tbodyB + '行是表头');
			break;
		} else if(tbodyB) {
			tbodyB = i - 1;
			//console.log('第' + tbodyB + '行是表头');
			break;
		};
	};

	for(var i = 0, len = data.length; i < len; i++) {
		for(var j = 0, lenJ = data[i].length; j < lenJ; j++) {
			if(i == 0) {
				if(data[i][j] == '') {
					data[i][j] = data[i][j - 1];
				}
			} else {
				if(data[i][j] == '') {
					data[i][j] = data[i - 1][j];
				} else {
					data[i][j] = data[i - 1][j] + decollator + data[i][j];
				}
			}
		};
		if(i == tbodyB) {
			break;
		}
	};
	var arrI = 0;
	for(var k = 1, lenk = data[tbodyB].length; k < lenk; k++) {
		if(data[tbodyB][k] == data[tbodyB][k - 1]) {
			if(arrI == 0) {
				data[tbodyB][k - 1] = data[tbodyB][k - 1] + decollator + arrI;
			}
			arrI++;
			data[tbodyB][k] = data[tbodyB][k] + decollator + arrI;
		} else {
			arrI = 0;
		}
	};
	window.JosnData = {
		list: []
	};

	for(var m = 0, lenm = data[tbodyB].length; m < lenm; m++) {
		var oKey = data[tbodyB][m].split(decollator);
		for(var n = 0, lenn = data.length - (tbodyB + 1); n < lenn; n++) {
			if(m == 0) {
				JosnData.list.push({});
			}
			if(oKey.length == 1) {
				JosnData.list[n][oKey[0]] = data[n + tbodyB + 1][m];
			} else if(oKey.length == 2) {
				if(!JosnData.list[n][oKey[0]]) {
					JosnData.list[n][oKey[0]] = {}
				}
				JosnData.list[n][oKey[0]][oKey[1]] = data[n + tbodyB + 1][m];
			} else if(oKey.length == 3) {
				if(!JosnData.list[n][oKey[0]]) {
					JosnData.list[n][oKey[0]] = {}
				}
				if(!JosnData.list[n][oKey[0]][oKey[1]]) {
					JosnData.list[n][oKey[0]][oKey[1]] = {}
				}
				JosnData.list[n][oKey[0]][oKey[1]][oKey[2]] = data[n + tbodyB][m];
			} else if(oKey.length == 4) {
				if(!JosnData.list[n][oKey[0]]) {
					JosnData.list[n][oKey[0]] = {}
				}
				if(!JosnData.list[n][oKey[0]][oKey[1]]) {
					JosnData.list[n][oKey[0]][oKey[1]] = {}
				}
				if(!JosnData.list[n][oKey[0]][oKey[1]][oKey[2]]) {
					JosnData.list[n][oKey[0]][oKey[1]][oKey[2]] = {}
				}
				JosnData.list[n][oKey[0]][oKey[1]][oKey[2]][oKey[3]] = data[n + tbodyB][m];
			}
		}
	};
	return JosnData;
};
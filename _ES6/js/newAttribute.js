let name = 'wangli';
if(true) {
	let name = 'wl';
	console.log(name);
};
/*循环块,{}在ES6中*/
{
	let name = 'wl';
	console.log(name);
}
console.log(name);

class mMath {
	constructor(x = 2, y = 1, ...vals) {
		this.x = x;
		this.y = y;
	}

	add() {
		return this.x + this.y;
	}
	sub() {
		return this.x - this.y;
	}
}

let mas = new mMath(2, 3, 4, 5, 6);
console.log(mas.sub(), ',有参数运算sub');
let mas2 = new mMath();
console.log(mas2.add(), ',默认参数下运算add');

class mMathI extends mMath {
	constructor(x, y = 4) {
		super(x);
		this.y = y;
	}

	mul() {
		return this.x * this.y
	}
	sub() {
		return this.y - this.x;
	}
}

let masi = new mMathI(2, 3);
console.log(masi.add(), ',继承的运算add');
console.log(masi.mul(), ',新加的运算mul');
console.log(masi.sub(), ',替换的运算sub');
let masi2 = new mMathI();
console.log(masi2.mul(), ',默认参数下运算mul');

let Fn1 = (x, y) => {
	x++;
	y = y * y;
	console.log({
		x,
		y
	})
	return x + y;
}
console.log(Fn1(2, 3));

let Fn2 = (...numlist) => {
	let add = 0;
	/*for(numi of numlist) {
		add += numi
	}*/
	numlist.forEach(function(v) {
		add += v
	})
	return add;
}
console.log(Fn2(1, 2, 3, 4, 5), '...号求和');
let Fn21 = function() {
	//console.log(arguments)
	let add = 0;
	for(let i = 0; i < arguments.length; i++) {
		add += arguments[i]
	}
	return add;
}
console.log(Fn21(1, 2, 3, 4, 5), 'ES5 arguments遍历参数');

/*  `` 模板及模板嵌套与传值*/
if(true) {
	let name = 'wl';
	let _log = `hello ${name}!`
	console.log(_log);
}

//object
let birth = '2017/01/01';
let Fn3 = {
	birth,
	obj: {
		a: 1,
		b: 2
	},
	hello() {
		console.log('今天是' + this.birth);
	}
}
Fn3.hello();
//Object.is的判断
console.log(+0 === -0, NaN === NaN);
console.log(Object.is(+0, -0), Object.is(NaN, NaN));

let Fn4 = {
	birth: '2017/07/01',
	obj: {
		a: 11,
		b: 22
	},
	hello() { //但对象中中的对象还是指向同一个地址,所以重写方法,会改变合并前obj的函数
		console.log('今天可能是' + this.birth);
	}
};

//Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。//但对象中的对象还是指向同一个地址// 在JavaScript中，对象的属性分为可枚举和不可枚举之分，它们是由属性的enumerable值决定的。可枚举性决定了这个属性能否被for…in查找遍历到。
Fn4 = Object.assign(Fn3, Fn4);
Fn4.hello();
Fn3.hello(); //但对象中中的对象还是指向同一个地址
console.log(Fn3.obj); //但对象中中的对象还是指向同一个地址

console.log(Object.keys(Fn4), 'keys');
console.log(Object.values(Fn4), 'values');
console.log(Object.entries(Fn4), 'entries');

let Fn42 = JSON.parse(JSON.stringify(Fn4)); //这种方式实现深复制有一个缺点就是必须给JSON.parse方法传入的字符串必须是合法的JSON，否则会抛出错误//不能拷贝函数
console.log(Fn42)

//获取任何类型
function type(object) {
	return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
};

let s = Symbol();
console.log(typeof s); // "symbol"
//上面代码中，变量s就是一个独一无二的值。typeof运算符的结果，表明变量s是 Symbol 数据类型，而不是字符串之类的其他类型。

const set = new Set([1, 2, 3, 4, 4, 4, 4]); //自动剔除重复的值,不能添加重复的值
console.log(set)
console.log(...set) //解析数组为参数型

// ES6模块
//import { stat, exists, readFile } from 'fs';

/*var myNumber = 128;
myNumber.toString(16); // 返回 80
myNumber.toString(8); // 返回 200
myNumber.toString(2); // 返回 10000000*/

/*数据类型		字节长度			含义	
	Int8		1				8位带符号整数
	Uint8		1				8位不带符号整数
	Uint8C		1				8位不带符号整数（自动过滤溢出）
	Int16		2				16位带符号整数
	Uint16		2				16位不带符号整数
	Int32		4				32位带符号整数
	Uint32		4				32位不带符号的整数
	Float32		4				32位浮点数
	Float64		8				64位浮点数
*/

var buffer = new ArrayBuffer(128);
console.log(buffer.byteLength + '字节长度,如果字节长度不等于设置长度,说明没有那么多连续字节,分配失败');
var x1 = new Uint32Array(buffer); //转成32位类数组
x1[0] = 1;
x1[1] = 0x100;
console.log(x1, '是一个类数组');
console.log(x1.length, '类数组长度');
var x2 = new Uint8Array(buffer); //转成8位类数组
x2[1] = 1;
console.log(x1[0]) //257//因为x1与x2操作的是同一处内存

var newBuffer = buffer.slice(0, 4); //slice方法，允许将内存区域的一部分，拷贝生成一个新的ArrayBuffer对象。除了slice方法，ArrayBuffer对象不提供任何直接读写内存的方法，只允许在其上方建立视图，然后通过视图读写。
var x3 = new Uint32Array(newBuffer);
console.log(x3);

/*var dataView = new DataView(buffer);
console.log(dataView.getUint8(0));*/

//var a = SIMD.Float32x4(1, 2, 3, 4);
//var b = SIMD.Float32x4(5, 6, 7, 8);
//var c = SIMD.Float32x4.add(a, b); // Float32x4[6, 8, 10, 12]
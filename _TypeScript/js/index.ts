class mMath {
	vals = [1, 2];
	constructor(...vals) {
		val && this.vals = vals
	}

	add() {
		return this.vals[0] + this.vals[1];
	}
	sub() {
		return this.vals[0] - this.vals[1];
	}
	sum() {
		let sum = 0;
		return sum
	}
}

let mas = new mMath(2, 3, 4, 5, 6);
console.log(mas.sub(), ',有参数运算sub');
let mas2 = new mMath();
console.log(mas2.add(), ',默认参数下运算add');
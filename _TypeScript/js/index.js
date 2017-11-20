var mMath = /** @class */ (function () {
    function mMath() {
        var vals = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vals[_i] = arguments[_i];
        }
        this.vals = [1, 2];
        val && this.vals;
        vals;
    }
    mMath.prototype.add = function () {
        return this.vals[0] + this.vals[1];
    };
    mMath.prototype.sub = function () {
        return this.vals[0] - this.vals[1];
    };
    mMath.prototype.sum = function () {
        var sum = 0;
        return sum;
    };
    return mMath;
}());
var mas = new mMath(2, 3, 4, 5, 6);
console.log(mas.sub(), ',有参数运算sub');
var mas2 = new mMath();
console.log(mas2.add(), ',默认参数下运算add');

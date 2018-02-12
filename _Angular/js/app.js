var myApp = angular.module('myApp', []);

myApp.directive({ //组件
	first() {
		return {
			template: `
			<p>根作用域  name: {{name}}<p>
			<p>根作用域  name: {{name | upper}}(过滤器)<p>
			<p>根作用域  name: {{upperName()}}(自定义服务)<p>
			`,
			//scope: {}, //没有创造自己的独立作用域,就会逐级查找父级作用域
		};
	},
	second() {
		return {
			template: `
			<p>子作用域 name: <input type="text" ng-model="name" /><p>
			<p>子作用域 name: {{name}}</p>
			`,
			scope: {}, // 创建指令自己的独立作用域，与父级毫无关系
			controller: function($scope, $rootScope) {
				$scope.name = "Rose";
			},
		};
	}
});

myApp.filter('upper', function() { //过滤器
	return function(str) {
		return str.toUpperCase();
	};
});

myApp.service('mService', function() { //自定义服务
	this.upper = function(str) {
		return str.toUpperCase();
	}
});

myApp.controller('myCtrl', function($scope, mService) { //控制器

	$scope.name = "John";

	$scope.click = function() {
		$scope.name = "Rose";
	};

	$scope.upperName = function() {
		return mService.upper($scope.name);
	};
});
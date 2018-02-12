import printMe from './print.js';
import { cube } from './math.js';
import dataJ from './data.json';

console.log(dataJ);

console.log('index.js');

function component() {

	console.log(cube(5));

	var element = document.createElement('div');
	var btn = document.createElement('button');
	element.innerHTML = 'Hello webpack';
	btn.innerHTML = 'Click me and check the console!!!';

	btn.onclick = function(e) {
		import('./print').then(function(module) { //懒加载
			var print = module.default;
			print();
		});
	};

	element.appendChild(btn);

	return element;
}

document.body.appendChild(component());
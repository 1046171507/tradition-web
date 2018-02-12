// main.js
import getName from '/_TypeScript/js/a.js';
import { getModuleName } from '/_TypeScript/js/b.js';
import '/_TypeScript/js/c.js';

var indexCssFn = function(indexCss) {
	console.log("indexCss: " + indexCss);
};

_require(['text!/_TypeScript/css/index.css'], function(indexCss) {
	indexCssFn(indexCss);
});

console.log("module name: " + getName());
console.log("module name: " + getModuleName());
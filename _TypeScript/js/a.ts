console.log('a.js');

import { getModuleName } from '/_TypeScript/js/b.js';

export default function getName() {
	
	let moduleName = "A-Module" + "; base on " + getModuleName();
	return moduleName;
};
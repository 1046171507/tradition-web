/*require同步加载js*/
window.require = function(url, async) {
	var asyncB = async ? true : false;
	$.ajax({
		type: "get",
		url: url,
		async: asyncB,
		accepts: 'script'
	})
};
require('../js/mbase.js');
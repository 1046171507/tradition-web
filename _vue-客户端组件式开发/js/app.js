$(function() {
	new Vue({
		el: "#box",
		components: {
			"dom-a": requireVue('components/a.vue'),
			"dom-b": requireVue('components/b.vue')
		},
		data: function() {
			return {
				childrenA: null
			}
		},
		mounted: function() { //类似于回调函数(初次实例化完成后调用)
		},
	});
})
<template>
	<div class="a">
		<slot>A组件的插槽</slot>
		<span>我是A组件的数据->{{a}}</span>
		<input type="button" value="把A数据传给父组件->进一步传递给B" @click="send">
		<dom-c></dom-c>
	</div>
</template>

<script>
	var domC = requireVue('components/c.vue');
	var dataA = "我是a组件中数据";
	export default {
		name: 'A',
		components: {
			"dom-c": domC
		},
		methods: {
			send: function() {
				this.$parent.childrenA = this.a
			}
		},
		data: function() {
			return {
				a: dataA
			}
		},
		mounted: function() { //类似于回调函数(初次实例化完成后调用)
		},
	}
</script>

<style>
	.a {
		background-color: #CCCCCC;
	}
	/*能同步加入能同步删除,scoped不生效*/
</style>
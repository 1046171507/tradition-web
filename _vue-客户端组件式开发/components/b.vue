<template>
	<div class="b">
		<h3>我是B组件-->接收父组件的数据为: {{childrenA}}</h3>
	</div>
</template>

<script>
	export default {
		name: 'B',
		data: function() {
			return {
				a: ""
			}
		},
		props: ['children-a'],
		//钩子,类似于回调函数(实例化完成后调用)
		mounted: function() {},
	}
</script>

<style scoped>
	.b {
		background-color: #EEEEEE;
	}
	/*能同步加入能同步删除,scoped不生效*/
</style>
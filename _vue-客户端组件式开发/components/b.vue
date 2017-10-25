<template>
	<div class="b">
		<h3>我是B组件-->接收父组件的数据为: {{childrenA}}</h3>
		<p>
			<i-switch v-model="switch1" @on-change="change"></i-switch>
		</p>
	</div>
</template>

<script>
	export default {
		name: 'B',
		data: function() {
			return {
				switch1: false
			}
		},
		props: ['children-a'],
		methods: {
			change() {
				setTimeout(()=>{
					alert('开关状态：' + this.switch1);
				},1000)
			}
		},
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
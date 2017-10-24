var gettpl4 = `
			<h3  wl-text="d.title">{{ d.title }}</h3>
			<p wl-text="d.intro">{{ d.intro }}</p>
			<ul>

				{{# for(var i = 0, len = d.list.length; i< len; i++){ }} 
				
				<li>
					<span>{{ d.list[i].name}}</span>
					<span>所在城市：
					{{#
						for(var j =0,len2 = d.list[i].city.length; j<len2;j++){
					}}
						
						{{ d.list[i].city[j] }}
						
					{{# 
					    } 
					}}
					</span>
				</li>
				
				{{# } }}
			</ul>
			`;
var data4 = {
	title: '前端攻城师',
	list: [{
		name: '贤心',
		city: ['杭州', '北京']
	}, {
		name: '谢亮',
		city: ['北京', '南京']
	}, {
		name: '浅浅',
		city: ['杭州', '天津']
	}, {
		name: 'Dem',
		city: ['北京', '武汉']
	}]
};
var view4 = document.getElementById('view4');
render(gettpl4, data4, view4);
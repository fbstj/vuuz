var page = {
	title: 'page',//['title | header>h1','header>h2','title.append'],
	style: '/global/stylesheet/url.css',
	script: '/global/script/url.js',
	nav: [
		['(array of', 'link(each[0], each[1])'],
		['/path', 'name'],
		['/p2', 'n2']
	],
	body:{t:'d'},
	
	foot:'Made by <a href="mailto:joe@fbstj.net">Joe</a>'
}, vuuz = require('./index')

vuuz.dir = __dirname + '/partial'

console.log(vuuz.render(page))

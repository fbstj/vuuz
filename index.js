var u = require('./utils'),
_FS = require('fs'),
get = function(f){ return _FS.readFileSync(f+'.vu', 'utf-8') },
VIEW = get(__dirname+'/default'),
RE = function(model){
	return {
		simple: {
			match: /{\.([^{}]+?)(\+(\d+))?}/,
			replace: function(m){
				var x = model[m[1]]
				if(typeof x === 'string')
					return m[3]?'':x || ''
				else
					return x[Number(m[3])||0] || ''
			}
		},
		func: {
			match: /{!([^{}]+?)\((.*?)\)}/,
			replace: function(m){
				var param = m[2].split(',')
				for(i in param)
				{
					param[i] = param[i].replace(/ /ig, '')
					switch(param[i][0])
					{
						case '.':
							param[i] = model[param[i].substr(1)]
						break;
						default:
							param[i] = u.out[param[i]] || param[i]
						break;
					}
				}
				return u.out[m[1]].apply(null, param)
			}
		},
		part: {
			match: /{-([^{}]+)}/,
			replace: function(m){
				var _m = model[m[1]],
				_v = _m._view || get([exports.dir,m[1]].join('/'));
				return exports.render(_m,_v)
			}
		},
		opt: {
			match: /{(.*?)}/,
			replace: function(m){
				return m[1]
						.replace(/<[^<>]+>\s?<\/[^<>]+>+/ig, '')
						.replace(/^\s$/ig, '') || ''
				
			}
		},
	}
}
exports.dir = '.'

exports.render = function(model, view){
	var view = view || VIEW,
		r = RE(model)
	for(t in r)
		while(u.match(view, r[t].match))
			view = u.replace(view, r[t].match, r[t].replace)
	return view
			.replace(/\n\s*\n/ig, '\n')
			.replace(/>\n\s*([^<>]+)\n\s*<\//ig, '>$1</')
}

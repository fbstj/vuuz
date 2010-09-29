var _mime = require('mime').lookup
exports.out = {
	stylesheet: function(path, mime){
		var m = mime || _mime(path)
		return '<link rel=stylesheet type"'+m+'" href="'+path+'" />'
	},
	script: function(path, mime){
		var m = mime || _mime(path)
		return '<script type="'+m+'" src="'+path+'"></script>'
	},
	link: function(path,text){
		return '<a href="'+path+'">'+(text || path)+'</a>'
	},
	each: function(obj, cb, pre, post){
		var ret = []
		for(i in obj)
			ret.push((pre||'')+cb.apply(i, obj[i])+(post||''));
		return ret.join('\n');
	}
}
exports.replace = function(subject, find, replace){
	if(typeof replace !== 'function')
		return subject.replace(find, replace)
	var m = find(subject)
	if (typeof m !== 'object') return -1
	return subject.replace(find,replace(m))
}

exports.match = function(subject, find){
	return find.test(subject)
}

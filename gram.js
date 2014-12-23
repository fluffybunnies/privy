
var fs = require('fs')
;

module.exports = function(src){
	var g = new gram;
	if (src)
		g.src = __dirname+'/grams/'+src;
	return g;
}


function gram(){
}

gram.prototype.load = function(/* [src,] cb */){
	var z = this
	,src = arguments[0]
	,cb = arguments[1]
	;
	if (src instanceof Function) {
		cb = src;
		src = z.src;
	}
	if (src)
		return loadLocal(z, src, cb);
	process.nextTick(function(){
		cb('invalid src');
	});
}

function loadLocal(gram, path, cb){
	fs.readFile(path, function(err, data){
		if (err)
			return cb(err);
		gram.raw = data.toString();
		cb();
	});
}

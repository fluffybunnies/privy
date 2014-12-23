
var fs = require('fs')
;

module.exports = function(gramName, cb){
	var g = new gram;
	if (gramName) {
		g.loadLocal(gramName, function(err){
			if (cb)
				cb(err);
		});
	}
	return g;
}


function gram(){
}

gram.prototype.loadLocal = function(name, cb){
	var z = this;
	fs.readFile(__dirname+'/grams/'+name, function(err, data){
		if (err)
			return cb(err);
		z.raw = data.toString();
		cb();
	});
}

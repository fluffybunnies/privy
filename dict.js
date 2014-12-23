
var fs = require('fs')
,dictDelim = /(\n\r)|(\r\n)|\n|\r/
,wordDelim = /\s+/
;

module.exports = function(src){
	var d = new dict;
	if (src)
		d.src = __dirname+'/dicts/'+src+'.dic';
	return d;
}


function dict(){
}

dict.prototype.load = function(/* [src,] cb */){
	var z = this
	,src = arguments[0]
	,cb = arguments[1]
	;
	if (src instanceof Function) {
		cb = src;
		src = z.src;
	}
	if (src)
		return getLocal(src, gotSrc);
	process.nextTick(function(){
		cb('invalid src');
	});
	function gotSrc(err, data){
		if (err)
			return cb(err);
		z.raw = data;
		z.keyed = {};
		data.split(dictDelim).forEach(function(v){
			if (v === '')
				return;
			z.keyed[v] = true;
		});
		cb();
	}
}

dict.prototype.score = function(phrase){
	var z = this
	,wordsChecked = 0
	,wordsMatched = 0
	;
	phrase.split(wordDelim).forEach(function(word){
		if (word === '')
			return;
		if (z.keyed[word])
			++wordsMatched;
		++wordsChecked;
	});
	return {
		raw: wordsMatched
		,score: wordsChecked ? wordsMatched/wordsChecked : 0
	};
}

function getLocal(path, cb){
	fs.readFile(path, function(err, data){
		cb(err, data && data.toString ? data.toString() : null);
	});
}

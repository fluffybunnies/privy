
var undef;

module.exports = function(lex, opts){
	return new abc(lex, opts);
}

function abc(lex, opts){
	var z = this;
	z.opts = opts = opts || {};
	if (opts.caseInsensitive)
		lex = lex.toLowerCase();
	z.lex = lex;
	z.imap = {};
	z.cmap = [];
	z.length = lex.length;
	for (var i=0;i<lex.length;++i) {
		this.imap[lex[i]] = i;
		this.cmap[i] = lex[i];
	}
}
abc.prototype.charToIndex = function(char){
	if (this.opts.caseInsensitive)
		char = char.toLowerCase();
	return this.imap[char];
}
abc.prototype.indexToChar = function(index, wrap){
	if (wrap)
		index = index % this.lex.length;
	return this.cmap[index];
}
abc.prototype.toString = function(){
	return JSON.stringify(this, null, 2);
}


module.exports = function(lex){
	return new abc(lex);
}

function abc(lex){
	this.lex = lex;
}
abc.prototype.toString = function(){
	return this.lex;
}

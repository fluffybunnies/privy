/*
node ./src/caesar_shift.js --gram 'caesar_shift-ss0' -n 2
*/

var argv = require('minimist')(process.argv.slice(2))
,lex = require('../lex/basic')
,gram = require('../gram')(argv.gram)
,dict = new require('../dict')('en-AU')
,undef
;


console.log('initializing...\n');
init(function(err){
	if (err)
		return console.log(err);
	console.log('Cryptogram:\n'+gram.raw);
	var solutions = getSolutions(gram, lex);
	scoreSolutions(solutions);
	rankSolutions(solutions);
	//console.log(solutions);
	displayFirstSolutions(solutions, argv.n||1);
});


function init(cb){
	var plan = 2
	,num = 0
	;

	dict.load(function(err){
		err ? error(err) : done();
	});

	gram.load(function(err){
		err ? error(err) : done();
	});

	function error(err){
		cb(err);
		cb = function(){};
	}
	function done(){
		if (++num == plan)
			cb();
	}
}

function getSolutions(gram, lex){
	var solutions = [] ,i
	;
	for (var i=0;i<lex.length;++i) {
		solutions.push({
			shift: i
			,msg: solve(gram, lex, i)
		});
	}
	return solutions;
}

function scoreSolutions(solutions) {
	solutions.forEach(function(v){
		v.score = dict.score(v.msg);
	});
}

function rankSolutions(solutions) {
	solutions.sort(function(a,b){
		return b.score.score-a.score.score;
	});
}

function solve(gram, lex, shift) {
	var solution = ''
	,lexLen = gram.raw.length
	,char,charIndex
	;
	for (var i=0;i<lexLen;++i) {
		char = gram.raw[i];
		charIndex = lex.charToIndex(char);
		if (charIndex === undef) {
			solution += char;
			continue;
		}
		solution += lex.indexToChar(charIndex+shift, true);
	}
	return solution;
}

function displayFirstSolutions(solutions, num) {
	if (!num)
		num = 1;
	console.log('\n--- Top Solutions ---\n');
	for (var i=0;i<num&&i<solutions.length;++i) {
		console.log(solutions[i].msg+'\n');
	}
}

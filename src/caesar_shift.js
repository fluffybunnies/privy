/*
node ./src/caesar_shift.js --gram 'caesar_shift-ss0'
*/

var argv = require('minimist')(process.argv.slice(2))
,gram = require('../gram')
,lex = require('../lex/basic')
;

var g = gram(argv.gram, function(err){
	console.log('Gram: '+g.raw);
	console.log('Lex: '+lex);
});


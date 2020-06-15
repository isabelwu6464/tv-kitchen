// This file represents an initial exploration of the concept of
// data types (aka "Ingredientes") which will be passed between
// TV Kitchen modules.
//
// Once we get past R&D mode, this list of constants will become
// a standard that is used within those modules.  At that point we
// may identify a better way to store them (or not) than this file.
//
// Similarly: it is possible / likely that the tv-kitchen does not
// need this list to begin with, since ingredients are more of a
// function of the processing modules when defining their inputs
// and outputs.

export default {
	STREAM: {
		ANY: 'stream'
	}
	TEXT: {
		ANY: 'text',
		ATOM: 'text.atom',
		WORD: 'text.word',
		SENTENCE: 'text.sentence',
		BLOCK: 'text.block',
	},
}

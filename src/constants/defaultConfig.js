// This is a TEMPORARY WIP file that lets us make the countertop without
// having to worry in detail about the nature of configuration.
//
// This file WILL BE DELETED once we actually create the configuration engine.
//
// The FORMAT of the file / configuration is also a WIP.
//
// Some day it will all be solidified

import dataTypes from '%src/constants/dataTypes'

export default {
	appliances: [
		{
			package: '@tv-kitchen/mock',
			name: 'mock-captions'
			settings: {
				mockInputTypes: [dataTypes.STREAM.ANY],
				mockOutputTypes: [dataTypes.TEXT.ATOM],
			},
		},
		{
			package: '@tv-kitchen/mock',
			name: 'mock-words'
			settings: {
				mockInputTypes: [dataTypes.TEXT.ATOM],
				mockOutputTypes: [dataTypes.TEXT.WORD],
			},
		},
	]
}

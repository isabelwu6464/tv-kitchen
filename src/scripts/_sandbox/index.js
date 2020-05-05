/**
 * This file dynamically loads the requested sandbox file, defaulting to `sandbox.js`.
 *
 * DON'T MODIFY THIS FILE UNLESS YOU KNOW WHY YOU'RE DOING IT! (Please.)
 *
 * Note that below we disable the linting of two dangerous things necessary for dynamic importing.
 * This is an acceptable risk because this is a sandbox, intentionally the wild west.
 */

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import 'module-alias/register'
import logger from '%src/lib/logger'

const script = process.argv[2] || 'sandbox'

if (script.includes('/') || script.includes('..')) {
	logger.error('Invalid argument. Please provide the name of a file in the sandbox directory.')
	process.exit()
}

try {
	require(`./${script}`)
} catch (error) {
	logger.error(error)
	process.exit()
}

import 'module-alias/register'
import fs from 'fs'

import logger from '%src/lib/logger'
import kafka from '%src/lib/kafka'

const outputFilePath = process.argv[3]
if (!outputFilePath) {
	logger.error('You must provide an output file path in a writeable location.')
	process.exit()
}

const consumer = kafka.consumer({ groupId: 'test-group' })

const runConsumer = async () => {
	await consumer.connect()
	await consumer.subscribe({ topic: 'STREAM.DATA', fromBeginning: true })
	const outFile = fs.openSync(outputFilePath, 'w')
	await consumer.run({
		eachMessage: async ({ message }) => {
			const buffer = Buffer.from(message.value)
			fs.writeSync(outFile, buffer)
		},
	})
}

runConsumer()

logger.info('Consumer running. You will have to manually exit this process.')

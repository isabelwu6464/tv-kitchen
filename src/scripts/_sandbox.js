// This file is for testing out local changes easily.
//
// To run this code, type `yarn sandbox` in your CLI.
//
// Do not commit changes to this file! In fact, you should locally set the `--assume-unchanged`
// flag on it: `git update-index --assume-unchanged ./src/scripts/_sandbox.js`
import 'module-alias/register'

/**
 * DO NOT MODIFY ABOVE THIS BLOCK
 */
import kafka from '%src/lib/kafka'
import FileIngestionEngine from '%src/components/ingestion/engines/FileIngestionEngine'
import fs from 'fs'

const ingestionEngine = new FileIngestionEngine('/Users/slifty/Code/NodeJS/tvkitchen/tv-kitchen/in.mp4')

const consumer = kafka.consumer({ groupId: 'test-group' })

const runConsumer = async () => {
	// Consuming
	await consumer.connect()
	await consumer.subscribe({ topic: 'STREAM.DATA', fromBeginning: true })

	// const writeFileStream = fs.createWriteStream('./out.MP4')
	const outFile = fs.openSync('./out.MP4', 'w')
	let x = 0
	await consumer.run({
	  eachMessage: async ({ topic, partition, message }) => {
			const buffer = Buffer.from(message.value);
			fs.writeSync(outFile, buffer)
	  },
	})
}

ingestionEngine.start()
runConsumer()

const admin = kafka.admin()

const cleanUp = async () => {
	// Delete our topic
	admin.connect()
	await admin.deleteTopics({
		topics: ['STREAM.DATA'],
	})
	admin.disconnect()
}
// cleanUp()

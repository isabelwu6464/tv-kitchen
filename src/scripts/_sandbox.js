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
import fs from 'fs'

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function writePromise(file, data) {
	return new Promise(resolve => {
		fs.write(file, data, resolve)
	})
}

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group-1' })
const admin = kafka.admin()

const runProducer = async () => {
	// Open the file stream
	const filePath = './in.mp4'
	const fileStream = fs.createReadStream(filePath)
	console.time(filePath)

  // Producing
  await producer.connect()

  fileStream.on('data', data => {
  	// console.log('\n\n\n')
  	// console.log(data.toString('base64'))
    // console.log('\n\n\n')
    // console.log(data.toString)
    producer.send({
      topic: 'test-topic',
      messages: [
        {
        	value: data,
        },
      ],
    })
  });
  fileStream.on('close', () => {
    console.timeEnd(filePath);
  });
}

const runConsumer = async () => {
	// Consuming
	await consumer.connect()
	await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

	// const writeFileStream = fs.createWriteStream('./out.MP4')
	const outFile = fs.openSync('./out.MP4', 'w')
	let x = 0
	await consumer.run({
	  eachMessage: async ({ topic, partition, message }) => {
			const buffer = Buffer.from(message.value);
			console.log(buffer)
			fs.writeSync(outFile, buffer)
			// const result = writeFileStream.write(buffer)
			// console.log(result)
			// if(!result) {
			// 	console.log("Couldn't write.")
			// } else {
			// 	console.log("could write.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1")
			// }
			// await sleep(10)
			// console.log(x++)
	    // console.log({
	    //   partition,
	    //   offset: message.offset,
	    //   value: buffer,
	    //   textValue: buffer.toString('ascii')
	    // })
	  },
	})
}

const cleanUp = async () => {
	// Delete our topic
	admin.connect()
	// await admin.deleteTopics({
	// 	topics: ['test-topic'],
	// })
	await admin.createTopics({
    waitForLeaders: true,
    topics: [{
	  	topic: 'test-topic',
		}],
	})
	admin.disconnect()
}

const bluh = async () => {
	// await cleanUp()
	// runProducer()
	runConsumer()
}

bluh()

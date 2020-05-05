import { spawn } from 'child_process'
import kafka from '%src/lib/kafka'
// import {
// 	Payload,
// 	DataTypes,
// } from '@tvkitchen/appliance-core'
// Should this be using Appliance stuff, or should it be
// proprietary to the ingestor / countertop relationship

class AbstractIngestionEngine {
	producer = kafka.producer()

	enqueueData = async (data) => {
		const payload = {
			data,
		}
		await this.producer.send({
			topic: 'STREAM.DATA',
			messages: [{
				value: data,
			}],
		})
	}

	recordStream = (readableStream) => readableStream
		.on('data', async (data) => {
			readableStream.pause()
			await this.enqueueData(data)
			readableStream.resume()
		})

	start = () => {
		const ffmpegSettings = this.getFfmpegSettings()
		const ffmpegProcess = spawn('ffmpeg', ffmpegSettings)
		const inputStream = this.getInputStream()
		if (inputStream !== null) {
			inputStream.pipe(ffmpegProcess.stdin)
		}
		this.recordStream(ffmpegProcess.stdout)
	}

	getFfmpegSettings = () => ['-i', this.getInputLocation(), '-f', 'mpegts', '-']

	// OPTIONAL OVERRIDE
	getInputLocation = () => '-'

	// ABSTRACT OVERRIDE
	getInputStream = () => null
}

export default AbstractIngestionEngine

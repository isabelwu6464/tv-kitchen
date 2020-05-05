import 'module-alias/register'

import logger from '%src/lib/logger'
import kafka from '%src/lib/kafka'

const admin = kafka.admin()

const cleanUp = async () => {
	admin.connect()
	await admin.deleteTopics({
		topics: ['STREAM.DATA'],
	})
	admin.disconnect()
}

cleanUp()

logger.info('Kafka has been cleaned up!')
process.exit()

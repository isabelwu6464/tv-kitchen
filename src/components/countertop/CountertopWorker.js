import kafka from '%src/lib/kafka'
import { IAppliance } from '@tvkitchen/base-interfaces'
import { loadDynamicPackage } from '%src/lib/utils'

/**
 * A CountertopWorker (aka Line Cook) is responsible for monitoring specific data streams
 * and processing those streams using TV Kitchen Appliances to create new data.
 *
 * CountertopWorker instances consume Payloads from Kafka and pass them to their Appliances.
 * CountertopWorker instances listen for emitted Payloads from their appliances and pass them to Kafka.
 */
class CountertopWorker {
	name = null
	consumer = null
	producer = null
	appliance = null

	constructor(applianceSettings) {
		this.name = applianceSettings.name
		this.consumer = kafka.consumer({ groupId: applianceSettings.name })
		this.producer = kafka.producer()
		const Appliance = loadDynamicPackage(applianceSettings.package)
		assert(Appliance instanceof IAppliance, 'TVKitchen can only use Appliances that extend IAppliance.')
		this.appliance = new Appliance(applianceSettings.settings)
	}

	registerTopicListener = (topic) => {
		this.consumer.subscribe({ topic })
	}

	start = async () => {
		await this.producer.connect()
		await this.consumer.connect()
		await this.appliance.start()
		const inputTypes = this.appliance.getInputTypes()
		inputTypes.forEach((inputType) => registerTopicListener(inputType))
	}

	stop = async () => {
		await this.appliance.stop()
		await this.consumer.disconnect()
		await this.producer.disconnect()
	}
}

export default CountertopWorker

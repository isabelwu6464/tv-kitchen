import AbstractIngestionEngine from '%src/components/ingestion/AbstractIngestionEngine'

class HdHomeRunIngestionEngine extends AbstractIngestionEngine {
	url = null

	constructor(url) {
		super()
		this.url = url
	}

	getInputLocation = () => this.url
}

export default HdHomeRunIngestionEngine

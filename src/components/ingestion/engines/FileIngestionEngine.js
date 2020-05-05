import AbstractIngestionEngine from '%src/components/ingestion/AbstractIngestionEngine'

class FileIngestionEngine extends AbstractIngestionEngine {
	filePath = null

	constructor(filePath) {
		super()
		this.filePath = filePath
	}

	getInputLocation = () => this.filePath
}

export default FileIngestionEngine

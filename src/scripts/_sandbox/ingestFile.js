import 'module-alias/register'
import logger from '%src/lib/logger'

import FileIngestionEngine from '%src/components/ingestion/engines/FileIngestionEngine'

const ingestSource = process.argv[3]
if (!ingestSource) {
	logger.error('You must provide an ingestion source.')
	process.exit()
}

const ingestionEngine = new FileIngestionEngine(ingestSource)
ingestionEngine.start()

logger.info('Ingestion running. You will have to manually exit this process.')

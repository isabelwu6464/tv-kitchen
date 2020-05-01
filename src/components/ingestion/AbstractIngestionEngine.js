class AbstractIngestionEngine {

	setConfiguration = config => true

	start = () => ''

	stop = () => ''

	getSource = () => ''

	validateSource = () => true

	// Responsible for configuring the external source based on the parameters sent to the ingestion engine
	prepareSource = () => ''

	getSourceMetadata = ({})

}

export default AbstractIngestionEngine

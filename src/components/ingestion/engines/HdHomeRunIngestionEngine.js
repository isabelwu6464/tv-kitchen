import AbstractIngestionEngine from '%src/components/ingestion/AbstractIngestionEngine'

class HdHomeRunIngestionEngine extends AbstractIngestionEngine {

	constuctor(settings) {
		// Validate the settings?
		// Store the settings / combine with defaults
	}

	setConfiguration = config => true

	start = () => {
		// Set up the HD Home Run (send it the messages to specify what it should be tuned to) ... maybe...?
		// Select the video stream (based on config if specified?)
		// Select the audio stream (based on config if specified?)
		// Select the caption stream (based on config if specified?)

		// Package all of this into a ???? <-- file? url? udp stream?

	}

	stop = () => ''

	getSource = () => ''

	validateSource = () => true

	// Responsible for configuring the external source based on the parameters sent to the ingestion engine
	prepareSource = () => ''

	getSourceMetadata = ({
		channelName:
		networkName:
		timeStarted:
		programName:
		geographicMarket:
		tags:

	})

	///// BELONG IN ABASTRACT (above might too, but whatever)

	// Returns the next piece of data from the input stream, which will be added to the kafka stream.
	// The term "Packet" may be overloaded here
	getNextPacket = () => ''

	queuePacket(packet) => ''


}

export default HdHomeRunIngestionEngine

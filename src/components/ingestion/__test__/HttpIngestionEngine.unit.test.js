import nock from 'nock'
import HttpIngestionEngine from '../HttpIngestionEngine'

describe('HttpIngestionEngine', () => {
	describe('constructor', () => {
		it('should throw an error when called without a URL', () => {
			expect(() => {
				new HttpIngestionEngine() // eslint-disable-line no-new
			}).toThrow(Error)
		})
	})

	describe('getInputStream', () => {
		it('it should stream the client request body', (done) => {
			const body = 'it worked!'

			nock('http://example.com').get('/test.ts').reply(200, body)

			const fileEngine = new HttpIngestionEngine('http://example.com/test.ts')

			const inputStream = fileEngine.getInputStream()

			inputStream.on('data', (data) => {
				expect(data.toString()).toEqual(body)
				done()
			})
		})

		it('it should pass on errors correctly', (done) => {
			const message = 'oh noes!?'
			const url = 'http://example.com/error-test.ts'

			nock('http://example.com').get('/error-test.ts').replyWithError({
				message,
			})

			const fileEngine = new HttpIngestionEngine(
				url,
			)

			const inputStream = fileEngine.getInputStream()

			inputStream.on('error', (err) => {
				expect(err.message).toEqual(`request to ${url} failed, reason: ${message}`)
				done()
			})
		})
	})
})

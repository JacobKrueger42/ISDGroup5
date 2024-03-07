import HttpStatus from 'http-status-codes';

export default function ErrorHandler(err, req, res, next) {
	const status = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
	console.log(err.message || `An error occured while handling a request to "${req.path}"`);

	res
		.header('Content-Type', 'application/json')
		.status(status)
		.json({
			path: req.path,
			detailed_error_message: (err.message || '').replaceAll('\n', ' '),
			message: 'An error occurred'
		});
}

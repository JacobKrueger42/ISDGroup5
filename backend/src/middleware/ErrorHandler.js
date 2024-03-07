export default function ErrorHandler(err, req, res, next) {
	const errStatus = err.statusCode || 500;
	const errMsg = err.message || 'An error occured while processing a request';

	res.status(errStatus).json({
		success: false,
		status: errStatus,
		message: errMsg,
		stack: process.env.NODE_ENV === 'development' ? err.stack : {}
	});

	// do not call next, terminate the request
	// next();
}

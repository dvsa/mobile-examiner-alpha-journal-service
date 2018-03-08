export default ({ body = {}, statusCode = 200 }) => {
	const response = {
		statusCode,
		headers: {
			'Access-Control-Allow-Origin': '*', // Required for CORS support to work
		},
		body: JSON.stringify(body),
	};
	return response;
};
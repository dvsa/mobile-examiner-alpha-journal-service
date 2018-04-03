// export default ({ body = {}, statusCode = 200 }) => {
// 	const response = {
// 		statusCode,
// 		headers: {
// 			'Access-Control-Allow-Origin': '*', // Required for CORS support to work
// 		},
// 		body: JSON.stringify(body),
// 	};
// 	return response;
// };


import { IResponse } from "../interfaces/iresponse";

export default (body: {}, statusCode = 200, reqHeaders: { [id: string]: string; } = {}): IResponse => {
	const accessControlAllowOriginHeader = {
		'Access-Control-Allow-Origin': '*' // Required for CORS support to work
	};

	return {
		statusCode,
		headers: { ...accessControlAllowOriginHeader, ...reqHeaders},
		body: (body === null)? null :JSON.stringify(body),
	};
};
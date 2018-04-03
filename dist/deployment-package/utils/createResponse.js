"use strict";
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (body, statusCode, reqHeaders) {
    if (statusCode === void 0) { statusCode = 200; }
    if (reqHeaders === void 0) { reqHeaders = {}; }
    var accessControlAllowOriginHeader = {
        'Access-Control-Allow-Origin': '*' // Required for CORS support to work
    };
    return {
        statusCode: statusCode,
        headers: __assign({}, accessControlAllowOriginHeader, reqHeaders),
        body: (body === null) ? null : JSON.stringify(body),
    };
});

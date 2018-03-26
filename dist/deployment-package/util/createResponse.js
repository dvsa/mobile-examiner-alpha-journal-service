export default (function (body, statusCode) {
    if (body === void 0) { body = {}; }
    if (statusCode === void 0) { statusCode = 200; }
    var response = {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(body),
    };
    return response;
});
//# sourceMappingURL=createResponse.js.map
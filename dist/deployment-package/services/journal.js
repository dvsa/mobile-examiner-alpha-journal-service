"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createResponse_1 = require("../utils/createResponse");
var Journal = /** @class */ (function () {
    function Journal(createRedisClient) {
        this.redisClient = createRedisClient(process.env.redisUrl);
        this.redisClient.on('ready', function () {
            console.log('Redis client: ready');
        });
        this.redisClient.on('connect', function () {
            console.log('Redis client: connect');
        });
        this.redisClient.on('reconnecting', function () {
            console.log('Redis client: reconnecting');
        });
        this.redisClient.on('error', function (err) {
            console.log({ err: err }, 'Listener.redis.client error: %s', err);
            process.exit(1);
        });
        this.redisClient.on('end', function () {
            console.log('Redis client: end');
        });
        this.redisClient.on('warning', function () {
            console.log('Redis client: warning');
        });
    }
    Journal.prototype.set = function (email, data, callback) {
        var client = this.redisClient;
        var escapedString = JSON.stringify(data);
        client.set(email, escapedString, onSet);
        function onSet(err, data) {
            var message;
            var response;
            if (err) {
                message = 'Error';
                response = createResponse_1.default({
                    body: {
                        message: message,
                        err: err,
                    },
                    statusCode: 500,
                });
                callback(response);
            }
            message = 'Success';
            response = createResponse_1.default({
                body: {
                    message: message,
                    data: data,
                }
            });
            callback(null, response);
        }
    };
    Journal.prototype.get = function (email, callback) {
        var client = this.redisClient;
        client.get(email, onGet);
        function onGet(err, resp) {
            var message;
            var response;
            if (err) {
                message = 'Error';
                response = createResponse_1.default({
                    body: {
                        message: message,
                        err: err,
                    },
                    statusCode: 500,
                });
                callback(response);
            }
            var data = JSON.parse(resp);
            message = 'Success';
            response = createResponse_1.default({
                body: {
                    message: message,
                    data: data,
                }
            });
            callback(null, response);
        }
    };
    return Journal;
}());
exports.default = Journal;

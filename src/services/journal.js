import createResponse from '../utils/createResponse';
export default class Journal {

    constructor(createRedisClient) {
        this.redisClient = createRedisClient({
            url: process.env.redisUrl,
            port: process.env.redisPort
          });

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
            console.log({err: err}, 'Listener.redis.client error: %s', err);
            process.exit(1);
        });
        this.redisClient.on('end', function () {
            console.log('Redis client: end');
        });
        this.redisClient.on('warning', function () {
            console.log('Redis client: warning');
        });
    }

    set(email, data, callback) {

        const client = this.redisClient;
        const escapedString = JSON.stringify(data);

        client.set(email, escapedString, onSet);

        function onSet(err, data) {
            let message;
            let response;

            if (err) {
                message = 'Error'
                response = createResponse({
                        body: {
                            message,
                            err,
                        },
                        statusCode: 500,
                })
                callback(response);
            }

            message = 'Success'
            response = createResponse({
                body: {
                    message,
                    data,
                }
            })
            callback(null, response);
        }
    }

    get(email, callback) {
        const client = this.redisClient;

        client.get(email, onGet);

        function onGet(err, resp) {
            let message;
            let response;

            if (err) {
                message = 'Error'
                response = createResponse({
                        body: {
                            message,
                            err,
                        },
                        statusCode: 500,
                })
                callback(response);
            }

            let data = JSON.parse(resp);
            message = 'Success'
            response = createResponse({
                body: {
                    message,
                    data,
                }
            })
            callback(null, response);
        }
    }
}
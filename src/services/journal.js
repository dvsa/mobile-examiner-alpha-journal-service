import createResponse from '../utils/createResponse';

export default class Journal {
    constructor(redis) {
        this.redisClient = redis.createClient({
            url: process.env.redisUrl,
            port: process.env.redisPort
          });
    }

    get(email, callback) {
        this.redisClient.get(email, onGet);
        this.redisClient.quit();

        function onGet(err, data) {
            console.log('getting data', data)
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
}
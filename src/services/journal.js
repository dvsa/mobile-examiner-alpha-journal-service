import createResponse from '../utils/createResponse';
export default class Journal {

    constructor(redis) {
        this.redisClient = redis.createClient({
            url: process.env.redisUrl,
            port: process.env.redisPort
          });
    }

    set(email, data, callback) {

        const client = this.redisClient;
        const escapedString = JSON.stringify(data);

        client.set(email, escapedString, onSet);

        function onSet(err, data) {
            console.log('setting data')
            let message;
            let response;

            if (err) {
                console.log('error', err);
                message = 'Error'
                response = createResponse({
                        body: {
                            message,
                            err,
                        },
                        statusCode: 500,
                })
                client.quit();
                callback(response);
            }

            message = 'Success'
            response = createResponse({
                body: {
                    message,
                    data,
                }
            })
            client.quit();
            callback(null, response);
        }
    }

    get(email, callback) {
        const client = this.redisClient;
        
        client.get(email, onGet);

        function onGet(err, resp) {
            console.log('getting data')
            let message;
            let response;

            if (err) {
                console.log('error', err);
                message = 'Error'
                response = createResponse({
                        body: {
                            message,
                            err,
                        },
                        statusCode: 500,
                })
                client.quit();
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
            client.quit();
            callback(null, response);
        }
    }
}
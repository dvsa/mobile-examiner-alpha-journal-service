import redis from 'redis';
import Journal from '../services/journal';

const journal = new Journal(redis);

export default (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    journal.get(event.queryStringParameters.email, callback);
};
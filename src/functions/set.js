import redis from 'redis';
import Journal from '../services/journal';

const journal = new Journal(redis);

export default (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    journal.set(event.email, event.data, callback);
};
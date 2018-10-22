import { createClient } from 'redis';
import Journal from '../../services/journal';

const journal = new Journal(createClient);

export function handler(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false
    journal.get(event.queryStringParameters.email, callback);
};
import { createClient } from 'redis';
import Journal from '../services/journal';

const journal = new Journal(createClient);

export function set(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false
    journal.set(event.email, event.data, callback);
};
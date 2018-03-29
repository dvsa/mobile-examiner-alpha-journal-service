import { Context, Callback } from 'aws-lambda';

import createResponse from '../util/createResponse';
import journal from '../service/journal';

export function setJournal(event: any, context: Context, callback: Callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  
  const journalService = new journal();
  
  const reply = journalService.set(event.queryStringParameters.email, event.data);
  let message;
  
  if (reply === null) {
    const response = createResponse({}, 500);
    callback(new Error('Failure'), response);
    return;
  }
  
  message = 'Success';
  const response = createResponse({ message }, 200);
  callback(null, response);
}

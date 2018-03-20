import { Context, Callback } from 'aws-lambda';

import createResponse from '../util/createResponse';
import journal from '../service/journal';

export function getJournal(event: any, context: Context, callback: Callback) {

  const journalService = new journal();
  
  journalService.get(event.queryStringParameters.email, (err: Error, reply) => {
    let response;
    if (err) {
      const message = err.message;
      response = createResponse({ message }, 500);
      callback(err, response);
    } else {
      response = createResponse({ reply }, 200);
      callback(null, response);
    }
  });
}

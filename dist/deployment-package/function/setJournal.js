import createResponse from '../util/createResponse';
import journal from '../service/journal';
export function setJournal(event, context, callback) {
    var journalService = new journal();
    var reply = journalService.set(event.queryStringParameters.email, event.data);
    var message;
    if (reply === null) {
        var response_1 = createResponse({}, 500);
        callback(new Error('Failure'), response_1);
        return;
    }
    message = 'Success';
    var response = createResponse({ message: message }, 200);
    callback(null, response);
}
//# sourceMappingURL=setJournal.js.map
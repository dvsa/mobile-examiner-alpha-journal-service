import createResponse from '../util/createResponse';
import journal from '../service/journal';
export function getJournal(event, context, callback) {
    var journalService = new journal();
    journalService.get(event.queryStringParameters.email, function (err, reply) {
        var response;
        if (err) {
            var message = err.message;
            response = createResponse({ message: message }, 500);
            callback(err, response);
        }
        else {
            response = createResponse({ reply: reply }, 200);
            callback(null, response);
        }
    });
}
//# sourceMappingURL=getJournal.js.map
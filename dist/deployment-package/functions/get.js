"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = require("redis");
var journal_1 = require("../services/journal");
var journal = new journal_1.default(redis_1.createClient);
function get(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;
    journal.get(event.queryStringParameters.email, callback);
}
exports.get = get;
;

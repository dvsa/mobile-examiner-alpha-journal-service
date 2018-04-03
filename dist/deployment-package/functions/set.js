"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = require("redis");
var journal_1 = require("../services/journal");
var journal = new journal_1.default(redis_1.createClient);
function set(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;
    journal.set(event.email, event.data, callback);
}
exports.set = set;
;

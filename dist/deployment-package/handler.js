"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_1 = require("./functions/get");
var set_1 = require("./functions/set");
var handler = {
    get: get_1.get,
    set: set_1.set
};
exports.default = handler;

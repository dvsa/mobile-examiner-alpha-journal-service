import * as redis from "redis";
var JournalRepository = /** @class */ (function () {
    function JournalRepository() {
        this.redisClient = redis.createClient(process.env.redisUrl);
        this.redisClient.on("ready", function () {
            console.log("Redis client: ready");
        });
        this.redisClient.on("connect", function () {
            console.log("Redis client: connect");
        });
        this.redisClient.on("reconnecting", function () {
            console.log("Redis client: reconnecting");
        });
        this.redisClient.on("error", function (err) {
            console.log({ err: err }, "Listener.redis.client error: %s", err);
            process.exit(1);
        });
        this.redisClient.on("end", function () {
            console.log("Redis client: end");
        });
        this.redisClient.on("warning", function (warn) {
            console.log("Redis client: warning", warn);
        });
    }
    JournalRepository.prototype.set = function (key, value, callback) {
        var escapedString = JSON.stringify(value);
        this.redisClient.set(key, escapedString, callback);
    };
    JournalRepository.prototype.get = function (key, callback) {
        this.redisClient.get(key, callback);
    };
    return JournalRepository;
}());
export { JournalRepository };
//# sourceMappingURL=journalRepository.js.map
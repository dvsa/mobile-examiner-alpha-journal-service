import { JournalRepository } from '../repository/journalRepository';
var Journal = /** @class */ (function () {
    function Journal() {
        this.journalRepository = new JournalRepository;
    }
    Journal.prototype.set = function (email, journal) {
        var result;
        this.journalRepository.set(email, journal, function (err, res) {
            if (err) {
                result = err;
            }
        });
        return result;
    };
    Journal.prototype.get = function (email, callback) {
        this.journalRepository.get(email, callback);
    };
    return Journal;
}());
export default Journal;
//# sourceMappingURL=journal.js.map
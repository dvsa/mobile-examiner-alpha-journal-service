import { getJournal } from '../getJournal';
import Journal from '../../service/journal';
import { Callback } from 'aws-lambda';

jest.mock('../../service/journal')

describe('test getJournalFunction', () => {
    test('returns success when key present', done => {
        let event = {
            queryStringParameters: {
                email: 'testpresent@example.org'
            }
        };
    
        const callback: Callback = (err, res) => {
            expect(res.statusCode).toBe(200);
            expect(JSON.parse(res.body)).toEqual({"reply": "test journal"});
            done();
        }
    
        getJournal(event, null, callback);
    });

    test('returns error when key not present', done => {
        let event = {
            queryStringParameters: {
                email: "testnotpresent@example.org"
            }
        };

        const callback: Callback = (err, res) => {
            expect(res.statusCode).toBe(500);
            expect(JSON.parse(res.body)).toEqual({"message": "Journal not present"});
            done();
        }
    
        getJournal(event, null, callback);
    })
})

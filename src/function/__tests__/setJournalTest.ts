import { setJournal } from '../setJournal';
import Journal from '../../service/journal';
import { Callback } from 'aws-lambda';

jest.mock('../../service/journal')

describe('test setJournalFunction', () => {
    test('returns OK when set successfully', done => {
        let event = {
            queryStringParameters: {
                email: 'testset@example.org'
            }
        };
    
        const callback: Callback = (err, res) => {
            expect(res.statusCode).toBe(200);
            expect(JSON.parse(res.body)).toEqual({"message": "Success"});
            done();
        }
    
        setJournal(event, null, callback);
    });

    test('returns error when set fails', done => {
        let event = {
            queryStringParameters: {
                email: 'testsetfail@example.org'
            }
        };

        const callback: Callback = (err, res) => {
            expect(res.statusCode).toBe(500);
            expect(err.message).toEqual('Failure');
            done();
        }
    
        setJournal(event, null, callback);
    })
})

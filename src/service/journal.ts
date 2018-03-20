import { JournalRepository } from '../repository/journalRepository';

export default class Journal {

  private journalRepository: JournalRepository;

  constructor() {
    this.journalRepository = new JournalRepository;
  }
  
  set(email: string, journal: string) {
    
    let result;
    this.journalRepository.set(email, journal, (err: Error, res: string) => {
      if (err) {
        result = err;
      }
    });
    
    return result;
  }
  
  get(email: string, callback: (err: Error, reply: string) => void) {

    this.journalRepository.get(email, callback);
  }
}

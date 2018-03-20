export default class Journal {
  public get(key: string, callback: (err, reply) => void) {
    if (key === 'testpresent@example.org') {
      callback(null, 'test journal');
      
      return;
    }
    callback(new Error('Journal not present'), null);
  }
  
  public set(key: string, value: string): string {
    if (key === 'testset@example.org') {
      
      return 'OK';
    }
    
    return null;
  }
}

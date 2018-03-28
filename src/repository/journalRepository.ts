import * as redis from 'redis';

export class JournalRepository {
  private redisClient: redis.RedisClient;

  constructor() {
    this.redisClient = redis.createClient(process.env.redisUrl);

    this.redisClient.on('ready', () => {
      console.log('Redis client: ready');
    });
    this.redisClient.on('connect', () => {
      console.log('Redis client: connect');
    });
    this.redisClient.on('reconnecting', () => {
      console.log('Redis client: reconnecting');
    });
    this.redisClient.on('error', (err: Error) => {
      console.log({ err }, 'Listener.redis.client error: %s', err);
      process.exit(1);
    });
    this.redisClient.on('end', () => {
      console.log('Redis client: end');
    });
    this.redisClient.on('warning', (warn) => {
      console.log('Redis client: warning', warn);
    });
  }

  set(key: string, value: string, callback: (err, res) => void) {
    const escapedString = JSON.stringify(value);

    this.redisClient.set(key, escapedString, callback);
  }

  get(key: string, callback: (err, reply) => void) {
    this.redisClient.get(key, callback);
  }
}

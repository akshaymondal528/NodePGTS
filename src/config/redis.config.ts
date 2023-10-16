/** Global imports */
import { RedisClientType, createClient } from 'redis';

/** Local imports */
import { ENV } from './env.config';

export const Redis = async (): Promise<RedisClientType | null> => {
  try {
    const client: RedisClientType = createClient({ url: ENV.REDIS_URI });
    await client.connect();
    return client;
  } catch (error) {
    return null;
  }
};

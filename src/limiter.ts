// src/limiter.ts

import rateLimit, { Options } from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { createClient } from "redis";

/**
 * A configurable rate limiter middleware using Redis store.
 * @param options Optional custom configuration
 * @returns Express middleware function
 */
export const createRateLimiter = (options?: Partial<Options>) => {
  const redisClient = createClient({
    socket: {
      host: "127.0.0.1",
      port: 6379,
    },
  });

  redisClient.connect().catch(console.error);

  const limiter = rateLimit({
    store: new RedisStore({
      sendCommand: (...args: string[]) => redisClient.sendCommand(args),
    }),
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests, please try again later.",
    ...options,
  });

  return limiter;
};

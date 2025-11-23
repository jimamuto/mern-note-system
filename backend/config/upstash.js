const { Ratelimit } = require("@upstash/ratelimit");
const { Redis } = require("@upstash/redis");
require("dotenv").config();

// Redis connection
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Rate limiter: 5 requests per 10 seconds
const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(100, "60 s"),
});

module.exports = limiter;

const { createClient } = require("redis")

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-14075.crce179.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 14075
    }
});

module.exports = redisClient ;

const keys = require('./keys');
const redis = require('redis');

console.log(keys);

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

redisClient.on("error", function(err) {
    assert(err instanceof Error);
    assert(err instanceof AbortError);
    assert(err instanceof AggregateError);
   
    // The set and get are aggregated in here
    assert.strictEqual(err.errors.length, 2);
    assert.strictEqual(err.code, "NR_CLOSED");
  });

const sub = redisClient.duplicate();

function fib(index) {
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
}

sub.on("subscribe", function(channel, count) {
    console.log("subscribed");
});

sub.on("message", (channel, message) => {
    console.log("Calculating ", message);
    redisClient.hmset('values', message, fib(parseInt(message)));
    console.log("Finish calculating ", message);
});

console.log("subscribing");
sub.subscribe('insert');

console.log(keys);

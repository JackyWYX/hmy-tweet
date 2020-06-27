const tweetAccount = require('./tweetaccount.js')(artifacts.require('TweetAccount'))

async function demo() {
    let tx = await tweetAccount.tweet('this is a new tweet')
    console.log(`tweet transaction ${tx}`)
    let [lastTweetStr, lastBN, num] = await tweetAccount.getLatestTweet()
    console.log(`last tweet [${lastTweetStr}, ${lastBN}, ${num}]`)
    let [firstTweetStr, firstBN] = await tweetAccount.getTweet(0)
    console.log(`first tweet [${firstTweetStr}, ${firstBN}]`)
}

module.exports = function() {
    demo().then( _ => {
        console.log('finished')
        process.exit(0)
    })
}

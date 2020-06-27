let tweetAccount

async function tweet(str) {
    let instance = await tweetAccount.deployed()
    let res = await instance.tweet(str)
    return res.tx
}

async function getTweet(tweetId) {
    let instance = await tweetAccount.deployed()
    let res = await instance.getTweet(tweetId)
    return [res[0], res[1]]
}

async function getLatestTweet() {
    let instance = await tweetAccount.deployed()
    let res = await instance.getLatestTweet()
    return [res[0], res[1], res[2]]
}

async function getOwnerAddress() {
    let instance = await tweetAccount.deployed()
    let res = await instance.getOwnerAddress()
    return res
}

async function getNumberOfTweets() {
    let instance = await tweetAccount.deployed()
    let res = await instance.getNumberOfTweets()
    return res
}

module.exports = function(contractInterface) {
    tweetAccount = contractInterface
    return {
        tweet,
        getTweet,
        getLatestTweet,
        getOwnerAddress,
        getNumberOfTweets,
    }
}

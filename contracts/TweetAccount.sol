pragma solidity >=0.4.21 <0.6.0;

contract TweetAccount {

	// data structure of a single tweet
	struct Tweet {
		uint timestamp;
		string tweetString;
	}

	// "array" of all tweets of this account: maps the tweet id to the actual tweet
	mapping (uint => Tweet) _tweets;

	// total number of tweets in the above _tweets mapping
	uint _numberOfTweets;

	// "owner" of this account: only admin is allowed to tweet
	address payable _adminAddress;

	// constructor
	constructor() public {
		_numberOfTweets = 0;
		_adminAddress = msg.sender;
	}

	// returns true if caller of function ("sender") is admin
	function isAdmin() public view returns (bool) {
		return msg.sender == _adminAddress;
	}

	// create new tweet
	function tweet(string memory tweetString) public returns (int result) {
		if (!isAdmin()) {
			// only owner is allowed to create tweets for this account
			result = -1;
		} else if (bytes(tweetString).length > 160) {
			// tweet contains more than 160 bytes
			result = -2;
		} else {
			_tweets[_numberOfTweets].timestamp = now;
			_tweets[_numberOfTweets].tweetString = tweetString;
			_numberOfTweets++;
			result = 0; // success
		}
	}

	function getTweet(uint tweetId) public view returns (string memory tweetString, uint timestamp) {
		// returns two values
		tweetString = _tweets[tweetId].tweetString;
		timestamp = _tweets[tweetId].timestamp;
	}

	function getLatestTweet() public view returns (string memory tweetString, uint timestamp, uint numberOfTweets) {
		// returns three values
		tweetString = _tweets[_numberOfTweets - 1].tweetString;
		timestamp = _tweets[_numberOfTweets - 1].timestamp;
		numberOfTweets = _numberOfTweets;
	}

	function getOwnerAddress() public view returns (address adminAddress) {
		return _adminAddress;
	}

	function getNumberOfTweets() public view returns (uint numberOfTweets) {
		return _numberOfTweets;
	}

	// other users can send donations to your account: use this function for donation withdrawal
	function adminRetrieveDonations(address payable receiver) public {
		if (isAdmin()) {
			receiver.transfer(address(this).balance);
		}
	}

	function adminDeleteAccount() public {
		if (isAdmin()) {
			selfdestruct(_adminAddress);
		}
	}
}

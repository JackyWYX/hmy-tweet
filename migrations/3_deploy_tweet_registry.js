const Migrations = artifacts.require("TweetAccount");

module.exports = function(deployer) {
    deployer.deploy(Migrations);
};
